import React, { useContext } from "react";
import { ReservationContext } from "../context/ReservationContext.jsx";

function Barbers() {
  const { reservations } = useContext(ReservationContext);

  const approvedBarbers = reservations
    .filter((res) => res.status === "Approved")
    .map((res) => ({
      name: res.barber,
      specialty: res.service,
      availability: "Available",
    }));

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Barbers</h2>

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
            {approvedBarbers.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  No approved barbers yet
                </td>
              </tr>
            ) : (
              approvedBarbers.map((barber, index) => (
                <tr key={index}>
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
                    <button className="btn btn-primary btn-sm">Edit</button>
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
