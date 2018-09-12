import ReactDOM from "react-dom";
import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.js";



  ReactDOM.render(
    <Router>
      <App />
    </Router>,
    document.getElementById("root")
  )