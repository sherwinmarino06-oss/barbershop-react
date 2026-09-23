import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import LandingPage from "./components/LandingPage.jsx";
import LoginForm from "./components/LoginForm.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import ClientDashboard from "./components/ClientDashboard.jsx";
import ReservationForm from "./components/ReservationForm.jsx";
import Barbers from "./components/Barbers.jsx";
import Services from "./components/Services.jsx";
import Reports from "./components/Reports.jsx";
import MyReservations from "./components/MyReservations.jsx";
import Profile from "./components/Profile.jsx";
import ReservationTable from "./components/ReservationTable.jsx";
import { ReservationProvider } from "./context/ReservationContext.jsx";

import app, { auth, googleProvider, db } from "./firebase.js";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      const isOnLoginPage = window.location.pathname === "/";

      if (currentUser) {
        setUser(currentUser);

        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        let currentRole = "admin";

        if (userSnap.exists()) {
          currentRole = userSnap.data().role || "admin";
        } else {
          currentRole = currentUser.email === "admin@gmail.com" ? "admin" : "admin";
          await setDoc(userRef, {
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
            role: currentRole,
            createdAt: serverTimestamp(),
          });
        }

        setRole(currentRole);

        if (isOnLoginPage) {
          navigate(currentRole === "admin" ? "/admin" : "/client");
        }
      } else {
        setUser(null);
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setRole(null);
      setShowLogin(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <ReservationProvider>
      {user && <Navbar user={user} onLogout={handleLogout} />}
      {!user ? (
        showLogin ? (
          <LoginForm onLogin={handleLogin} onBack={() => setShowLogin(false)} />
        ) : (
          <LandingPage onGetStarted={() => setShowLogin(true)} />
        )
      ) : (
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/client" element={<ClientDashboard />} />
          <Route path="/reserve" element={<ReservationForm />} />
          <Route path="/my-reservations" element={<MyReservations />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/barbers" element={<Barbers />} />
          <Route path="/services" element={<Services />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reservations" element={<ReservationTable />} />
        </Routes>
      )}
    </ReservationProvider>
  );
}

export default App;