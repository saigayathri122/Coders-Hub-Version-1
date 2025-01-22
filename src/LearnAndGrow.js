import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Components/Header';

const TechnologyDetails = () => {
  const [technologies, setTechnologies] = useState([]);
  const [formData, setFormData] = useState({
    techName: '',
    description: '',
    difficultyLevel: '',
    useCases: '',
    paidLinks: [''],
    unpaidLinks: [''],
  });

  const username = localStorage.getItem("username"); // Get username from localStorage
  const isLoggedIn = username !== null;

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTechnologies();
  }, []);

  const fetchTechnologies = async () => {
    try {
      const response = await axios.get('http://localhost:5004/technologies');
      setTechnologies(response.data);
    } catch (error) {
      console.error('Error fetching technologies:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLinkChange = (index, type, value) => {
    setFormData((prev) => {
      const links = [...prev[type]];
      links[index] = value;
      return { ...prev, [type]: links };
    });
  };

  const addLinkField = (type) => {
    setFormData((prev) => ({
      ...prev,
      [type]: [...prev[type], ''],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const timestamp = new Date().toISOString(); // Get the timestamp here
    const updatedFormData = {
      ...formData,
      username,
      timestamp,  // Add timestamp here
    };
  
    try {
      const response = await axios.post('http://localhost:5004/technologies', updatedFormData);
      alert(response.data.message);
      setIsModalOpen(false);
      setFormData({
        techName: '',
        description: '',
        difficultyLevel: '',
        useCases: '',
        paidLinks: [''],
        unpaidLinks: [''],
      });
      fetchTechnologies();
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Failed to submit the form. Please try again.');
    }
  };
  

  return (
    <div className="page-container">
      <Header isLoggedIn={isLoggedIn} username={isLoggedIn ? username : "YourUsername"} />
      <h1>Learn and Grow</h1>

      {/* Display Technology Entries */}
      <div className="technologies-container">
        <h2>Technology List</h2>
        <div className="technology-list">
          {technologies.length > 0 ? (
            technologies.map((tech, index) => (
              <div className="technology-item" key={index}>
                <h3>{tech.techName}</h3>
                <p>
                  <strong>Description:</strong> {tech.description}
                </p>
                <p>
                  <strong>Difficulty Level:</strong> {tech.difficultyLevel}
                </p>
                <p>
                  <strong>Use Cases:</strong> {tech.useCases}
                </p>
                <p>
                  <strong>Paid Links:</strong>{' '}
                  {tech.paidLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resource-link"
                    >
                      {link}
                    </a>
                  ))}
                </p>
                <p>
                  <strong>Unpaid Links:</strong>{' '}
                  {tech.unpaidLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resource-link"
                    >
                      {link}
                    </a>
                  ))}
                </p>
                <p>
                    <strong>Added By : </strong>{tech.username}
                  </p>
                  <p className="timestamp">
                    <strong>Added On:</strong> {new Date(tech.timestamp).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })}
  </p>
              </div>
            ))
          ) : (
            <p>No technologies available.</p>
          )}
        </div>
      </div>

      {/* Floating Button */}
      <div className="floating-button">
        <button className="add-button" onClick={() => setIsModalOpen(true)}>
          +
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="form-container">
              <h1>Technology Details</h1>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="techName">Technology Name:</label>
                  <input
                    type="text"
                    id="techName"
                    name="techName"
                    value={formData.techName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="difficultyLevel">Difficulty Level:</label>
                  <select
                    id="difficultyLevel"
                    name="difficultyLevel"
                    value={formData.difficultyLevel}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Difficulty Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="useCases">Use Cases:</label>
                  <textarea
                    id="useCases"
                    name="useCases"
                    rows="6"
                    value={formData.useCases}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Links/Resources:</label>
                  <div>
                    <label>Paid:</label>
                    {formData.paidLinks.map((link, index) => (
                      <div className="input-group" key={index}>
                        <input
                          type="text"
                          value={link}
                          onChange={(e) =>
                            handleLinkChange(index, 'paidLinks', e.target.value)
                          }
                        />
                        {index === formData.paidLinks.length - 1 && (
                          <button
                            type="button"
                            className="add-button"
                            onClick={() => addLinkField('paidLinks')}
                          >
                            +
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <div>
                    <label>Unpaid:</label>
                    {formData.unpaidLinks.map((link, index) => (
                      <div className="input-group" key={index}>
                        <input
                          type="text"
                          value={link}
                          onChange={(e) =>
                            handleLinkChange(index, 'unpaidLinks', e.target.value)
                          }
                        />
                        {index === formData.unpaidLinks.length - 1 && (
                          <button
                            type="button"
                            className="add-button"
                            onClick={() => addLinkField('unpaidLinks')}
                          >
                            +
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <button type="submit">Submit</button>
                  <button
                    type="button"
                    className="back-button"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
            body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background: linear-gradient(to bottom, #fff, #e6e6fa);
    }

    .page-container {
      position: relative;
      min-height: 100vh;
    }

    .floating-button {
      position: fixed;
      bottom: 30px;
      right: 30px;
    }

    .add-button {
      font-size: 30px;
      width: 60px;
      height: 60px;
      background-color: #28a745;
      color: #fff;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: auto;
    }
      .technologies-container {
          padding: 20px;
          background-color: #f8f9fa;
          max-height: calc(100vh - 100px); /* Optional: Adjust based on your layout */
          overflow-y: auto; /* Enable vertical scrolling */
        }
      .page-container {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        body {
          overflow-y: auto; /* Ensure body can scroll */
        }


    .modal-content {
      background: #fff;
      padding: 20px;
      border-radius: 10px;
      width: 90%;
      max-width: 800px;
      max-height: 90%;
      overflow-y: auto;
    }

    .form-container h1 {
      text-align: center;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      font-weight: bold;
      display: block;
      margin-bottom: 8px;
    }

    .form-group input,
    .form-group textarea,
    .form-group select {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .form-group button {
      margin-top: 10px;
      padding: 10px;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .form-group button:hover {
      opacity: 0.9;
    }

    .back-button {
      background-color: #6c757d;
      margin-left: 10px;
    }

    .back-button:hover {
      background-color: #5a6268;
    }

    @media (max-width: 768px) {
      .modal-content {
        padding: 15px;
      }

      .add-button {
        width: 50px;
        height: 50px;
      }
    }
        .technologies-container {
          padding: 20px;
          background-color: #f8f9fa;
        }

        .technology-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .technology-item {
          background-color: #fff;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border-left: 5px solid #28a745;
        }

        .technology-item h3 {
          margin: 0;
          color: #28a745;
        }

        .technology-item p {
          margin: 5px 0;
        }

        .resource-link {
          color: #007bff;
          text-decoration: underline;
        }

        .resource-link:hover {
          text-decoration: none;
        }
      `}</style>
    </div>
  );
};

export default TechnologyDetails;