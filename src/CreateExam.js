import React, { useState } from 'react';
import axios from 'axios';
import Header from './Components/Header';
import { useLocation } from 'react-router-dom';
const AdminCreateExam = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const handleSaveExam = () => {
    const examData = { title, description, questions };
    axios
      .post('http://localhost:5004/exams', examData)
      .then(() => {
        alert('Exam Created Successfully');
      })
      .catch(() => {
        alert('Error creating exam');
      });
  };
  const location = useLocation();
  const username = location.state?.username || "admin1";
  return (
    <div>
      <div><Header isLoggedIn={true} username={username} /></div>
    <div className="admin-create-exam">
      <h1>Create Exam</h1>
      <input
        type="text"
        placeholder="Exam Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input-field"
      />
      <textarea
        placeholder="Exam Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="textarea-field"
      />

      {questions.map((question, index) => (
        <div key={index} className="question-block">
          <input
            type="text"
            placeholder="Question Text"
            value={question.questionText}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[index].questionText = e.target.value;
              setQuestions(newQuestions);
            }}
            className="input-field"
          />
          {question.options.map((option, optIndex) => (
            <input
              key={optIndex}
              type="text"
              placeholder={`Option ${optIndex + 1}`}
              value={option}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[index].options[optIndex] = e.target.value;
                setQuestions(newQuestions);
              }}
              className="input-field"
            />
          ))}
          <input
            type="text"
            placeholder="Correct Answer"
            value={question.correctAnswer}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[index].correctAnswer = e.target.value;
              setQuestions(newQuestions);
            }}
            className="input-field"
          />
        </div>
      ))}
      <button onClick={handleAddQuestion} className="btn">
        Add Question
      </button>
      <button onClick={handleSaveExam} className="btn">
        Save Exam
      </button>

      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body, html {
            height: 100%;
            overflow: auto;
          }

          .admin-create-exam {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            background-color: #ffffff;
            overflow-y: auto;
          }

          .input-field,
          .textarea-field {
            width: 100%;
            margin: 10px 0;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
          }

          .textarea-field {
            height: 100px;
            resize: none;
          }

          .question-block {
            margin-bottom: 20px;
          }

          .btn {
            padding: 10px 15px;
            margin-right: 10px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
          }

          .btn:hover {
            background-color: #0056b3;
          }

          .btn:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
          }
        `}
      </style>
    </div>
    </div>
  );
};

export default AdminCreateExam;
