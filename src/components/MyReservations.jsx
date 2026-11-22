import React, { useContext } from "react";
import { ReservationContext } from "../context/ReservationContext.jsx";
import { auth } from "../firebase.js";

function MyReservations() {
  const { reservations: allReservations, cancelReservation } =
    useContext(ReservationContext);

  // Ipakita lang ang reservations ng naka-login na user
  const myEmail = auth.currentUser?.email;
  const reservations = allReservations.filter(
    (res) => res.clientEmail && res.clientEmail === myEmail
  );

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

  const cellStyle = {
    fontSize: "14px",
    color: "#d8d8d8",
    borderBottom: "1px solid #1e1e1e",
    whiteSpace: "nowrap", // 👉 BAGO: hindi na magbabali ang petsa/oras
  };

  return (
    <div
      className="mr-page"
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#f2f2f2",
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* 👉 BAGO: mas maliit na padding sa phone */}
      <style>{`
        .mr-page { padding: 64px 24px 80px; }
        .mr-title { font-size: 40px; }
        .mr-cell { padding: 16px 20px; }

        @media (max-width: 520px) {
          .mr-page { padding: 40px 16px 60px; }
          .mr-title { font-size: 32px; }
          .mr-cell { padding: 12px 14px; }
        }
      `}</style>

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
          className="mr-title"
          style={{
            fontFamily: "'Anton', 'Arial Black', sans-serif",
            fontWeight: "400",
            lineHeight: "1.05",
            letterSpacing: "0.01em",
            color: "#fff",
            margin: "0 0 32px",
          }}
        >
          My Reservations
        </h2>

        {/* 👉 BAGO: scroll container, pwedeng i-swipe pakaliwa/pakanan sa phone */}
        <div
          style={{
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            width: "100%",
            background: "#141414",
            border: "1px solid #262626",
            borderRadius: "4px",
          }}
        >
          <table
            style={{
              width: "100%",
              minWidth: "620px",
              borderCollapse: "collapse",
            }}
          >
            <thead style={{ background: "#000" }}>
              <tr>
                {["Service", "Barber", "Date", "Time", "Status", "Action"].map((h) => (
                  <th
                    key={h}
                    className="mr-cell"
                    style={{
                      textAlign: "left",
                      fontSize: "13px",
                      fontWeight: "700",
                      letterSpacing: "0.02em",
                      color: "#f2f2f2",
                      borderBottom: "1px solid #262626",
                      whiteSpace: "nowrap",
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
                    className="mr-cell"
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
                reservations.map((res) => (
                  <tr key={res.id}>
                    <td className="mr-cell" style={cellStyle}>
                      {res.service}
                    </td>
                    <td className="mr-cell" style={cellStyle}>
                      {res.barber}
                    </td>
                    <td className="mr-cell" style={cellStyle}>
                      {res.date}
                    </td>
                    <td className="mr-cell" style={cellStyle}>
                      {res.time}
                    </td>
                    <td className="mr-cell" style={cellStyle}>
                      <span style={getBadgeStyle(res.status)}>{res.status}</span>
                    </td>
                    <td className="mr-cell" style={cellStyle}>
                      <button
                        onClick={() => cancelReservation(res.id)}
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
    </div>
  );
}

export default MyReservations;