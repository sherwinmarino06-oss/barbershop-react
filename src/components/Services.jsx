import React, { useState } from "react";

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
      setNewService({ name: "", regular: 100, kids: 70, senior: 80, duration: "" });
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
              name="senior"
              className="form-control"
              value={newService.senior}
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
                name="senior"
                className="form-control"
                value={formData.senior}
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
    </div>
  );
}

export default Services;
