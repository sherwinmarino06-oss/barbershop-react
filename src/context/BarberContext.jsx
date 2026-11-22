import React, { createContext, useState, useEffect } from "react";

export const BarberContext = createContext();

const STORAGE_KEY = "barbers";

const DEFAULT_BARBERS = [
  { id: "b1", name: "Kreshia", specialty: "Haircut", availability: "Available" },
  { id: "b2", name: "Erica", specialty: "Haircut", availability: "Available" },
  { id: "b3", name: "Heart", specialty: "Shave", availability: "Available" },
];

export function BarberProvider({ children }) {
  const [barbers, setBarbers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_BARBERS;
    } catch {
      return DEFAULT_BARBERS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(barbers));
  }, [barbers]);

  const addBarber = (barber) => {
    setBarbers((prev) => [...prev, { id: Date.now().toString(36), ...barber }]);
  };

  const updateBarber = (id, data) => {
    setBarbers((prev) => prev.map((b) => (b.id === id ? { ...b, ...data } : b)));
  };

  const deleteBarber = (id) => {
    setBarbers((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <BarberContext.Provider value={{ barbers, addBarber, updateBarber, deleteBarber }}>
      {children}
    </BarberContext.Provider>
  );
}