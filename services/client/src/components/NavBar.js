import React from "react";
import { Link } from "react-router-dom";

export default props => (
  <nav className="navbar is-dark" aria-label="main navigation">
    <section className="container">
      <div className="navbar-brand">
        <strong className="navbar-item">{props.title}</strong>
      </div>
      <div className="navbar-menu">
        <Link to="/" className="navbar-item">
          Home
        </Link>
        <Link to="/about" className="navbar-item">
          About
        </Link>
        <Link to="/status" className="navbar-item">
          User Status
        </Link>
      </div>
      <div className="navbar-end">
        <Link to="/register" className="navbar-item">
          Register
        </Link>
        <Link to="/login" className="navbar-item">
          Log In
        </Link>
        <Link to="/register" className="navbar-item">
          Log out
        </Link>
      </div>
    </section>
  </nav>
);
