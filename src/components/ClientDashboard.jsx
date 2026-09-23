import React from "react";
import { useNavigate } from "react-router-dom";

function ClientDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dash-page">
      <style>{`
        .dash-page {
          min-height: 100vh;
          background: #0a0a0a;
          color: #f2f2f2;
          font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
          padding: 64px 24px 80px;
        }

        .dash-card {
          max-width: 640px;
          margin: 0 auto;
        }

        .dash-eyebrow {
          color: #e0342f;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.04em;
          margin: 0 0 8px;
        }

        .dash-title {
          font-family: "Anton", "Arial Black", sans-serif;
          font-weight: 400;
          font-size: 40px;
          line-height: 1.05;
          letter-spacing: 0.01em;
          color: #fff;
          margin: 0 0 16px;
        }

        .dash-subtitle {
          font-size: 16px;
          color: #a8a8a8;
          margin: 0 0 32px;
        }

        .dash-btn {
          background: #e0342f;
          border: none;
          border-radius: 3px;
          color: #fff;
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.02em;
          padding: 14px 28px;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.1s ease;
        }

        .dash-btn:hover {
          background: #c72a26;
        }

        .dash-btn:active {
          transform: scale(0.99);
        }

        @media (max-width: 520px) {
          .dash-title {
            font-size: 32px;
          }
        }
      `}</style>

      <div className="dash-card">
        <p className="dash-eyebrow">Blade &amp; Chair</p>
        <h2 className="dash-title">Client Dashboard</h2>
        <p className="dash-subtitle">Welcome! You can book your reservation here.</p>
        <button className="dash-btn" onClick={() => navigate("/reserve")}>
          Book Reservation
        </button>
      </div>
    </div>
  );
}

export default ClientDashboard;