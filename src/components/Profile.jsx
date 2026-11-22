import React, { useState, useEffect } from "react";
import { useProfile } from "../hooks/useProfile.js"; // 👉 BAGO

function Profile() {
  // 👉 BAGO: galing na sa Firestore ang profile ng naka-login na user
  const { profile, loading, saveProfile } = useProfile();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
  });
  const [saving, setSaving] = useState(false);

  // 👉 BAGO: ilagay sa form ang nakuhang profile
  useEffect(() => {
    setForm({
      fullName: profile.fullName,
      phone: profile.phone,
      address: profile.address,
    });
  }, [profile.fullName, profile.phone, profile.address]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 👉 BAGO: totoong pag-save sa Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.fullName.trim() || !form.phone.trim()) {
      alert("Please enter your full name and phone number.");
      return;
    }

    setSaving(true);
    try {
      await saveProfile(form);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Hindi na-save ang profile. Subukan ulit.");
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    width: "100%",
    background: "#0a0a0a",
    border: "1px solid #333",
    borderRadius: "3px",
    color: "#f2f2f2",
    fontSize: "15px",
    padding: "12px 14px",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: "#a8a8a8",
    marginBottom: "8px",
  };

  const profileComplete =
    profile.fullName.trim() !== "" && profile.phone.trim() !== "";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#f2f2f2",
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        padding: "64px 24px 80px",
      }}
    >
      <div
        style={{
          maxWidth: "640px",
          margin: "0 auto",
          background: "#141414",
          border: "1px solid #262626",
          borderRadius: "4px",
          padding: "48px",
        }}
      >
        <p
          style={{
            color: "#e0342f",
            fontWeight: "700",
            fontSize: "13px",
            letterSpacing: "0.04em",
            margin: "0 0 8px",
          }}
        >
          Blade &amp; Chair
        </p>
        <h2
          style={{
            fontFamily: "'Anton', 'Arial Black', sans-serif",
            fontWeight: "400",
            fontSize: "40px",
            lineHeight: "1.05",
            letterSpacing: "0.01em",
            color: "#fff",
            margin: "0 0 40px",
          }}
        >
          My Profile
        </h2>

        {loading ? (
          <p style={{ color: "#a8a8a8" }}>Loading...</p>
        ) : (
          <>
            {/* 👉 BAGO: paalala kapag kulang pa ang profile */}
            {!profileComplete && (
              <div
                style={{
                  border: "1px solid #e0342f",
                  borderRadius: "3px",
                  background: "#1a0f0f",
                  padding: "14px 16px",
                  marginBottom: "28px",
                  fontSize: "14px",
                  lineHeight: 1.5,
                }}
              >
                Please complete your full name and phone number so you can book
                an appointment.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "24px" }}>
                <label style={labelStyle}>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  style={inputStyle}
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#e0342f";
                    e.currentTarget.style.background = "#111";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#333";
                    e.currentTarget.style.background = "#0a0a0a";
                  }}
                />
              </div>

              {/* 👉 BAGO: read-only ang email, galing ito sa account */}
              <div style={{ marginBottom: "24px" }}>
                <label style={labelStyle}>
                  Email Address{" "}
                  <span style={{ fontWeight: 400, color: "#6b6b6b" }}>
                    (from your account)
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  style={{
                    ...inputStyle,
                    color: "#8a8a8a",
                    cursor: "not-allowed",
                  }}
                  value={profile.email}
                  readOnly
                />
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={labelStyle}>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  style={inputStyle}
                  value={form.phone}
                  onChange={handleChange}
                  required
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#e0342f";
                    e.currentTarget.style.background = "#111";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#333";
                    e.currentTarget.style.background = "#0a0a0a";
                  }}
                />
              </div>

              <div style={{ marginBottom: "32px" }}>
                <label style={labelStyle}>Address</label>
                <input
                  type="text"
                  name="address"
                  style={inputStyle}
                  value={form.address}
                  onChange={handleChange}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#e0342f";
                    e.currentTarget.style.background = "#111";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#333";
                    e.currentTarget.style.background = "#0a0a0a";
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                style={{
                  width: "100%",
                  background: "#e0342f",
                  border: "none",
                  borderRadius: "3px",
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: "15px",
                  letterSpacing: "0.02em",
                  padding: "14px 20px",
                  cursor: saving ? "default" : "pointer",
                  opacity: saving ? 0.7 : 1,
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = "#c72a26")}
                onMouseOut={(e) => (e.currentTarget.style.background = "#e0342f")}
              >
                {saving ? "Saving..." : "Update Profile"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;