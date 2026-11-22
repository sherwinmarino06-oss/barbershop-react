import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase.js";

export function useProfile() {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setLoading(false);
        return;
      }
      try {
        const snap = await getDoc(doc(db, "users", u.uid));
        const data = snap.exists() ? snap.data() : {};
        setProfile({
          fullName: data.fullName || data.displayName || u.displayName || "",
          email: u.email || data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        });
      } catch (err) {
        console.error("Failed to load profile:", err);
        setProfile((prev) => ({ ...prev, email: u.email || "" }));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // i-save ang profile ng naka-login na user (merge, kaya hindi nabubura ang role)
  const saveProfile = async (updated) => {
    const u = auth.currentUser;
    if (!u) throw new Error("Not logged in");

    await setDoc(
      doc(db, "users", u.uid),
      {
        fullName: updated.fullName.trim(),
        phone: updated.phone.trim(),
        address: updated.address.trim(),
        email: u.email,
        profileUpdatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    setProfile((prev) => ({
      ...prev,
      fullName: updated.fullName.trim(),
      phone: updated.phone.trim(),
      address: updated.address.trim(),
    }));
  };

  return { profile, loading, saveProfile };
}