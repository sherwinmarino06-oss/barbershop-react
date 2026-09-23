import { useState, useEffect } from "react";

export default function ReservationTable() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/reservations")
      .then((response) => response.json())
      .then((data) => setReservations(data))
      .catch((err) => console.error("Error fetching reservations:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Reservations</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Client</th>
            <th>Barber</th>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res, index) => (
            <tr key={index}>
              <td>{res.clientName}</td>
              <td>{res.barber}</td>
              <td>{res.service}</td>
              <td>{res.date}</td>
              <td>{res.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
