import React from "react";
import Header from "./Components/Header";
import Card from "./Components/Card";
import "./Styles/HomePage.css";
import codeImage from "./assets/images/code.png";
import exam from "./assets/images/exam.png";
import experience from "./assets/images/exp1.png";
import grow from "./assets/images/grow.png";
import leadBoard from "./assets/images/lead.png";
import projects from "./assets/images/pro.png";
import { Link } from "react-router-dom";

function home() {
  const username = localStorage.getItem("username"); // Get username from localStorage
  const isLoggedIn = username !== null;

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} username={isLoggedIn ? username : "YourUsername"} />
      <main>
        <div className="bor">
          <h2 id="title">"Coding: The Journey of Endless Possibilities."</h2>
        </div>
          <div className="cent">
            <div className="row">
              <div className="ele">
              <Link to="/experience">
                <Card imgSrc={experience} alt="Experiences" title="Experiences" />
              </Link>
              </div>
              <div className="ele">
              <Link to="/code-tackle">
                <Card imgSrc={codeImage} alt="Code Tackle" title="Code Tackle" />
              </Link>
              </div>
              <div className="ele">
              <Link to="/projects">
                <Card imgSrc={projects} alt="Project Showcase" title="Project Showcase" />
              </Link>
              </div>
            </div>
            <div className="row">
              <div className="ele">
              <Link to="/leaderboard">
                <Card imgSrc={leadBoard} alt="Leaderboard" title="Leaderboard" />
              </Link>
              </div>
              <div className="ele">
              <Link to="/exams">
                <Card imgSrc={exam} alt="Exams and Preparation" title="Exams and Preparation" />
              </Link>
              </div>
              <div className="ele">
              <Link to="/grow-skills">
                <Card imgSrc={grow} alt="Grow Your Skills" title="Grow Your Skills" />
              </Link>
              </div>
            </div>
          </div>
      </main>
    </div>
  );
}

export default home;