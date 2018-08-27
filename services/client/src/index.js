import ReactDOM from "react-dom";
import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";

import UsersList from "./components/UsersList";
import AddUser from "./components/AddUser";
import App from "./App.js";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
