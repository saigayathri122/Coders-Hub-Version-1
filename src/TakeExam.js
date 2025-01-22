import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from './Components/Header';

const UserTakeExam = () => {
  const [exams, setExams] = useState([]);
  const [examResults, setExamResults] = useState({});
  const [error, setError] = useState(null);

  const username = localStorage.getItem('username');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (username) {
      // Fetch all exams
      axios
        .get('http://localhost:5004/exams')
        .then((response) => {
          setExams(response.data);

          // Fetch exam results for the logged-in user
          axios
            .get(`http://localhost:5004/results?userId=${username}`)
            .then((resultResponse) => {
              const results = resultResponse.data.reduce((acc, result) => {
                acc[result.examId] = result; // Store score per exam
                return acc;
              }, {});
              setExamResults(results); // Store the results (scores)
            })
            .catch(() => {
              setError('Error fetching results, please try again later.');
            });
        })
        .catch(() => {
          setError('Error fetching exams, please try again later.');
        });
    } else {
      setError('User not logged in.');
    }
  }, [username]);

  // Update exam results dynamically when redirected back after exam submission
  useEffect(() => {
    if (location.state?.examId && location.state?.score !== undefined) {
      const { examId, score } = location.state;
      setExamResults((prev) => ({
        ...prev,
        [examId]: { score },
      }));
    }
  }, [location.state]);

  const handleStartExam = (examId) => {
    const exam = exams.find((exam) => exam._id === examId);
    navigate('/exam', { state: { exam } });
  };
  const isLoggedIn = username !== null;

  return (
    <div>
      <div className='exam'><Header isLoggedIn={isLoggedIn} username={isLoggedIn ? username : "YourUsername"} /></div>
    <div className="exam-container">
      
      <h1>Exams</h1>
      {error && <div className="error-message">{error}</div>}
      {exams.map((exam) => (
        <div key={exam._id} className="exam-card">
          <h2>{exam.title}</h2>
          {examResults[exam._id] ? (
            <div className="exam-result">
              <p>Your score: {examResults[exam._id].score}</p>
            </div>
          ) : (
            <button onClick={() => handleStartExam(exam._id)}>Take Exam</button>
          )}
        </div>
      ))}
      <style>{`
        .exam{max-width : 100%}
        .exam-container { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
        .exam-card { background-color: #f9f9f9; padding: 15px; margin-bottom: 15px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
        .exam-result { background-color: #e0ffe0; padding: 10px; border-radius: 5px; }
        button { padding: 10px 15px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; }
        button:hover { background-color: #0056b3; }
      `}</style>
    </div>
    </div>
  );
};

export default UserTakeExam;
