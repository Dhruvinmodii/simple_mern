import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Adduser from "./pages/adduser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/adduser" element={<Adduser />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
