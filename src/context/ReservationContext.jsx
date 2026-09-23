import React, { createContext, useState, useEffect } from "react";

export const ReservationContext = createContext();

export function ReservationProvider({ children }) {
  const [reservations, setReservations] = useState(() => {
    const saved = localStorage.getItem("reservations");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("reservations", JSON.stringify(reservations));
  }, [reservations]);

  const addReservation = (reservation) => {
    const offlineReservation = {
      ...reservation,
      createdAt: new Date().toISOString(),
      synced: navigator.onLine, // mark synced if online
    };
    setReservations((prev) => [...prev, offlineReservation]);

    if (navigator.onLine) {
      syncReservations();
    }
  };

  const updateReservationStatus = (index, status) => {
    const updated = [...reservations];
    updated[index].status = status;
    setReservations(updated);
  };

  const cancelReservation = (index) => {
    const updated = [...reservations];
    updated.splice(index, 1);
    setReservations(updated);
  };

  const syncReservations = () => {
    const unsynced = reservations.filter((res) => !res.synced);
    if (unsynced.length > 0) {
      const updated = reservations.map((res) => ({ ...res, synced: true }));
      setReservations(updated);
      console.log("Reservations synced:", unsynced);
    }
  };

  useEffect(() => {
    const handleOnline = () => {
      syncReservations();
    };
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [reservations]);

  return (
    <ReservationContext.Provider
      value={{
        reservations,
        setReservations,
        addReservation,
        updateReservationStatus,
        cancelReservation,
        syncReservations,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}
