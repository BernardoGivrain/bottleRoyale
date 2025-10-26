import React from "react";
import "./App.css";
import { SpotlightNewDemo } from "./components/SpotlightNewDemo";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Forms from "./pages/Forms";
import Forms2 from "./pages/Forms2";
import Home from "./pages/Home";

export default function App(){
    return(
      <div>
          <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/forms" element={<Forms/>}/>
            <Route path="/forms2" element={<Forms2/>}/>
          </Routes>
          </Router>
      </div>
    );
}