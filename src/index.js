import React from "react"; 
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import HomePage from "./home"; // Correct the import to match the file path
import "@fortawesome/fontawesome-free/css/all.min.css";
import Experience from "./Experience";
import Project from "./Project.jsx"
import TechnologyDetails from './LearnAndGrow';
import CodeTackle from './CodeTackle';
import UserTakeExam from "./TakeExam.js";
import AdminCreateExam from "./CreateExam.js";
import ExamPage from './ExamPage.js';
import AdminLogin from "./AdminLogin.js";
import AdminHome from "./AdminHome.js";
import Leaderboard from "./LeaderBoard.js";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/adminLogin" element={<AdminLogin />} />
      <Route path="/AdminHome" element={<AdminHome />} />

      <Route path="/home" element={<HomePage />} />
      <Route path="/experience" element={<Experience />} /> 
      <Route path="/code-tackle" element={<CodeTackle />} />
      <Route path="/projects" element={<Project/>} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/exams" element={<UserTakeExam/>} />
      <Route path = '/create' element = {<AdminCreateExam/>}/>
      <Route path="/exam" element={<ExamPage />} />
      <Route path="/grow-skills" element={<TechnologyDetails/>} />
    </Routes>
  </BrowserRouter>
);
