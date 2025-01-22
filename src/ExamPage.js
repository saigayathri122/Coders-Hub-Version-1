import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Components/Header';

const ExamPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { exam } = state; // Exam data passed from UserTakeExam
  const [answers, setAnswers] = useState(new Array(exam.questions.length).fill(''));
  const [error, setError] = useState(null);
  const username = localStorage.getItem("username"); // Get username from localStorage
  const isLoggedIn = username !== null;

  const handleAnswerChange = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmitExam = () => {
    if (!username) {
      setError('User not logged in. Please log in to submit your exam.');
      return;
    }

    // Submit the answers and get the score from the server
    axios
      .post('http://localhost:5004/results', { examId: exam._id, answers, userId: username })
      .then((response) => {
        // Navigate back to UserTakeExam with score and examId
        navigate('/exams', { state: { examId: exam._id, score: response.data.score } });
      })
      .catch((error) => {
        setError(error.response ? error.response.data.message : 'An error occurred while submitting the exam.');
      });
  };

  return (
    <div>
      <div className='head'><Header isLoggedIn={isLoggedIn} username={isLoggedIn ? username : "YourUsername"} /></div>
      <div className="exam-page">
        
        <h1 className="exam-title">{exam.title}</h1>
        {error && <div className="error-message">{error}</div>}

        <div className="exam-card">
          <div className="exam-questions">
            {exam.questions.map((question, index) => (
              <div key={index} className="question-container">
                <p><strong>Question {index + 1}:</strong> {question.questionText}</p>
                <div className="options-container">
                  {question.options.map((option, optIndex) => (
                    <label key={optIndex} className="option-label">
                      <input
                        type="radio"
                        name={`question${index}`}
                        value={option}
                        checked={answers[index] === option}
                        onChange={() => handleAnswerChange(index, option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="submit-button-container">
            <button onClick={handleSubmitExam}>Submit Exam</button>
          </div>
        </div>
      </div>

      <style>{`
        .head { max-width: 100%; }
        .exam-page { 
          font-family: Arial, sans-serif; 
          padding: 20px; 
          max-width: 800px; 
          margin: 0 auto; 
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .exam-title { 
          text-align: center; 
          margin-bottom: 20px; 
        }

        .exam-card {
          background-color: #fff;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-height: 500px; /* Makes the card scrollable */
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .exam-questions {
          flex-grow: 1; /* Ensures it fills the available space */
        }

        .question-container { 
          margin-bottom: 20px; 
        }

        .options-container { 
          display: flex; 
          flex-direction: column; 
          gap: 10px; 
        }

        .option-label { 
          font-size: 14px; 
          padding-left: 10px; 
        }

        .submit-button-container { 
          display: flex; 
          justify-content: center; 
          margin-top: 20px; 
          margin-bottom: 20px;
        }

        button { 
          padding: 10px 15px; 
          background-color: #813588; 
          color: white; 
          border: none; 
          border-radius: 5px; 
          cursor: pointer; 
        }

        button:hover { 
          background-color: #0056b3; 
        }
      `}</style>
    </div>
  );
};

export default ExamPage;
