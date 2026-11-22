import React, { useState, useContext } from "react";
import { BarberContext } from "../context/BarberContext.jsx";

const emptyForm = { name: "", specialty: "", availability: "Available" };

function Barbers() {
  const { barbers, addBarber, updateBarber, deleteBarber } = useContext(BarberContext);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (barber) => {
    setEditingId(barber.id);
    setForm({
      name: barber.name,
      specialty: barber.specialty,
      availability: barber.availability,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.specialty.trim()) {
      alert("Please fill out Name and Specialty!");
      return;
    }
    const data = {
      name: form.name.trim(),
      specialty: form.specialty.trim(),
      availability: form.availability,
    };
    if (editingId) {
      updateBarber(editingId, data);
    } else {
      addBarber(data);
    }
    handleCancel();
  };

  const handleDelete = (barber) => {
    if (window.confirm(`Burahin si ${barber.name}?`)) {
      deleteBarber(barber.id);
      if (editingId === barber.id) handleCancel();
    }
  };

  const getBadgeStyle = (availability) => {
    const base = {
      display: "inline-block",
      fontSize: "12px",
      fontWeight: "700",
      letterSpacing: "0.02em",
      padding: "4px 10px",
      borderRadius: "3px",
    };
    if (availability === "Available") {
      return {
        ...base,
        background: "rgba(60, 179, 113, 0.15)",
        color: "#4ade80",
        border: "1px solid rgba(74, 222, 128, 0.3)",
      };
    }
    return {
      ...base,
      background: "rgba(224, 52, 47, 0.15)",
      color: "#ff6b66",
      border: "1px solid rgba(255, 107, 102, 0.3)",
    };
  };

  const cellStyle = {
    fontSize: "14px",
    color: "#d8d8d8",
    borderBottom: "1px solid #1e1e1e",
    whiteSpace: "nowrap",
  };

  return (
    <div
      className="br-page"
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#f2f2f2",
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      <style>{`
        .br-page { padding: 64px 24px 80px; }
        .br-title { font-size: 40px; }
        .br-cell { padding: 16px 20px; }

        .br-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 16px;
        }

        .br-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #a8a8a8;
          margin-bottom: 8px;
        }

        .br-control {
          width: 100%;
          background: #0a0a0a;
          border: 1px solid #333;
          border-radius: 3px;
          color: #f2f2f2;
          font-size: 15px;
          padding: 12px 14px;
          box-sizing: border-box;
          transition: border-color 0.15s ease, background 0.15s ease;
        }

        .br-control::placeholder { color: #6b6b6b; }

        .br-control:focus {
          outline: none;
          border-color: #e0342f;
          background: #111;
        }

        select.br-control {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23a8a8a8' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 36px;
          cursor: pointer;
        }

        .br-btn {
          border-radius: 3px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .br-btn-primary {
          background: #e0342f;
          border: 1px solid #e0342f;
          color: #fff;
          padding: 12px 22px;
          font-size: 14px;
        }
        .br-btn-primary:hover { background: #c72a26; border-color: #c72a26; }

        .br-btn-ghost {
          background: transparent;
          border: 1px solid #444;
          color: #d8d8d8;
          padding: 12px 22px;
          font-size: 14px;
        }
        .br-btn-ghost:hover { background: #222; }

        .br-btn-edit {
          background: transparent;
          border: 1px solid #555;
          color: #d8d8d8;
          padding: 6px 14px;
          margin-right: 8px;
        }
        .br-btn-edit:hover { background: #d8d8d8; color: #0a0a0a; }

        .br-btn-delete {
          background: transparent;
          border: 1px solid #e0342f;
          color: #e0342f;
          padding: 6px 14px;
        }
        .br-btn-delete:hover { background: #e0342f; color: #fff; }

        @media (max-width: 720px) {
          .br-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 520px) {
          .br-page { padding: 40px 16px 60px; }
          .br-title { font-size: 32px; }
          .br-cell { padding: 12px 14px; }
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
          className="br-title"
          style={{
            fontFamily: "'Anton', 'Arial Black', sans-serif",
            fontWeight: "400",
            lineHeight: "1.05",
            letterSpacing: "0.01em",
            color: "#fff",
            margin: "0 0 32px",
          }}
        >
          Barbers
        </h2>

        {/* Add / Edit Barber */}
        <div
          style={{
            background: "#141414",
            border: "1px solid #262626",
            borderRadius: "4px",
            padding: "28px",
            marginBottom: "32px",
          }}
        >
          <h5
            style={{
              fontSize: "15px",
              fontWeight: "700",
              color: "#fff",
              margin: "0 0 20px",
            }}
          >
            {editingId ? "Edit Barber" : "Add Barber"}
          </h5>

          <form onSubmit={handleSubmit}>
            <div className="br-grid">
              <div>
                <label className="br-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="br-control"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="br-label">Specialty</label>
                <input
                  type="text"
                  name="specialty"
                  className="br-control"
                  placeholder="e.g. Haircut, Shave"
                  value={form.specialty}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="br-label">Availability</label>
                <select
                  name="availability"
                  className="br-control"
                  value={form.availability}
                  onChange={handleChange}
                >
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button type="submit" className="br-btn br-btn-primary">
                {editingId ? "Save Changes" : "Add Barber"}
              </button>
              {editingId && (
                <button type="button" className="br-btn br-btn-ghost" onClick={handleCancel}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Barbers Table */}
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
              minWidth: "560px",
              borderCollapse: "collapse",
            }}
          >
            <thead style={{ background: "#000" }}>
              <tr>
                {["Name", "Specialty", "Availability", "Action"].map((h) => (
                  <th
                    key={h}
                    className="br-cell"
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
              {barbers.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="br-cell"
                    style={{
                      textAlign: "center",
                      color: "#6b6b6b",
                      fontSize: "14px",
                      padding: "40px 20px",
                    }}
                  >
                    No barbers yet.
                  </td>
                </tr>
              ) : (
                barbers.map((barber) => (
                  <tr key={barber.id}>
                    <td className="br-cell" style={cellStyle}>{barber.name}</td>
                    <td className="br-cell" style={cellStyle}>{barber.specialty}</td>
                    <td className="br-cell" style={cellStyle}>
                      <span style={getBadgeStyle(barber.availability)}>
                        {barber.availability}
                      </span>
                    </td>
                    <td className="br-cell" style={cellStyle}>
                      <button
                        className="br-btn br-btn-edit"
                        onClick={() => handleEdit(barber)}
                      >
                        Edit
                      </button>
                      <button
                        className="br-btn br-btn-delete"
                        onClick={() => handleDelete(barber)}
                      >
                        Delete
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

export default Barbers;