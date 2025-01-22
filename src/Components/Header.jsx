import React, { useEffect, useState } from "react";
import "../Styles/Header.css";
import logo from "../assets/images/CodersHub.png";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Header({ isLoggedIn, username }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="site-header">
      <div className="site-identity">
        <Link to="/home" id="logo">
          <img src={logo} alt="Site Logo" className="site-logo" />
        </Link>
        <h1>
          <Link to="/" className="site-title">CodersHub</Link>
        </h1>
      </div>
      <nav className="site-navigation">
        <ul className="nav">
          {isLoggedIn ? (
            <>
              <li className="username">
                <Link to="#">
                  <i className="fa-solid fa-circle-user" id="user"></i>&nbsp;
                  {username}
                </Link>
              </li>
              <li>
                <a href="#" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </a>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">
                <i className="fas fa-sign-in-alt"></i> Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}


export default Header;
