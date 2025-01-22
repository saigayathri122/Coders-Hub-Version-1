import React, { useState, useEffect } from 'react';
import Header from './Components/Header';

function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    role: '',
    duration: '',
  });
  
  const BASE_URL = "http://localhost:5004"; // Ensure your backend is running on this port

  // Fetch experiences from the database
  useEffect(() => {
    fetch(`${BASE_URL}/experiences`) // Make sure this endpoint is correct and responds with the data
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched experiences:', data);  // Log data for debugging
        setExperiences(data);
      })
      .catch((error) => {
        console.error('Error fetching experiences:', error);
      });
  }, []);

  

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addExperience = (e) => {
    e.preventDefault();

    if (
      formData.name.trim() &&
      formData.company.trim() &&
      formData.role.trim() &&
      formData.duration.trim()
    ) {
      const newExperience = {
        ...formData,
        timestamp: new Date().toISOString(), // Use ISO format for timestamps
        username: localStorage.getItem("username"), // Ensure username is sent with the new experience
      };

      fetch(`${BASE_URL}/experiences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExperience),
      })
        .then((response) => response.json())
        .then((createdExperience) => {
          console.log('Created experience:', createdExperience);  // Log created experience for debugging
          setExperiences([...experiences, createdExperience]);
          setFormData({ name: '', company: '', role: '', duration: '' });
          setFormVisible(false);
        })
        .catch((error) => console.error('Error adding experience:', error));
    }
  };

  const username = localStorage.getItem("username"); // Get username from localStorage
  const isLoggedIn = username !== null;

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} username={isLoggedIn ? username : "YourUsername"} />
      <div className="experience-page">
        <h1>Experience Page</h1>

        {!formVisible && (
          <>
            <div className="experience-list">
              {experiences.length === 0 ? (
                <p>No experiences to display</p>
              ) : (
                experiences.map((exp, index) => (
                  <div className="experience-item" key={index}>
                    <h3>{exp.company}</h3>
                    <p><strong>Name:</strong> {exp.name}</p>
                    <p><strong>Role:</strong> {exp.role}</p>
                    <p><strong>Duration:</strong> {exp.duration}</p>
                    <p><strong>Added By:</strong> {exp.username}</p>
                    <p className="timestamp">
                      <strong>Added On:</strong> {new Date(exp.timestamp).toLocaleString('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </p>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {formVisible && (
          <div className="form-section">
            <h2>Add Experience</h2>
            <form onSubmit={addExperience}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleFormChange}
                required
              />
              <input
                type="text"
                name="role"
                placeholder="Job Role"
                value={formData.role}
                onChange={handleFormChange}
                required
              />
              <input
                type="text"
                name="duration"
                placeholder="Experience Duration (e.g., 2 years)"
                value={formData.duration}
                onChange={handleFormChange}
                required
              />
              <button type="submit">Submit</button>
            </form>
            <button className="btn-cancel" onClick={() => setFormVisible(false)}>
              Back
            </button>
          </div>
        )}

        {/* Add Experience Circular Button */}
        <button className="btn-add" onClick={() => setFormVisible(true)}>
          +
        </button>

        <style jsx>{`
          .experience-page {
            padding: 20px;
            font-family: Arial, sans-serif;
            background-color: #f8f9fa;
            color: #5a189a;
            min-height: 100vh;
          }

          h1 {
            text-align: center;
            color: #5a189a;
            margin-bottom: 20px;
          }

          .experience-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin: 20px 0;
            max-height: 80vh;
            overflow-y: auto;
          }

          .experience-item {
            background-color: #fff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            border-left: 5px solid #5a189a;
          }

          .experience-item h3 {
            margin: 0;
            color: #5a189a;
          }

          .experience-item p {
            margin: 5px 0;
            color: #333;
          }

          .experience-item .timestamp {
            margin-top: 10px;
            font-style: italic;
            color: #6c757d;
          }

          /* Style for the Add Experience button */
          .btn-add {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            background-color: #5a189a;
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }

          .btn-add:hover {
            background-color: #7b2cbf;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          }

          .form-section {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            margin: 0 auto;
            color: #333;
          }

          .form-section input {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }

          .form-section button {
            width: 100%;
            padding: 10px;
            background-color: #5a189a;
            color: white;
            border: none;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
          }

          .form-section button:hover {
            background-color: #7b2cbf;
          }

          .btn-cancel {
            background-color: #6c757d;
            margin-top: 10px;
          }

          .btn-cancel:hover {
            background-color: #868e96;
          }
        `}</style>
      </div>
    </div>
  );
}

export default Experience;
