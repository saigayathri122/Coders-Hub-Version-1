import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./styles.css";

const App = () => {
  const [isSignIn, setIsSignIn] = useState(true); // Switch between signup and login
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    branch: "",
    password: "",
    confirmPassword: ""
  });
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });
  const [authToken, setAuthToken] = useState("");
  const navigate = useNavigate();

  // Base URL for your backend server
  const BASE_URL = "http://localhost:5004"; // Change this if your server runs on a different port or domain

  // Toggle between signup and login
  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    if (!isSignIn) {
      setLoginData({
        username: "",
        password: ""
      });
    }
  };

  const handleAdmin = () => {
    console.log("Navigating to adminLogin");
    navigate("/adminLogin");
  };

  // Handle signup form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    const { username, email, branch, password, confirmPassword } = signupData;

    if (!username || !email || !branch || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/signup`, {
        username,
        email,
        branch,
        password,
        confirmPassword
      });
      alert(response.data.message);
      toggleForm(); // Switch to sign-in after signup
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { username, password } = loginData;
  
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }
  
    try {
      const response = await axios.post(`${BASE_URL}/login`, loginData);
  
      if (response.data.success) {
        const { token, message } = response.data;
        localStorage.setItem("authToken", token);  // Store the token in localStorage
        localStorage.setItem("username", username); // Store the username in localStorage
        alert(message);
  
        // Redirect to home page
        navigate("/home");
      } else {
        alert(response.data.message || "Login unsuccessful");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "An error occurred during login.");
    }
  };
  // Handle change functions for signup and login inputs
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value
    });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData( {
      ...loginData,
      [name]: value
    });
  };

  return (
    <div className={`container ${isSignIn ? "sign-in" : "sign-up"}`}>
      {/* Violet circle and welcome text */}
      <div className="violet-circle">
        <div className={`welcome-text ${isSignIn ? "sign-in" : "sign-up"}`}>
          <h1>{isSignIn ? "Welcome User" : "Join with Us"}</h1>
        </div>
      </div>

      <div className="row">
        {/* Signup Form */}
        <div className="col align-items-center flex-col sign-up">
          <div className="form-wrapper align-items-center">
            <form className="form sign-up" onSubmit={handleSignup}>
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  required
                  value={signupData.username}
                  onChange={handleSignupChange}
                />
              </div>
              <div className="input-group">
                <i className="bx bx-mail-send"></i>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  value={signupData.email}
                  onChange={handleSignupChange}
                />
              </div>
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input
                  name="branch"
                  type="text"
                  placeholder="Branch"
                  required
                  value={signupData.branch}
                  onChange={handleSignupChange}
                />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  value={signupData.password}
                  onChange={handleSignupChange}
                />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  required
                  value={signupData.confirmPassword}
                  onChange={handleSignupChange}
                />
              </div>
              <button type="submit" className="pointer">
                Sign up
              </button>
              <p>
                Already have an account?{" "}
                <b onClick={toggleForm} className="pointer">
                  Sign in here
                </b>
              </p>
            </form>
          </div>
        </div>

        {/* Login Form */}
        <div className="col align-items-center flex-col sign-in">
          <div className="form-wrapper align-items-center">
            <form className="form sign-in" onSubmit={handleLogin}>
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  required
                  value={loginData.username}
                  onChange={handleLoginChange}
                />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  value={loginData.password}
                  onChange={handleLoginChange}
                />
              </div>
              <button type="submit" className="pointer">
                Sign in
              </button>
              <b onClick={handleAdmin} className="pointer">
                  Sign in as admin
              </b>
              <p>
                Don't have an account?{" "}
                <b onClick={toggleForm} className="pointer">
                  Sign up here
                </b>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
