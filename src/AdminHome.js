import React from "react";
import Header from "./Components/Header";
import Card from "./Components/Card";
import "./Styles/HomePage.css";
import exam from "./assets/images/exam.png";
import leadBoard from "./assets/images/lead.png";
import { Link, useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const username = location.state?.username || "Admin";

  return (
    <div>
      <Header isLoggedIn={true} username={username} />
      <main>
        <div className="bor">
          <h2 id="title">"Coding: The Journey of Endless Possibilities."</h2>
        </div>
        <div className="cent">
          <div className="row">
            <div className="ele">
              <Link to="/leaderboard">
                <Card imgSrc={leadBoard} alt="Leaderboard" title="Leaderboard" />
              </Link>
            </div>
            <div className="ele">
              <Link to="/create">
                <Card
                  imgSrc={exam}
                  alt="Exams and Preparation"
                  title="Exams and Preparation"
                />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
