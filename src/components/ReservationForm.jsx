import React, { useState, useContext } from "react";
import { ReservationContext } from "../context/ReservationContext.jsx";

function ReservationForm() {
  const { addReservation } = useContext(ReservationContext);
  const [form, setForm] = useState({
    client: "Sherwin M. Macaspac",
    service: "",
    barber: "",
    category: "Regular",
    date: "",
    time: "",
    notes: "",
    status: "Pending",
    price: 0,
  });

  const services = {
    Haircut: { Regular: 100, Kids: 70, Senior: 80 },
    Shave: { Regular: 40, Kids: 20, Senior: 30 },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedForm = { ...form, [name]: value };

    if (name === "service" || name === "category") {
      if (updatedForm.service && updatedForm.category) {
        updatedForm.price = services[updatedForm.service][updatedForm.category];
      }
    }

    setForm(updatedForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addReservation(form);
    alert("Reservation submitted!");
  };

  return (
    <div className="reserve-page">
      <style>{`
        .reserve-page {
          min-height: 100vh;
          background: #0a0a0a;
          color: #f2f2f2;
          font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
          padding: 64px 24px 80px;
        }

        .reserve-card {
          max-width: 640px;
          margin: 0 auto;
          background: #141414;
          border: 1px solid #262626;
          border-radius: 4px;
          padding: 48px;
        }

        .reserve-eyebrow {
          color: #e0342f;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.04em;
          margin: 0 0 8px;
        }

        .reserve-title {
          font-family: "Anton", "Arial Black", sans-serif;
          font-weight: 400;
          font-size: 40px;
          line-height: 1.05;
          letter-spacing: 0.01em;
          color: #fff;
          margin: 0 0 40px;
        }

        .reserve-field {
          margin-bottom: 24px;
        }

        .reserve-field label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #a8a8a8;
          margin-bottom: 8px;
        }

        .reserve-field .reserve-price-hint {
          font-weight: 400;
          color: #6b6b6b;
        }

        .reserve-control {
          width: 100%;
          background: #0a0a0a;
          border: 1px solid #333;
          border-radius: 3px;
          color: #f2f2f2;
          font-size: 15px;
          padding: 12px 14px;
          transition: border-color 0.15s ease, background 0.15s ease;
          box-sizing: border-box;
        }

        .reserve-control::placeholder {
          color: #6b6b6b;
        }

        .reserve-control:focus {
          outline: none;
          border-color: #e0342f;
          background: #111;
        }

        select.reserve-control {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23a8a8a8' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 36px;
          cursor: pointer;
        }

        .reserve-control[readonly] {
          color: #e0342f;
          font-weight: 700;
          border-color: #262626;
          background: #0a0a0a;
          cursor: default;
        }

        .reserve-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        textarea.reserve-control {
          resize: vertical;
          min-height: 90px;
        }

        .reserve-submit {
          width: 100%;
          background: #e0342f;
          border: none;
          border-radius: 3px;
          color: #fff;
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.02em;
          padding: 14px 20px;
          margin-top: 8px;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.1s ease;
        }

        .reserve-submit:hover {
          background: #c72a26;
        }

        .reserve-submit:active {
          transform: scale(0.99);
        }

        @media (max-width: 520px) {
          .reserve-card {
            padding: 32px 24px;
          }
          .reserve-title {
            font-size: 32px;
          }
          .reserve-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="reserve-card">
        <p className="reserve-eyebrow">Blade &amp; Chair</p>
        <h2 className="reserve-title">Book an Appointment</h2>

        <form onSubmit={handleSubmit}>
          <div className="reserve-field">
            <label>Service</label>
            <select
              name="service"
              className="reserve-control"
              value={form.service}
              onChange={handleChange}
              required
            >
              <option value="">Select Service</option>
              <option value="Haircut">Haircut</option>
              <option value="Shave">Shave</option>
            </select>
          </div>

          <div className="reserve-field">
            <label>Category</label>
            <select
              name="category"
              className="reserve-control"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="Regular">Regular</option>
              <option value="Kids">Kids</option>
              <option value="Senior">Adults</option>
            </select>
          </div>

          <div className="reserve-field">
            <label>Barber</label>
            <select
              name="barber"
              className="reserve-control"
              value={form.barber}
              onChange={handleChange}
              required
            >
              <option value="">Select Barber</option>
              <option value="Kreshia">Kreshia</option>
              <option value="Erica">Erica</option>
              <option value="Heart">Heart</option>
            </select>
          </div>

          <div className="reserve-row">
            <div className="reserve-field">
              <label>Date</label>
              <input
                type="date"
                name="date"
                className="reserve-control"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="reserve-field">
              <label>Time</label>
              <input
                type="time"
                name="time"
                className="reserve-control"
                value={form.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="reserve-field">
            <label>Notes (optional)</label>
            <textarea
              name="notes"
              className="reserve-control"
              value={form.notes}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="reserve-field">
            <label>
              Price <span className="reserve-price-hint">(auto-calculated)</span>
            </label>
            <input
              type="text"
              className="reserve-control"
              value={form.price ? `₱${form.price}` : ""}
              readOnly
            />
          </div>

          <button type="submit" className="reserve-submit">
            Reserve
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReservationForm;