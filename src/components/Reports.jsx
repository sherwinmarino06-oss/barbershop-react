import React, { useContext } from "react";
import { ReservationContext } from "../context/ReservationContext.jsx";

function Reports() {
  const { reservations } = useContext(ReservationContext);

  const today = new Date().toISOString().split("T")[0];
  const dailyReservations = reservations.filter((res) => res.date === today);
  const daily = {
    reservations: dailyReservations.length,
    clients: new Set(dailyReservations.map((res) => res.client)).size,
    income: dailyReservations
      .filter((res) => res.status === "Approved")
      .reduce((sum, res) => sum + (res.price || 0), 0),
  };

  const currentMonth = new Date().getMonth();
  const monthlyReservations = reservations.filter(
    (res) => new Date(res.date).getMonth() === currentMonth
  );
  const monthly = {
    reservations: monthlyReservations.length,
    clients: new Set(monthlyReservations.map((res) => res.client)).size,
    income: monthlyReservations
      .filter((res) => res.status === "Approved")
      .reduce((sum, res) => sum + (res.price || 0), 0),
  };

  const currentYear = new Date().getFullYear();
  const yearlyReservations = reservations.filter(
    (res) => new Date(res.date).getFullYear() === currentYear
  );
  const yearly = {
    reservations: yearlyReservations.length,
    clients: new Set(yearlyReservations.map((res) => res.client)).size,
    income: yearlyReservations
      .filter((res) => res.status === "Approved")
      .reduce((sum, res) => sum + (res.price || 0), 0),
  };

  // Theme (same as Services page)
  const pageStyle = {
    backgroundColor: "#0d0d0d",
    minHeight: "100vh",
    color: "#ffffff",
    paddingTop: "70px",
    paddingBottom: "70px",
  };

  const labelStyle = {
    color: "#e03131",
    fontWeight: 700,
    fontSize: "1rem",
    letterSpacing: "0.5px",
    marginBottom: "6px",
  };

  const titleStyle = {
    color: "#ffffff",
    fontWeight: 900,
    fontSize: "3.2rem",
    marginBottom: "40px",
  };

  const cardStyle = {
    backgroundColor: "#141414",
    border: "1px solid #262626",
    borderRadius: "6px",
    color: "#ffffff",
    boxShadow: "none",
  };

  const cardTitleStyle = {
    color: "#ffffff",
    fontWeight: 700,
    marginBottom: "20px",
  };

  const textStyle = {
    color: "#d0d0d0",
    marginBottom: "14px",
  };

  const accentStyle = {
    color: "#e03131",
    fontWeight: 700,
  };

  return (
    <div style={pageStyle}>
      <div className="container">
        <div style={labelStyle}>Blade &amp; Chair</div>
        <h2 style={titleStyle}>Reports</h2>

        <div className="row">
          {/* Daily Summary */}
          <div className="col-md-4 mb-4">
            <div className="card h-100" style={cardStyle}>
              <div className="card-body text-center py-4">
                <h4 className="card-title" style={cardTitleStyle}>
                  Daily Summary
                </h4>
                <p style={textStyle}>Total Reservations: {daily.reservations}</p>
                <p style={textStyle}>Total Clients: {daily.clients}</p>
                <p style={textStyle}>
                  Income Today:{" "}
                  <span style={accentStyle}>
                    ₱{daily.income.toLocaleString()}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Monthly Summary */}
          <div className="col-md-4 mb-4">
            <div className="card h-100" style={cardStyle}>
              <div className="card-body text-center py-4">
                <h4 className="card-title" style={cardTitleStyle}>
                  Monthly Summary
                </h4>
                <p style={textStyle}>
                  Total Reservations: {monthly.reservations}
                </p>
                <p style={textStyle}>Total Clients: {monthly.clients}</p>
                <p style={textStyle}>
                  Total Income:{" "}
                  <span style={accentStyle}>
                    ₱{monthly.income.toLocaleString()}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Yearly Summary */}
          <div className="col-md-4 mb-4">
            <div className="card h-100" style={cardStyle}>
              <div className="card-body text-center py-4">
                <h4 className="card-title" style={cardTitleStyle}>
                  Yearly Summary
                </h4>
                <p style={textStyle}>Total Reservations: {yearly.reservations}</p>
                <p style={textStyle}>Total Clients: {yearly.clients}</p>
                <p style={textStyle}>
                  Total Income:{" "}
                  <span style={accentStyle}>
                    ₱{yearly.income.toLocaleString()}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;