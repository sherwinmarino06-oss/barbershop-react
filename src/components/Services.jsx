import React, { useState, useContext } from "react";
import { StyleContext } from "../context/StyleContext.jsx";

function resizeImage(file, maxWidth = 600) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const image = new Image();
      image.onerror = reject;
      image.onload = () => {
        const scale = Math.min(1, maxWidth / image.width);
        const canvas = document.createElement("canvas");
        canvas.width = image.width * scale;
        canvas.height = image.height * scale;
        canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.75));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

// mga field ng Add/Edit Service
const serviceFields = [
  { name: "name", label: "Service Name", type: "text" },
  { name: "regular", label: "Price (Regular)", type: "number" },
  { name: "kids", label: "Price (Kids)", type: "number" },
  { name: "adults", label: "Price (Adults)", type: "number" },
  { name: "duration", label: "Duration", type: "text" },
];

function Services() {
  const [services, setServices] = useState([
    { name: "Haircut", regular: 100, kids: 70, adults: 80, duration: "30 mins" },
    { name: "Shave", regular: 100, kids: 70, adults: 80, duration: "20 mins" },
  ]);

  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    regular: "",
    kids: "",
    adults: "",
    duration: "",
  });

  const [newService, setNewService] = useState({
    name: "",
    regular: 100,
    kids: 70,
    adults: 80,
    duration: "",
  });

  // Style pictures
  const { styleOptions, addStyle, deleteStyle } = useContext(StyleContext);
  const [styleService, setStyleService] = useState("Haircut");
  const [styleName, setStyleName] = useState("");
  const [stylePreview, setStylePreview] = useState("");
  const [fileKey, setFileKey] = useState(0);

  const handleStyleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const dataUrl = await resizeImage(file);
      setStylePreview(dataUrl);
    } catch (err) {
      console.error(err);
      alert("Error saving style option. Local storage might be full.");
    }
  };

  const handleAddStyle = () => {
    if (!styleName.trim() || !stylePreview) {
      alert("Please enter a style name and choose a picture!");
      return;
    }
    addStyle(styleService, styleName.trim(), stylePreview);
    setStyleName("");
    setStylePreview("");
    setFileKey((k) => k + 1);
  };

  const handleDeleteStyle = (service, style) => {
    if (window.confirm(`Burahin ang "${style.name}"?`)) {
      deleteStyle(service, style.id);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(services[index]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updated = [...services];
    updated[editingIndex] = formData;
    setServices(updated);
    setEditingIndex(null);
  };

  const handleNewChange = (e) => {
    setNewService({ ...newService, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (newService.name && newService.duration) {
      setServices([...services, newService]);

      setNewService({ name: "", regular: 100, kids: 70, adults: 80, duration: "" });
    } else {
      alert("Please fill out Service Name and Duration!");
    }
  };

  const handleDelete = (index) => {
    const updated = services.filter((_, i) => i !== index);
    setServices(updated);
  };

  const cellStyle = {
    fontSize: "14px",
    color: "#d8d8d8",
    borderBottom: "1px solid #1e1e1e",
    whiteSpace: "nowrap",
  };

  return (
    <div
      className="sv-page"
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#f2f2f2",
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      <style>{`
        .sv-page { padding: 64px 24px 80px; }
        .sv-title { font-size: 40px; }
        .sv-cell { padding: 16px 20px; }

        .sv-card {
          background: #141414;
          border: 1px solid #262626;
          border-radius: 4px;
          padding: 28px;
          margin-bottom: 32px;
        }

        .sv-card-title {
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 20px;
        }

        .sv-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .sv-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #a8a8a8;
          margin-bottom: 8px;
        }

        .sv-control {
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

        .sv-control::placeholder { color: #6b6b6b; }

        .sv-control:focus {
          outline: none;
          border-color: #e0342f;
          background: #111;
        }

        select.sv-control {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23a8a8a8' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 36px;
          cursor: pointer;
        }

        input[type="file"].sv-control { padding: 9px 12px; cursor: pointer; }
        input[type="file"].sv-control::file-selector-button {
          background: #262626;
          color: #f2f2f2;
          border: 1px solid #444;
          border-radius: 3px;
          padding: 5px 12px;
          margin-right: 12px;
          cursor: pointer;
        }

        .sv-btn {
          border-radius: 3px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .sv-btn-primary {
          background: #e0342f;
          border: 1px solid #e0342f;
          color: #fff;
          padding: 12px 22px;
          font-size: 14px;
        }
        .sv-btn-primary:hover { background: #c72a26; border-color: #c72a26; }

        .sv-btn-ghost {
          background: transparent;
          border: 1px solid #444;
          color: #d8d8d8;
          padding: 12px 22px;
          font-size: 14px;
        }
        .sv-btn-ghost:hover { background: #222; }

        .sv-btn-edit {
          background: transparent;
          border: 1px solid #555;
          color: #d8d8d8;
          padding: 6px 14px;
          margin-right: 8px;
        }
        .sv-btn-edit:hover { background: #d8d8d8; color: #0a0a0a; }

        .sv-btn-delete {
          background: transparent;
          border: 1px solid #e0342f;
          color: #e0342f;
          padding: 6px 14px;
        }
        .sv-btn-delete:hover { background: #e0342f; color: #fff; }

        .sv-style-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 14px;
        }

        .sv-style-card {
          background: #0a0a0a;
          border: 1px solid #333;
          border-radius: 3px;
          overflow: hidden;
        }

        .sv-style-thumb {
          position: relative;
          height: 130px;
          background: #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4a4a4a;
          font-size: 12px;
          text-align: center;
          padding: 0 8px;
        }

        .sv-style-thumb img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .sv-style-footer {
          padding: 10px 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
        }

        @media (max-width: 520px) {
          .sv-page { padding: 40px 16px 60px; }
          .sv-title { font-size: 32px; }
          .sv-cell { padding: 12px 14px; }
          .sv-card { padding: 20px; }
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
          className="sv-title"
          style={{
            fontFamily: "'Anton', 'Arial Black', sans-serif",
            fontWeight: "400",
            lineHeight: "1.05",
            letterSpacing: "0.01em",
            color: "#fff",
            margin: "0 0 32px",
          }}
        >
          Services
        </h2>

        {/* Add Service */}
        <div className="sv-card">
          <h5 className="sv-card-title">Add Service</h5>
          <div className="sv-grid">
            {serviceFields.map((f) => (
              <div key={f.name}>
                <label className="sv-label">{f.label}</label>
                <input
                  type={f.type}
                  name={f.name}
                  className="sv-control"
                  value={newService[f.name]}
                  onChange={handleNewChange}
                />
              </div>
            ))}
          </div>
          <button
            className="sv-btn sv-btn-primary"
            style={{ marginTop: "20px" }}
            onClick={handleAdd}
          >
            Add Service
          </button>
        </div>

        {/* Services table */}
        <div
          style={{
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            width: "100%",
            background: "#141414",
            border: "1px solid #262626",
            borderRadius: "4px",
            marginBottom: "32px",
          }}
        >
          <table style={{ width: "100%", minWidth: "640px", borderCollapse: "collapse" }}>
            <thead style={{ background: "#000" }}>
              <tr>
                {[
                  "Service",
                  "Price (Regular)",
                  "Price (Kids)",
                  "Price (Adults)",
                  "Duration",
                  "Action",
                ].map((h) => (
                  <th
                    key={h}
                    className="sv-cell"
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
              {services.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="sv-cell"
                    style={{
                      textAlign: "center",
                      color: "#6b6b6b",
                      fontSize: "14px",
                      padding: "40px 20px",
                    }}
                  >
                    No services yet.
                  </td>
                </tr>
              ) : (
                services.map((service, index) => (
                  <tr key={index}>
                    <td className="sv-cell" style={cellStyle}>{service.name}</td>
                    <td className="sv-cell" style={cellStyle}>₱{service.regular}</td>
                    <td className="sv-cell" style={cellStyle}>₱{service.kids}</td>
                    <td className="sv-cell" style={cellStyle}>₱{service.adults}</td>
                    <td className="sv-cell" style={cellStyle}>{service.duration}</td>
                    <td className="sv-cell" style={cellStyle}>
                      <button
                        className="sv-btn sv-btn-edit"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="sv-btn sv-btn-delete"
                        onClick={() => handleDelete(index)}
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

        {/* Edit Service */}
        {editingIndex !== null && (
          <div className="sv-card">
            <h5 className="sv-card-title">Edit Service</h5>
            <div className="sv-grid">
              {serviceFields.map((f) => (
                <div key={f.name}>
                  <label className="sv-label">{f.label}</label>
                  <input
                    type={f.type}
                    name={f.name}
                    className="sv-control"
                    value={formData[f.name]}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
            <div style={{ marginTop: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button className="sv-btn sv-btn-primary" onClick={handleSave}>
                Save
              </button>
              <button
                className="sv-btn sv-btn-ghost"
                onClick={() => setEditingIndex(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Style Pictures */}
        <div className="sv-card">
          <h5 className="sv-card-title">Style Pictures</h5>
          <p style={{ color: "#8a8a8a", fontSize: "13px", margin: "-8px 0 20px" }}>
            These are the pictures that the client will select on the book an appointment page.
          </p>

          <div className="sv-grid" style={{ marginBottom: "20px" }}>
            <div>
              <label className="sv-label">Service</label>
              <select
                className="sv-control"
                value={styleService}
                onChange={(e) => setStyleService(e.target.value)}
              >
                <option value="Haircut">Haircut</option>
                <option value="Shave">Shave</option>
              </select>
            </div>
            <div>
              <label className="sv-label">Style Name</label>
              <input
                type="text"
                className="sv-control"
                placeholder="e.g. Low Fade"
                value={styleName}
                onChange={(e) => setStyleName(e.target.value)}
              />
            </div>
            <div>
              <label className="sv-label">Picture</label>
              <input
                key={fileKey}
                type="file"
                accept="image/*"
                className="sv-control"
                onChange={handleStyleFile}
              />
            </div>
          </div>

          {stylePreview && (
            <div style={{ marginBottom: "16px" }}>
              <div style={{ color: "#8a8a8a", fontSize: "12px", marginBottom: "6px" }}>
                Preview:
              </div>
              <img
                src={stylePreview}
                alt="Preview"
                style={{
                  height: 120,
                  borderRadius: 3,
                  objectFit: "cover",
                  border: "1px solid #333",
                }}
              />
            </div>
          )}

          <button
            className="sv-btn sv-btn-primary"
            style={{ marginBottom: "28px" }}
            onClick={handleAddStyle}
          >
            Add Picture
          </button>

          {Object.keys(styleOptions).map((service) => (
            <div key={service} style={{ marginBottom: "28px" }}>
              <h6
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#fff",
                  paddingBottom: "10px",
                  borderBottom: "1px solid #262626",
                  margin: "0 0 16px",
                }}
              >
                {service} Styles
              </h6>
              {(styleOptions[service] || []).length === 0 ? (
                <p style={{ color: "#6b6b6b", fontSize: "13px", margin: 0 }}>
                  Walang picture pa.
                </p>
              ) : (
                <div className="sv-style-grid">
                  {styleOptions[service].map((style) => (
                    <div className="sv-style-card" key={style.id}>
                      <div className="sv-style-thumb">
                        {style.name}
                        <img
                          src={style.img}
                          alt={style.name}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                      <div className="sv-style-footer">
                        <span style={{ fontSize: "13px", fontWeight: "600", color: "#f2f2f2" }}>
                          {style.name}
                        </span>
                        <button
                          className="sv-btn sv-btn-delete"
                          style={{ padding: "4px 10px" }}
                          onClick={() => handleDeleteStyle(service, style)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;