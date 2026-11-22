import React, { createContext, useState, useEffect } from "react";

export const StyleContext = createContext();

const STORAGE_KEY = "styleOptions";

const DEFAULT_STYLES = {
  Haircut: [
    { id: "h1", name: "Classic Cut", img: "/styles/classic-cut.jpg" },
    { id: "h2", name: "Skin Fade", img: "/styles/skin-fade.jpg" },
    { id: "h3", name: "Taper Fade", img: "/styles/taper-fade.jpg" },
    { id: "h4", name: "Crew Cut", img: "/styles/crew-cut.jpg" },
  ],
  Shave: [
    { id: "s1", name: "Clean Shave", img: "/styles/clean-shave.jpg" },
    { id: "s2", name: "Beard Trim", img: "/styles/beard-trim.jpg" },
    { id: "s3", name: "Hot Towel Shave", img: "/styles/hot-towel-shave.jpg" },
  ],
};

export function StyleProvider({ children }) {
  const [styleOptions, setStyleOptions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_STYLES;
    } catch {
      return DEFAULT_STYLES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(styleOptions));
    } catch (err) {
      console.error(err);
      alert("Error saving style options. Local storage might be full.");
    }
  }, [styleOptions]);

  const addStyle = (service, name, img) => {
    const newStyle = { id: Date.now().toString(36), name, img };
    setStyleOptions((prev) => ({
      ...prev,
      [service]: [...(prev[service] || []), newStyle],
    }));
  };

  const deleteStyle = (service, id) => {
    setStyleOptions((prev) => ({
      ...prev,
      [service]: (prev[service] || []).filter((s) => s.id !== id),
    }));
  };

  return (
    <StyleContext.Provider value={{ styleOptions, addStyle, deleteStyle }}>
      {children}
    </StyleContext.Provider>
  );
}