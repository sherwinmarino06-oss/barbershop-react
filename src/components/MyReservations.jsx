import React, { useContext } from "react";
import { ReservationContext } from "../context/ReservationContext.jsx";

function MyReservations() {
  const { reservations, setReservations } = useContext(ReservationContext);

  const cancelReservation = (index) => {
    const updated = [...reservations];
    updated.splice(index, 1);
    setReservations(updated);
  };

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

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#f2f2f2",
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        padding: "64px 24px 80px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
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
            fontSize: "40px",
            lineHeight: "1.05",
            letterSpacing: "0.01em",
            color: "#fff",
            margin: "0 0 32px",
          }}
        >
          My Reservations
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
              {["Service", "Barber", "Date", "Time", "Status", "Action"].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "0.02em",
                    color: "#f2f2f2",
                    padding: "16px 20px",
                    borderBottom: "1px solid #262626",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
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
                  <td
                    style={{
                      padding: "16px 20px",
                      fontSize: "14px",
                      color: "#d8d8d8",
                      borderBottom: "1px solid #1e1e1e",
                    }}
                  >
                    {res.service}
                  </td>
                  <td
                    style={{
                      padding: "16px 20px",
                      fontSize: "14px",
                      color: "#d8d8d8",
                      borderBottom: "1px solid #1e1e1e",
                    }}
                  >
                    {res.barber}
                  </td>
                  <td
                    style={{
                      padding: "16px 20px",
                      fontSize: "14px",
                      color: "#d8d8d8",
                      borderBottom: "1px solid #1e1e1e",
                    }}
                  >
                    {res.date}
                  </td>
                  <td
                    style={{
                      padding: "16px 20px",
                      fontSize: "14px",
                      color: "#d8d8d8",
                      borderBottom: "1px solid #1e1e1e",
                    }}
                  >
                    {res.time}
                  </td>
                  <td
                    style={{
                      padding: "16px 20px",
                      fontSize: "14px",
                      borderBottom: "1px solid #1e1e1e",
                    }}
                  >
                    <span style={getBadgeStyle(res.status)}>{res.status}</span>
                  </td>
                  <td
                    style={{
                      padding: "16px 20px",
                      fontSize: "14px",
                      borderBottom: "1px solid #1e1e1e",
                    }}
                  >
                    <button
                      onClick={() => cancelReservation(index)}
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
                      Cancel
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

export default MyReservations;