import { useState, useEffect } from "react";

export default function ReservationTable() {
  const [reservations, setReservations] = useState([]);

  const [clientName, setClientName] = useState("");
  const [barber, setBarber] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [editID, seteditID] = useState("");
  const [editClientName, seteditClientName] = useState("");
  const [editBarber, seteditBarber] = useState("");
  const [editService, seteditService] = useState("");
  const [editDate, seteditDate] = useState("");
  const [editTime, seteditTime] = useState("");
  const [isModalOpen, setisModalOpen] = useState(false);

  const reservation_url = "https://backend-28g9.onrender.com/api/reservations";

  useEffect(() => {
    fetch(reservation_url)
      .then((response) => response.json())
      .then((data) => {
        setReservations(data);
        console.log(data);
      })
      .catch((err) => console.log("Error in", err));
  }, []);

  async function submitReservation(e) {
    e.preventDefault();
    try {
      const response = await fetch(reservation_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientName: clientName,
          barber: barber,
          service: service,
          date: date,
          time: time,
        }),
      });

      const data = await response.json();

      setReservations((res) => [...res, data]);
      setClientName("");
      setBarber("");
      setService("");
      setDate("");
      setTime("");
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const response = await fetch(`${reservation_url}/${editID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientName: editClientName,
        barber: editBarber,
        service: editService,
        date: editDate,
        time: editTime,
      }),
    });

    const data = await response.json();
    setReservations((prev) =>
      prev.map((r) => (r.id === Number(editID) ? data : r))
    );

    setisModalOpen(false);
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this reservation?")) return;
    await fetch(`${reservation_url}/${id}`, { method: "DELETE" });
    setReservations((prev) => prev.filter((r) => r.id !== id));
  }

  function openEditModal(reservation) {
    setisModalOpen(true);
    seteditID(reservation.id);
    seteditClientName(reservation.clientName);
    seteditBarber(reservation.barber);
    seteditService(reservation.service);
    seteditDate(reservation.date);
    seteditTime(reservation.time);
  }

  return (
    <div className="container mt-4">
      <h1>Reservations</h1>
      <form onSubmit={submitReservation}>
        <label htmlFor="clientName">Client Name</label>
        <input
          type="text"
          name="clientName"
          id="clientName"
          className="form-control mb-2"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />

        <label htmlFor="barber">Barber</label>
        <input
          type="text"
          name="barber"
          id="barber"
          className="form-control mb-2"
          value={barber}
          onChange={(e) => setBarber(e.target.value)}
        />

        <label htmlFor="service">Service</label>
        <input
          type="text"
          name="service"
          id="service"
          className="form-control mb-2"
          value={service}
          onChange={(e) => setService(e.target.value)}
        />

        <label htmlFor="date">Date</label>
        <input
          type="date"
          name="date"
          id="date"
          className="form-control mb-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label htmlFor="time">Time</label>
        <input
          type="text"
          name="time"
          id="time"
          className="form-control mb-2"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <input type="submit" className="btn btn-primary" value="Add Reservation" />
      </form>

      <br />
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <td scope="col">Client</td>
            <td>Barber</td>
            <td>Service</td>
            <td>Date</td>
            <td>Time</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res) => (
            <tr key={res.id}>
              <td scope="row">{res.clientName}</td>
              <td>{res.barber}</td>
              <td>{res.service}</td>
              <td>{res.date}</td>
              <td>{res.time}</td>
              
              <td>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => openEditModal(res)}
                >
                  Edit
                </button>{" "}
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(res.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Reservation</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setisModalOpen(false)}
                ></button>
              </div>
              <form onSubmit={handleUpdate}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="editClientName" className="form-label">
                      Client Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editClientName"
                      value={editClientName}
                      onChange={(e) => seteditClientName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editBarber" className="form-label">
                      Barber
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editBarber"
                      value={editBarber}
                      onChange={(e) => seteditBarber(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editService" className="form-label">
                      Service
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editService"
                      value={editService}
                      onChange={(e) => seteditService(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editDate" className="form-label">
                      Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="editDate"
                      value={editDate}
                      onChange={(e) => seteditDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editTime" className="form-label">
                      Time
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editTime"
                      value={editTime}
                      onChange={(e) => seteditTime(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setisModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}