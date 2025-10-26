import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Forms from "./pages/Forms";
import Forms2 from "./pages/Forms2";

export default function App(){
    return(
      <div>
          <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/forms" element={<Forms/>}/>
            <Route path="/forms2" element={<Forms2/>}/>
          </Routes>
          </Router>
      </div>
    );
}