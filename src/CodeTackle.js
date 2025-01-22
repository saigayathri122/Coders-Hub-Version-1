import React, { useState, useEffect } from 'react';
import Header from './Components/Header';

const CodeTackle = () => {
  const [questions, setQuestions] = useState([]);
  const [isAsking, setIsAsking] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [answers, setAnswers] = useState({});
  const [viewingQuestion, setViewingQuestion] = useState(null);
  const [newAnswer, setNewAnswer] = useState('');
  const BASE_URL = "http://localhost:5004";
  const username = localStorage.getItem("username"); // Get username from localStorage
  const isLoggedIn = username !== null;

  // Fetch all questions on mount
  useEffect(() => {
    fetch(`${BASE_URL}/questions`)
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error('Error fetching questions:', err));
  }, []);

  const handleAskQuestion = () => {
    if (newQuestion.trim() !== '') {
      const question = { username:username,text: newQuestion,timestamp:new Date().toISOString() };

      fetch(`${BASE_URL}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(question),
      })
        .then((res) => res.json())
        .then((savedQuestion) => {
          setQuestions((prev) => [...prev, savedQuestion]); // Update questions dynamically
          setNewQuestion('');
          setIsAsking(false);
        })
        .catch((err) => console.error('Error saving question:', err));
    }
  };

  const handleViewQuestion = (questionId) => {
    setViewingQuestion(questionId);

    // Check if answers for the question are already loaded
    if (answers[questionId]) return;

    fetch(`${BASE_URL}/questions/${questionId}/answers`)
      .then((res) => res.json())
      .then((data) => {
        setAnswers((prev) => ({
          ...prev,
          [questionId]: data,
        }));
      })
      .catch((err) => console.error('Error fetching answers:', err));
  };

  const handleAnswerSubmit = () => {
    if (newAnswer.trim() !== '') {
      const answer = { username:username,text: newAnswer,timestamp:new Date().toISOString() };

      fetch(`${BASE_URL}/questions/${viewingQuestion}/answers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answer),
      })
        .then((res) => res.json())
        .then((updatedAnswers) => {
          // Update the answers dynamically
          setAnswers((prev) => ({
            ...prev,
            [viewingQuestion]: updatedAnswers,
          }));
          setNewAnswer('');
        })
        .catch((err) => console.error('Error saving answer:', err));
    }
  };

  return (
    <div>
      <div className='head'><Header isLoggedIn={isLoggedIn} username={isLoggedIn ? username : "YourUsername"} /></div>
    <div className="app-container">
      
      <header>
        <h1>Code Tackle</h1>
      </header>
      {viewingQuestion === null ? (
        <div className="home-container">
          <ul className="question-list">
            {questions.map((q) => (
              <li
                key={q._id}
                onClick={() => handleViewQuestion(q._id)}
                className="question-item"
              >
                <p><strong>Question : </strong>{q.text}</p>
                <p><strong>Added By: </strong>{q.username}</p>
                <p><strong>Added On: </strong>{q.timestamp}</p>
              </li>
            ))}
          </ul>
          <button className="ask-button" onClick={() => setIsAsking(true)}>
            + Ask Question
          </button>
          {isAsking && (
            <div className="ask-form">
              <textarea
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Enter your question..."
              ></textarea>
              <div className="ask-form-buttons">
                <button onClick={handleAskQuestion}>Submit</button>
                <button onClick={() => setIsAsking(false)}>Back</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="answers-container">
          <button className="back-button" onClick={() => setViewingQuestion(null)}>
            Back
          </button>
          <div className="question-box">
            <h2>{questions.find((q) => q._id === viewingQuestion)?.text}</h2>
          </div>
          <ul className="answer-list">
            {(answers[viewingQuestion] || []).map((ans, index) => (
              <li key={index}>
                <p><strong>Answer: </strong>{ans.text}</p>
                <p><strong>Added On: </strong>{ans.timestamp}</p>
              </li>
            ))}
          </ul>
          <textarea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Enter your answer..."
          ></textarea>
          <button className="submit-answer-button" onClick={handleAnswerSubmit}>
            Submit Answer
          </button>
        </div>
      )}
      <style jsx>{`
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background: white;
          color: #4b0082;
        }

        header {
          text-align: center;
          background: #4b0082;
          color: #fff;
          padding: 15px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        }
        .head{
        max-width: 100%
        }
        .app-container {
          width: 100%;
          max-width: 1200px;
          margin: auto;
          padding: 20px;
          box-sizing: border-box;
        }

        .home-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
        }

        .question-list {
          list-style-type: none;
          padding: 0;
          margin-bottom: 20px;
          width: 100%;
        }

        .question-item {
          padding: 15px;
          background: #fff;
          margin-bottom: 10px;
          border-radius: 4px;
          border: 2px solid #7b42f6;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .question-item:hover {
          background-color: #d8bfd8;
        }

        .ask-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #7b42f6;
          color: #fff;
          border: none;
          border-radius: 50%;
          padding: 15px 20px;
          cursor: pointer;
          font-size: 24px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .ask-button:hover {
          background: #5e2dbc;
          transform: scale(1.1);
        }

        .ask-form {
          margin-top: 20px;
          width: 100%;
          display: flex;
          flex-direction: column;
          border: none;
          padding: 10px;
          border-radius: 4px;
        }

        .ask-form textarea {
          width: 100%;
          height: 120px;
          margin-bottom: 10px;
          padding: 10px;
          font-size: 14px;
        }

        .ask-form-buttons {
          display: flex;
          gap: 10px;
        }

        .ask-form button {
          padding: 10px 15px;
          background: #7b42f6;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .ask-form button:hover {
          background: #5e2dbc;
        }

        .answers-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
        }

        .question-box {
          width: 100%;
          padding: 15px;
          border: 2px solid #7b42f6;
          background: white;
          margin-bottom: 20px;
          border-radius: 4px;
        }

        .answer-list {
          list-style-type: none;
          padding: 0;
          width: 100%;
          margin-bottom: 20px;
        }

        .answer-list li {
          background: #e1d8f1;
          padding: 15px;
          margin-bottom: 10px;
          border-radius: 4px;
        }

        .answer-list small {
          display: block;
          margin-top: 5px;
          font-size: 12px;
          color: #6a5acd;
        }

        textarea {
          width: 100%;
          height: 100px;
          margin-bottom: 10px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
        }

        .submit-answer-button {
          background: #7b42f6;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 4px;
          cursor: pointer;
          width: 100%;
          font-size: 14px;
        }

        .submit-answer-button:hover {
          background: #5e2dbc;
        }

        .back-button {
          background: #4b0082;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 10px 20px;
          cursor: pointer;
          margin-bottom: 20px;
        }

        .back-button:hover {
          background: #3a006f;
        }

        @media (max-width: 768px) {
          .app-container {
            padding: 10px;
          }

          .home-container {
            padding: 10px;
          }

          .question-list li {
            padding: 10px;
          }

          .ask-button {
            padding: 12px;
            font-size: 22px;
          }

          .ask-form textarea {
            height: 100px;
          }

          .answer-list li {
            padding: 10px;
          }
        }
      `}</style>
    </div>
    </div>
  );
};

export default CodeTackle;