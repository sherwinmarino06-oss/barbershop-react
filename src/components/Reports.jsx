import React, { useContext } from "react";
import { ReservationContext } from "../context/ReservationContext.jsx";

function Reports() {
  const { reservations } = useContext(ReservationContext);

  const today = new Date().toISOString().split("T")[0];
  const dailyReservations = reservations.filter((res) => res.date === today);
  const daily = {
    reservations: dailyReservations.length,
    clients: new Set(dailyReservations.map((res) => res.client)).size,
    income: dailyReservations
      .filter((res) => res.status === "Approved")
      .reduce((sum, res) => sum + (res.price || 0), 0),
  };

  const currentMonth = new Date().getMonth();
  const monthlyReservations = reservations.filter(
    (res) => new Date(res.date).getMonth() === currentMonth
  );
  const monthly = {
    reservations: monthlyReservations.length,
    clients: new Set(monthlyReservations.map((res) => res.client)).size,
    income: monthlyReservations
      .filter((res) => res.status === "Approved")
      .reduce((sum, res) => sum + (res.price || 0), 0),
  };

  const currentYear = new Date().getFullYear();
  const yearlyReservations = reservations.filter(
    (res) => new Date(res.date).getFullYear() === currentYear
  );
  const yearly = {
    reservations: yearlyReservations.length,
    clients: new Set(yearlyReservations.map((res) => res.client)).size,
    income: yearlyReservations
      .filter((res) => res.status === "Approved")
      .reduce((sum, res) => sum + (res.price || 0), 0),
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Reports</h2>

      <div className="row">
        {/* Daily Summary */}
        <div className="col-md-4 mb-4">
          <div className="card shadow h-100">
            <div className="card-body text-center">
              <h4 className="card-title fw-bold">Daily Summary</h4>
              <p>Total Reservations: {daily.reservations}</p>
              <p>Total Clients: {daily.clients}</p>
              <p>Income Today: ₱{daily.income.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Monthly Summary */}
        <div className="col-md-4 mb-4">
          <div className="card shadow h-100">
            <div className="card-body text-center">
              <h4 className="card-title fw-bold">Monthly Summary</h4>
              <p>Total Reservations: {monthly.reservations}</p>
              <p>Total Clients: {monthly.clients}</p>
              <p>Total Income: ₱{monthly.income.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Yearly Summary */}
        <div className="col-md-4 mb-4">
          <div className="card shadow h-100">
            <div className="card-body text-center">
              <h4 className="card-title fw-bold">Yearly Summary</h4>
              <p>Total Reservations: {yearly.reservations}</p>
              <p>Total Clients: {yearly.clients}</p>
              <p>Total Income: ₱{yearly.income.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
