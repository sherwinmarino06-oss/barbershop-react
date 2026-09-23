import React, { useContext } from "react";
import { ReservationContext } from "../context/ReservationContext.jsx";

function AdminDashboard() {
  const { reservations, setReservations } = useContext(ReservationContext);

  const approveReservation = (index) => {
    const updated = [...reservations];
    updated[index].status = "Approved";
    setReservations(updated);
  };

  const declineReservation = (index) => {
    const updated = [...reservations];
    updated[index].status = "Declined";
    setReservations(updated);
  };

  const reservationsToday = reservations.length;
  const totalClients = new Set(reservations.map((res) => res.client)).size;
  const incomeToday = reservations
    .filter((res) => res.status === "Approved")
    .reduce((sum, res) => sum + (res.price || 0), 0);

  const getBadgeStyle = (status) => {
    const base = {
      display: "inline-block",
      fontSize: "12px",
      fontWeight: "700",
      letterSpacing: "0.02em",
      padding: "4px 10px",
      borderRadius: "3px",
    };
    if (status === "Approved") {
      return {
        ...base,
        background: "rgba(60, 179, 113, 0.15)",
        color: "#4ade80",
        border: "1px solid rgba(74, 222, 128, 0.3)",
      };
    }
    if (status === "Declined") {
      return {
        ...base,
        background: "rgba(224, 52, 47, 0.15)",
        color: "#ff6b66",
        border: "1px solid rgba(255, 107, 102, 0.3)",
      };
    }
    return {
      ...base,
      background: "rgba(224, 168, 0, 0.15)",
      color: "#f2b807",
      border: "1px solid rgba(242, 184, 7, 0.3)",
    };
  };

  const cardStyle = {
    background: "#141414",
    border: "1px solid #262626",
    borderRadius: "4px",
    padding: "28px 24px",
    textAlign: "center",
  };

  const cardLabelStyle = {
    color: "#a8a8a8",
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "0.02em",
    margin: "0 0 12px",
  };

  const cardValueStyle = {
    fontFamily: "'Anton', 'Arial Black', sans-serif",
    fontWeight: "400",
    fontSize: "36px",
    color: "#fff",
    margin: 0,
  };

  const thStyle = {
    textAlign: "left",
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "0.02em",
    color: "#f2f2f2",
    padding: "16px 20px",
    borderBottom: "1px solid #262626",
  };

  const tdStyle = {
    padding: "16px 20px",
    fontSize: "14px",
    color: "#d8d8d8",
    borderBottom: "1px solid #1e1e1e",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#f2f2f2",
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        padding: "48px 24px 80px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginBottom: "48px",
          }}
        >
          <div style={cardStyle}>
            <p style={cardLabelStyle}>Reservations Today</p>
            <p style={cardValueStyle}>{reservationsToday}</p>
          </div>
          <div style={cardStyle}>
            <p style={cardLabelStyle}>Total Clients</p>
            <p style={cardValueStyle}>{totalClients}</p>
          </div>
          <div style={cardStyle}>
            <p style={cardLabelStyle}>Income Today</p>
            <p style={cardValueStyle}>₱{incomeToday}</p>
          </div>
        </div>

        <p
          style={{
            color: "#e0342f",
            fontWeight: "700",
            fontSize: "13px",
            letterSpacing: "0.04em",
            margin: "0 0 8px",
          }}
        >
          Blade &amp; Chair
        </p>
        <h2
          style={{
            fontFamily: "'Anton', 'Arial Black', sans-serif",
            fontWeight: "400",
            fontSize: "34px",
            lineHeight: "1.05",
            letterSpacing: "0.01em",
            color: "#fff",
            margin: "0 0 24px",
          }}
        >
          Reservations
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#141414",
            border: "1px solid #262626",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <thead style={{ background: "#000" }}>
            <tr>
              <th style={thStyle}>Client</th>
              <th style={thStyle}>Service</th>
              <th style={thStyle}>Barber</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Time</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    padding: "40px 20px",
                    textAlign: "center",
                    color: "#6b6b6b",
                    fontSize: "14px",
                  }}
                >
                  No reservations yet.
                </td>
              </tr>
            ) : (
              reservations.map((res, index) => (
                <tr key={index}>
                  <td style={tdStyle}>{res.client}</td>
                  <td style={tdStyle}>{res.service}</td>
                  <td style={tdStyle}>{res.barber}</td>
                  <td style={tdStyle}>{res.date}</td>
                  <td style={tdStyle}>{res.time}</td>
                  <td style={tdStyle}>
                    <span style={getBadgeStyle(res.status)}>{res.status}</span>
                  </td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => approveReservation(index)}
                      style={{
                        background: "transparent",
                        border: "1px solid #4ade80",
                        borderRadius: "3px",
                        color: "#4ade80",
                        fontWeight: "700",
                        fontSize: "13px",
                        padding: "6px 14px",
                        cursor: "pointer",
                        marginRight: "8px",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = "#4ade80";
                        e.currentTarget.style.color = "#0a0a0a";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#4ade80";
                      }}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => declineReservation(index)}
                      style={{
                        background: "transparent",
                        border: "1px solid #e0342f",
                        borderRadius: "3px",
                        color: "#e0342f",
                        fontWeight: "700",
                        fontSize: "13px",
                        padding: "6px 14px",
                        cursor: "pointer",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = "#e0342f";
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#e0342f";
                      }}
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;