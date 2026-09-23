import React, { useState } from "react";

function Profile() {
  const [profile, setProfile] = useState({
    fullName: "Sherwin M. Macaspac",
    email: "sherwin@gmail.com",
    phone: "09301347295",
    address: "Sitio Bucana, San Jose, Roxas, Oriental Mindoro",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
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

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>Full Name</label>
            <input
              type="text"
              name="fullName"
              style={inputStyle}
              value={profile.fullName}
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

          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              name="email"
              style={inputStyle}
              value={profile.email}
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

          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>Phone Number</label>
            <input
              type="text"
              name="phone"
              style={inputStyle}
              value={profile.phone}
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

          <div style={{ marginBottom: "32px" }}>
            <label style={labelStyle}>Address</label>
            <input
              type="text"
              name="address"
              style={inputStyle}
              value={profile.address}
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
              cursor: "pointer",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#c72a26")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#e0342f")}
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;