import React from "react";
import { Link } from "react-router-dom";


function Header({ user, Logout }) {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light p-3">
      <div className="container">
        <Link to="/home" className="navbar-brand d-flex align-items-center">
          <span className="ms-2">My Task</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item ">
              <Link to="/home" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item ms-3 me-3">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            {user && (
              <li className="nav-item">
                <button onClick={Logout} className="btn btn-outline-danger">
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
