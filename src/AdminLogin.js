import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login Data:", loginData);
    alert("Login successful! Redirecting...");
    navigate("/AdminHome", { state: { username: loginData.username } });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleUser = () => {
    console.log("Navigating to adminLogin");
    navigate("/");
  };


  return (
    <div>
      <div className="violet-circle">
        <div className={`welcome-text`}>
          <h1>{"Welcome User"}</h1>
        </div>
      </div>
    <div className="admin-login-container">
      <div className="form-wrapper">
        <h1 style={{color:"rgb(129, 53, 136)"}}>Admin Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={loginData.username}
            onChange={handleLoginChange}
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginChange}
          />
          <br />
          <button type="submit">Sign In</button>
          <p><b onClick={handleUser} className="pointer">
                  Sign in as User
              </b></p>
        </form>
      </div>
      </div>

      <style>
        {`
          /* Integrating styles from .App page */
          .App {
            text-align: center;
          }

          .App-logo {
            height: 40vmin;
            pointer-events: none;
          }

          @media (prefers-reduced-motion: no-preference) {
            .App-logo {
              animation: App-logo-spin infinite 20s linear;
            }
          }


          .App-header {
            background-color: #282c34;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: calc(10px + 2vmin);
            color: white;
          }

          .App-link {
            color: #61dafb;
          }

          @keyframes App-logo-spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          p {
          text-align: center;
          margin-top:10px;
          }
          /* Admin Login styles */
          .admin-login-container {
            display: flex;
            margin-left: 950px;
            align-items: center;
            height: 100vh;
            
            font-family: Arial, sans-serif;
          }

          .form-wrapper {
            background-color: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
          }

          h1 {
            text-align: center;
            color: white;
            margin-bottom: 1.5rem;
          }

          input[type="text"],
          input[type="password"] {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 14px;
          }

          input[type="text"]:focus,
          input[type="password"]:focus {
            border-color: #4b9cd3;
            outline: none;
          }

          button {
            width: 100%;
            padding: 12px;
            background-color: rgb(129, 53, 136);
            border: none;
            border-radius: 4px;
            font-size: 16px;
            color: white;
            cursor: pointer;
          }

          button:hover {
            background-color: rgb(129, 53, 136);
          }

          @media (max-width: 480px) {
            .form-wrapper {
              width: 90%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AdminLogin;
