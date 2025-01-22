import React, { useState, useEffect } from "react";
import Header from "./Components/Header";

function Leaderboard() {
  const [users, setUsers] = useState([]); // Initialize users as an empty array
  const BASE_URL = "http://localhost:5004"; // Backend URL
  const username = localStorage.getItem("username"); // Get username from localStorage
  const isLoggedIn = username !== null;

  // Fetch leaderboard data from the backend
  useEffect(() => {
    fetch(`${BASE_URL}/leaderboard`)
      .then((res) => res.json())
      .then((data) => {
        // Ensure that data is an array before setting the state
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error('Invalid leaderboard data:', data);
        }
      })
      .catch((err) => console.error('Error fetching leaderboard data:', err));
  }, []);

  return (
    <div className="leaderboard">
      <Header isLoggedIn={isLoggedIn} username={isLoggedIn ? username : "YourUsername"} />
      <h1>Leaderboard</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Experiences</th>
              <th>Projects</th>
              <th>Questions</th>
              <th>Technologies</th>
              <th>Exam Score</th>
              <th>Total Documents</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user, index) => {
                const totalDocuments = Object.values(user.collections).reduce((sum, count) => sum + count, 0);
                return (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.collections.experiences}</td>
                    <td>{user.collections.projects}</td>
                    <td>{user.collections.questions}</td>
                    <td>{user.collections.technologies}</td>
                    <td>{user.collections.Score}</td>
                    <td>{totalDocuments}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7">Loading....</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <style>
        {`
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            height: 100%;
            display: flex;
            flex-direction: column;
          }

          h1 {
            text-align: center;
            color: #333;
            margin: 20px;
          }

          .leaderboard {
            width: 100%;
            height: 100vh; /* Set the height to 100% of the viewport height */
            background: #fff;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
            border-radius: 8px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }

          .table-container {
            flex-grow: 1;
            overflow-y: auto; /* Enable vertical scrolling if the table overflows */
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          th, td {
            padding: 12px;
            text-align: center;
            border-bottom: 1px solid #ddd;
          }

          th {
            background-color: #813588;;
            color: white;
            position: sticky;
            top: 0; /* Keep the header fixed at the top */
            z-index: 1; /* Ensure the header stays above the table rows */
          }

          tr:nth-child(even) {
            background-color: #f9f9f9;
          }

          tr:hover {
            background-color: #f1f1f1;
          }

          td {
            font-size: 16px;
          }
        `}
      </style>
    </div>
  );
}

export default Leaderboard;
