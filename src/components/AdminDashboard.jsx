import React, { useContext, useState } from "react";
import { ReservationContext } from "../context/ReservationContext.jsx";
import { StyleContext } from "../context/StyleContext.jsx"; // 👉 BAGO

function AdminDashboard() {
  const { reservations, updateReservationStatus, cancelReservation } =
    useContext(ReservationContext);
  const { styleOptions } = useContext(StyleContext); // 👉 BAGO
  const [previewImg, setPreviewImg] = useState(null); // 👉 BAGO: para lumaki ang larawan

  const approveReservation = (id) => updateReservationStatus(id, "Approved");

  const declineReservation = (id) => updateReservationStatus(id, "Declined");

  const deleteReservation = (res) => {
    if (window.confirm(`Burahin ang reservation ni ${res.client}?`)) {
      cancelReservation(res.id);
    }
  };

  // 👉 BAGO: hanapin ang larawan ng napiling style
  const getStyleImage = (res) => {
    if (!res.styleChoice) return null;
    const list = styleOptions[res.service] || [];
    const found = list.find((s) => s.name === res.styleChoice);
    return found ? found.img : null;
  };

  // pinakabago ang nasa taas ng table
  const sortedReservations = [...reservations].reverse();

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
    whiteSpace: "nowrap",
  };

  const tdStyle = {
    padding: "16px 20px",
    fontSize: "14px",
    color: "#d8d8d8",
    borderBottom: "1px solid #1e1e1e",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
  };

  // 👉 BAGO: ang Notes ay pwedeng mag-wrap kapag mahaba
  const notesStyle = {
    ...tdStyle,
    whiteSpace: "normal",
    minWidth: "200px",
    maxWidth: "280px",
    lineHeight: 1.45,
    wordBreak: "break-word",
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
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
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
              minWidth: "1150px",
              borderCollapse: "collapse",
            }}
          >
            <thead style={{ background: "#000" }}>
              <tr>
                <th style={thStyle}>Client</th>
                <th style={thStyle}>Service</th>
                <th style={thStyle}>Style</th>
                <th style={thStyle}>Barber</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Time</th>
                <th style={thStyle}>Notes</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedReservations.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
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
                sortedReservations.map((res) => {
                  const styleImg = getStyleImage(res);
                  return (
                    <tr key={res.id}>
                      <td style={tdStyle}>{res.client}</td>
                      <td style={tdStyle}>{res.service}</td>

                      {/* 👉 BAGO: Style (larawan + pangalan) */}
                      <td style={tdStyle}>
                        {res.styleChoice ? (
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            {styleImg && (
                              <img
                                src={styleImg}
                                alt={res.styleChoice}
                                title="I-click para palakihin"
                                onClick={() =>
                                  setPreviewImg({ src: styleImg, name: res.styleChoice })
                                }
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                                style={{
                                  width: "56px",
                                  height: "56px",
                                  objectFit: "cover",
                                  borderRadius: "3px",
                                  border: "1px solid #333",
                                  cursor: "zoom-in",
                                }}
                              />
                            )}
                            <span style={{ fontWeight: 600, color: "#f2f2f2" }}>
                              {res.styleChoice}
                            </span>
                          </div>
                        ) : (
                          <span style={{ color: "#6b6b6b" }}>—</span>
                        )}
                      </td>

                      <td style={tdStyle}>{res.barber}</td>
                      <td style={tdStyle}>{res.date}</td>
                      <td style={tdStyle}>{res.time}</td>

                      {/* 👉 BAGO: Notes ng client */}
                      <td style={notesStyle}>
                        {res.notes ? res.notes : <span style={{ color: "#6b6b6b" }}>—</span>}
                      </td>

                      <td style={tdStyle}>
                        <span style={getBadgeStyle(res.status)}>{res.status}</span>
                      </td>
                      <td style={tdStyle}>
                        <button
                          onClick={() => approveReservation(res.id)}
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
                          onClick={() => declineReservation(res.id)}
                          style={{
                            background: "transparent",
                            border: "1px solid #e0342f",
                            borderRadius: "3px",
                            color: "#e0342f",
                            fontWeight: "700",
                            fontSize: "13px",
                            padding: "6px 14px",
                            cursor: "pointer",
                            marginRight: "8px",
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
                        <button
                          onClick={() => deleteReservation(res)}
                          style={{
                            background: "transparent",
                            border: "1px solid #8a8a8a",
                            borderRadius: "3px",
                            color: "#b8b8b8",
                            fontWeight: "700",
                            fontSize: "13px",
                            padding: "6px 14px",
                            cursor: "pointer",
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.background = "#b8b8b8";
                            e.currentTarget.style.color = "#0a0a0a";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "#b8b8b8";
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 👉 BAGO: i-click ang larawan para lumaki; i-click ulit para isara */}
      {previewImg && (
        <div
          onClick={() => setPreviewImg(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.88)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
            padding: "24px",
            cursor: "zoom-out",
          }}
        >
          <img
            src={previewImg.src}
            alt={previewImg.name}
            style={{
              maxWidth: "100%",
              maxHeight: "80vh",
              borderRadius: "4px",
              border: "1px solid #333",
            }}
          />
          <p style={{ color: "#f2f2f2", fontWeight: 700, marginTop: "14px" }}>
            {previewImg.name}
          </p>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;