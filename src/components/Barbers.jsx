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

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Barbers</h2>

      {/* Add / Edit Barber */}
      <div className="card mb-4">
        <div className="card-body">
          <h5>{editingId ? "Edit Barber" : "Add Barber"}</h5>
          <form onSubmit={handleSubmit}>
            <div className="row g-3 align-items-end">
              <div className="col-md-4">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label>Specialty</label>
                <input
                  type="text"
                  name="specialty"
                  className="form-control"
                  placeholder="e.g. Haircut, Shave"
                  value={form.specialty}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label>Availability</label>
                <select
                  name="availability"
                  className="form-select"
                  value={form.availability}
                  onChange={handleChange}
                >
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>
            </div>
            <div className="mt-3">
              <button type="submit" className="btn btn-success me-2">
                {editingId ? "Save Changes" : "Add Barber"}
              </button>
              {editingId && (
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Barbers Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-success">
            <tr>
              <th>Name</th>
              <th>Specialty</th>
              <th>Availability</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {barbers.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  No barbers yet
                </td>
              </tr>
            ) : (
              barbers.map((barber) => (
                <tr key={barber.id}>
                  <td>{barber.name}</td>
                  <td>{barber.specialty}</td>
                  <td>
                    <span
                      className={`badge ${
                        barber.availability === "Available"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {barber.availability}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleEdit(barber)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
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
  );
}

export default Barbers;