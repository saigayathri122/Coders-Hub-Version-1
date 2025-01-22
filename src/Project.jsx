import React, { useState, useEffect } from "react";
import Header from './Components/Header'; // Import the Header component
import moment from 'moment';

function Project() {
  const [activeSection, setActiveSection] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [projects, setProjects] = useState({}); // Projects grouped by department
  const [formData, setFormData] = useState({
    department: "",
    domain: "",
    title: "",
    description: "",
  });

  const username = localStorage.getItem("username"); // Get username from localStorage
  const isLoggedIn = username !== null;

  // Fetch all projects from the backend on component mount
  useEffect(() => {
    fetch("http://localhost:5004/projects") // Corrected port
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Group projects by department
        const groupedProjects = data.reduce((acc, project) => {
          const { department } = project;
          if (!acc[department]) acc[department] = [];
          acc[department].push(project);
          return acc;
        }, {});
        setProjects(groupedProjects);
      })
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  const showSection = (sectionId) => {
    setActiveSection(sectionId);
    setFormVisible(false);
  };

  const goBack = () => {
    setActiveSection("");
    setFormVisible(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addProject = (e) => {
    e.preventDefault();
  
    // Log the form data before sending it to the backend
    console.log("Form Data being sent to backend:", formData);
  
    // Check that all fields are filled
    if (
      formData.department &&
      formData.domain.trim() &&
      formData.title.trim() &&
      formData.description.trim()
    ) {
      const newProject = { ...formData,username,timestamp: new Date().toISOString(),  };
  
      // Log the new project to check the data structure
      console.log("Adding new project:", newProject);
  
      // Send new project to the backend
      fetch("http://localhost:5004/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((errorData) => {
              throw new Error(errorData.message || 'Failed to add project');
            });
          }
          return response.json();
        })
        .then((data) => {
          // Update projects state to reflect the new project
          setProjects((prevProjects) => ({
            ...prevProjects,
            [data.department]: [
              ...(prevProjects[data.department] || []),
              data,
            ],
          }));
          // Reset the form
          setFormData({ department: "", domain: "", title: "", description: "" });
          setFormVisible(false); // Hide the form after submission
        })
        .catch((error) => {
          console.error("Error adding project:", error);
          alert("Failed to add the project: " + error.message);
        });
    } else {
      alert("Please fill out all fields before submitting!");
    }
  };
  
  return (
    <div className="App">
      {/* Include the Header component here */}
      <Header isLoggedIn={isLoggedIn} username={isLoggedIn ? username : "YourUsername"} />

      <h1>Project Showcase</h1>

      {/* Buttons to select department */}
      {!activeSection && !formVisible && (
        <div className="btn-group">
          {["cse", "ece", "it", "civil"].map((dept) => (
            <button key={dept} className="btn" onClick={() => showSection(dept)}>
              {dept.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {/* Display projects of the selected department */}
      {activeSection && (
        <div className="section">
          <h2>{activeSection.toUpperCase()} Projects</h2>
          <div className="content">
            <ul>
              {(projects[activeSection] || []).map((project, index) => (
                <li key={project._id}>
                  <strong>Project {index + 1}:</strong> {project.title}
                  <p>
                    <strong>Project domain : </strong>{project.domain}
                  </p>
                  <p>
                    <strong>Project description : </strong>{project.description}
                  </p>
                  <p>
                    <strong>Added By : </strong>{project.username}
                  </p>
                  <p className="timestamp">
                    <strong>Added On:</strong> {new Date(project.timestamp).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Project form */}
      {formVisible && (
        <div className="form-section">
          <h2>Add a New Project</h2>
          <form onSubmit={addProject}>
            <div className="form-group">
              <label htmlFor="department">Department:</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleFormChange}
                required
              >
                <option value="" disabled>
                  Select Department
                </option>
                <option value="cse">CSE</option>
                <option value="ece">ECE</option>
                <option value="it">IT</option>
                <option value="civil">Civil</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="domain">Domain:</label>
              <input
                type="text"
                id="domain"
                name="domain"
                placeholder="Enter project domain..."
                value={formData.domain}
                onChange={handleFormChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter project title..."
                value={formData.title}
                onChange={handleFormChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter project description..."
                value={formData.description}
                onChange={handleFormChange}
                required
              ></textarea>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {/* Back button */}
      {(activeSection || formVisible) && (
        <button className="btn btn-back" onClick={goBack}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
      )}

      {/* Add project button */}
      <button className="btn-add" onClick={() => setFormVisible(true)} 
        style={{ display: activeSection ? "none" : "flex" }}>
          +
      </button>

      <style jsx>{`

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
.content .timestamp {
margin-top: 10px;
font-style: italic;
color: #6c757d;
}
Header{
width : 100%;
}
.section {
display: flex;
flex-direction: column;
gap: 15px;
margin: 20px 0;
max-height: 80vh;
overflow-y: auto;
}
h1 {
  text-align: center;
  color: #5a189a;
  margin-bottom: 20px;
}
  h2{
  color: #5a189a;
  margin-bottom: 20px;
  }
.content{
background-color: #fff;
padding: 15px;
border-radius: 8px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
border-left: 5px solid #5a189a;
}
.app {
display: flex;
flex-direction: column;
align-items: center;
margin: 0;
padding: 20px;
font-family: Arial, sans-serif;
background-color: #f9f5ff;
color: #240046;
}

h1 {
color: #5a189a;
}

.btn-group {
display: flex;
flex-wrap: wrap;
justify-content: center;
gap: 10px;
margin-top: 20px;
}

.btn {
display: inline-flex;
align-items: center;
padding: 10px 20px;
border: none;
background-color: #5a189a;
color: white;
cursor: pointer;
font-size: 16px;
border-radius: 4px;
text-decoration: none;
transition: background-color 0.3s, transform 0.2s;
}

.btn:hover {
background-color: #7b2cbf;
transform: scale(1.05);
}

.btn-add-project {
position: fixed;
bottom: 20px;
right: 20px;
z-index: 100;
background-color: #5a189a;
color: white;
font-size: 16px;
border-radius: 4px;
padding: 10px 20px;
display: inline-flex;
align-items: center;
justify-content: center;
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.btn-add-project:hover {
background-color: #7b2cbf;
transform: scale(1.05);
}

.section {
text-align: left;
margin-top: 20px;
width: 100%;
}

.content ul {
list-style-type: none;
padding: 0;
margib : 5px 0;
color: #333;
}

.content ul li {
background-color: #ffffff;
padding: 10px;
margin: 5px 0;
border-radius: 4px;
transition: transform 0.2s;
}

.content ul li:hover {
transform: scale(1.03);
}

.form-section {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  margin: 20px auto; /* This centers the form horizontally */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* This centers the content inside the form */
}


.form-group {
margin-bottom: 15px;
display: flex;
flex-direction: column;
align-items: flex-start;
}

.form-group label {
margin-bottom: 5px;
font-weight: bold;
}

.form-group input,
.form-group select,
.form-group textarea {
width: 100%;
padding: 10px;
margin-bottom: 10px;
border: 1px solid #ccc;
border-radius: 4px;
}

.form-section button {
width: 100%;
padding: 10px;
background-color: #5a189a;
color: white;
border: none;
font-size: 16px;
border-radius: 4px;
transition: background-color 0.3s, transform 0.2s;
}

.form-section button:hover {
background-color: #7b2cbf;
transform: scale(1.03);
}

.btn-back {
background-color: #6c757d;
color: white;
border: none;
padding: 10px 20px;
border-radius: 4px;
position: fixed;
bottom: 20px;
left: 20px;
}

.btn-back:hover {
background-color: #868e96;
transform: scale(1.05);
}
`}</style>
    </div>
  );
}

export default Project;
