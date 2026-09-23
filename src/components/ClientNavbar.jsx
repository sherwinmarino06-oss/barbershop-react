import React from "react";
import { Link } from "react-router-dom";

function ClientNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold">Barbershop Client</span>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/client">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/my-reservations">My Reservations</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Profile</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default ClientNavbar;
