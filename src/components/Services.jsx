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

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Services</h2>

      <div className="card mb-4">
        <div className="card-body">
          <h5>Add Service</h5>
          <div className="mb-3">
            <label>Service Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={newService.name}
              onChange={handleNewChange}
            />
          </div>
          <div className="mb-3">
            <label>Price (Regular)</label>
            <input
              type="number"
              name="regular"
              className="form-control"
              value={newService.regular}
              onChange={handleNewChange}
            />
          </div>
          <div className="mb-3">
            <label>Price (Kids)</label>
            <input
              type="number"
              name="kids"
              className="form-control"
              value={newService.kids}
              onChange={handleNewChange}
            />
          </div>
          <div className="mb-3">
            <label>Price (Adults)</label>
            <input
              type="number"
              name="adults"
              className="form-control"
              value={newService.adults}
              onChange={handleNewChange}
            />
          </div>
          <div className="mb-3">
            <label>Duration</label>
            <input
              type="text"
              name="duration"
              className="form-control"
              value={newService.duration}
              onChange={handleNewChange}
            />
          </div>
          <button className="btn btn-success" onClick={handleAdd}>
            Add Service
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-success">
            <tr>
              <th>Service</th>
              <th>Price (Regular)</th>
              <th>Price (Kids)</th>
              <th>Price (Adults)</th>
              <th>Duration</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={index}>
                <td>{service.name}</td>
                <td>₱{service.regular}</td>
                <td>₱{service.kids}</td>
                <td>₱{service.adults}</td>
                <td>{service.duration}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingIndex !== null && (
        <div className="card mt-4">
          <div className="card-body">
            <h5>Edit Service</h5>
            <div className="mb-3">
              <label>Service Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Price (Regular)</label>
              <input
                type="number"
                name="regular"
                className="form-control"
                value={formData.regular}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Price (Kids)</label>
              <input
                type="number"
                name="kids"
                className="form-control"
                value={formData.kids}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Price (Adults)</label>
              <input
                type="number"
                name="adults"
                className="form-control"
                value={formData.adults}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Duration</label>
              <input
                type="text"
                name="duration"
                className="form-control"
                value={formData.duration}
                onChange={handleChange}
              />
            </div>
            <button className="btn btn-success me-2" onClick={handleSave}>
              Save
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setEditingIndex(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="card mt-4 mb-5">
        <div className="card-body">
          <h5>Style Pictures</h5>
          <p className="text-muted small">
            These are the pictures that the client will select on the book an appointment page.
          </p>

          <div className="row g-3 align-items-end mb-4">
            <div className="col-md-3">
              <label>Service</label>
              <select
                className="form-select"
                value={styleService}
                onChange={(e) => setStyleService(e.target.value)}
              >
                <option value="Haircut">Haircut</option>
                <option value="Shave">Shave</option>
              </select>
            </div>
            <div className="col-md-4">
              <label>Style Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Low Fade"
                value={styleName}
                onChange={(e) => setStyleName(e.target.value)}
              />
            </div>
            <div className="col-md-5">
              <label>Picture</label>
              <input
                key={fileKey}
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleStyleFile}
              />
            </div>
          </div>

          {stylePreview && (
            <div className="mb-3">
              <div className="small text-muted mb-1">Preview:</div>
              <img
                src={stylePreview}
                alt="Preview"
                style={{ height: 120, borderRadius: 4, objectFit: "cover" }}
              />
            </div>
          )}

          <button className="btn btn-success mb-4" onClick={handleAddStyle}>
            Add Picture
          </button>

          {Object.keys(styleOptions).map((service) => (
            <div key={service} className="mb-4">
              <h6 className="border-bottom pb-2">{service} Styles</h6>
              {(styleOptions[service] || []).length === 0 ? (
                <p className="text-muted small">Walang picture pa.</p>
              ) : (
                <div className="row g-3">
                  {styleOptions[service].map((style) => (
                    <div className="col-6 col-md-3" key={style.id}>
                      <div className="card h-100">
                        <div
                          style={{
                            position: "relative",
                            height: 140,
                            background: "#e9ecef",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#6c757d",
                            fontSize: 13,
                            textAlign: "center",
                            padding: "0 8px",
                          }}
                        >
                          {style.name}
                          <img
                            src={style.img}
                            alt={style.name}
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                            style={{
                              position: "absolute",
                              inset: 0,
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <div className="card-body p-2 d-flex justify-content-between align-items-center">
                          <span className="small fw-semibold">{style.name}</span>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteStyle(service, style)}
                          >
                            Delete
                          </button>
                        </div>
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