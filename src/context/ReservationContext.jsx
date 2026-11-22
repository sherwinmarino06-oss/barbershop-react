import React, { createContext, useState, useEffect, useCallback } from "react";
import { auth } from "../firebase.js";

export const ReservationContext = createContext();

// Local: http://localhost:8080  |  Deployed: set VITE_API_URL sa Netlify
const API =
  (import.meta.env.VITE_API_URL || "http://localhost:8080") + "/api/reservations";

export function ReservationProvider({ children }) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Kunin ang lahat ng reservations mula sa backend (TiDB)
  const loadReservations = useCallback(async () => {
    try {
      const response = await fetch(API);
      if (!response.ok) throw new Error("Failed to load reservations");
      const data = await response.json();
      setReservations(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("Load reservations error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReservations();

    // I-refresh kapag bumalik ang user sa tab, para updated ang listahan
    const handleFocus = () => loadReservations();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [loadReservations]);

  // Magdagdag ng reservation (POST)
  const addReservation = async (reservation) => {
    const payload = {
      clientName: reservation.client,
      clientEmail: auth.currentUser?.email || null,
      barber: reservation.barber,
      service: reservation.service,
      styleChoice: reservation.styleChoice,
      category: reservation.category,
      notes: reservation.notes,
      price: reservation.price,
      date: reservation.date,
      time: reservation.time,
      status: reservation.status || "Pending",
    };

    const response = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Failed to save reservation");

    const saved = await response.json();
    setReservations((prev) => [...prev, saved]);
    return saved;
  };

  // Approve / Decline (PATCH)
  const updateReservationStatus = async (id, status) => {
    try {
      const response = await fetch(`${API}/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error("Failed to update status");

      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    } catch (err) {
      console.log("Update status error:", err);
      alert("Hindi na-update ang status. Subukan ulit.");
    }
  };

  // Cancel / delete (DELETE)
  const cancelReservation = async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete reservation");

      setReservations((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.log("Cancel reservation error:", err);
      alert("Hindi na-cancel ang reservation. Subukan ulit.");
    }
  };

  return (
    <ReservationContext.Provider
      value={{
        reservations,
        setReservations,
        loading,
        addReservation,
        updateReservationStatus,
        cancelReservation,
        loadReservations,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}