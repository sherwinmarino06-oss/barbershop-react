import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar({ user, onLogout }) {
  const location = useLocation();

  const isAdminPage = ["/admin", "/barbers", "/services", "/reports"].includes(location.pathname);
  const isClientPage = ["/client", "/reserve", "/my-reservations", "/profile"].includes(location.pathname);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        backgroundColor: "#1c1b19",
        borderBottom: "3px solid #a52422",
      }}
    >
      <div className="container-fluid">
        <span className="navbar-brand fw-bold" style={{ color: "#f3ede2" }}>
          {isAdminPage ? "Barbershop Admin" : isClientPage ? "Barbershop Client" : "Barbershop"}
        </span>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {isAdminPage && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/admin">Dashboard</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/barbers">Barbers</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/services">Services</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/reports">Reports</Link></li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    style={{ color: "#e8a598" }}
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {isClientPage && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/client">Dashboard</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/my-reservations">My Reservations</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    style={{ color: "#e8a598" }}
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;