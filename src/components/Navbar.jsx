import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar({ user, onLogout }) {
  const location = useLocation();
  const [open, setOpen] = useState(false); // 👉 BAGO: buksan/sarado ang menu sa maliit na screen

  // isara ang menu pagkatapos pumili ng page
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

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

        {/* 👉 BAGO: hamburger button, lalabas lang sa maliit na screen */}
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            {isAdminPage && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/admin">Dashboard</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/barbers">Barbers</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/services">Services</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/reports">Reports</Link></li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link text-start"
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
                    className="btn btn-link nav-link text-start"
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