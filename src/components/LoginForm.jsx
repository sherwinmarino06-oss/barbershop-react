import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";

const RED = "#e5171f";
const BG = "#0a0a0a";
const ADMIN_EMAIL = "admin@gmail.com";

const IconScissors = (p) => (
  <svg viewBox="0 0 24 24" width={p.size || 22} height={p.size || 22} fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
    <line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" /><line x1="8.12" y1="8.12" x2="12" y2="12" />
  </svg>
);
const IconArrowLeft = () => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="#b8b8b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);
const IconChevronDown = () => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="#9a9a9a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

function LoginForm({ onLogin, onBack }) {
  const [role, setRole] = useState("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  async function handleSubmit(event) {
        event.preventDefault() //prevent refresh
        console.log(name);
        try {
            await fetch("http://localhost:8080/api/reservations", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                })
            })
        } catch (err) {
            console.log(err);
        }
        
    }



  const inputStyle = {
    backgroundColor: "#000",
    border: "1px solid #333",
    color: "#fff",
    borderRadius: 0,
    padding: "12px 14px",
  };
  const labelStyle = { color: "#b8b8b8", fontSize: "0.75rem", letterSpacing: "0.1em", fontFamily: "'Inter',sans-serif", fontWeight: 700 };

  return (
    <div style={{ backgroundColor: BG, minHeight: "100vh", fontFamily: "'Inter',sans-serif" }}>
      <div className="container py-3">
        {onBack && (
          <button
            onClick={onBack}
            className="btn d-inline-flex align-items-center gap-2"
            style={{ backgroundColor: "transparent", border: "none", color: "#b8b8b8", fontSize: "0.85rem", letterSpacing: "0.06em", fontWeight: 700, padding: 0 }}
          >
            <IconArrowLeft /> BACK TO HOME
          </button>
        )}
      </div>

      <div className="d-flex justify-content-center" style={{ paddingTop: "4rem" }}>
        <form
          onSubmit={handleSubmit}
          style={{ width: 400, border: "1px solid #333", backgroundColor: "#0a0a0a", padding: "2.5rem" }}
        >
          <div className="text-center mb-4">
            <div style={{ width: 60, height: 60, backgroundColor: RED, borderRadius: 8, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "1.2rem" }}>
              <IconScissors />
            </div>
            <h2 style={{ fontFamily: "'Anton',sans-serif", color: "#fff", textTransform: "uppercase", fontSize: "1.7rem" }} className="mb-2">
             BLADE <span style={{ color: RED }}>&amp;</span> CHAIR
            </h2>
            <p style={{ color: "#9a9a9a", fontSize: "0.9rem" }} className="mb-0">
              Log in to book, reschedule, or manage your reservations.
            </p>
          </div>

          <div className="mb-3">
            <div style={labelStyle} className="mb-1">EMAIL</div>
            <input
              type="email"
              className="form-control"
              style={inputStyle}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <div style={labelStyle} className="mb-1">PASSWORD</div>
            <input
              type="password"
              className="form-control"
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <div style={labelStyle} className="mb-1">SIGN IN AS</div>
            <div style={{ position: "relative" }}>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{
                  ...inputStyle,
                  width: "100%",
                  appearance: "none",
                  WebkitAppearance: "none",
                  cursor: "pointer",
                }}
              >
                <option value="client">Client</option>
                <option value="admin">Admin</option>
              </select>
              <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                <IconChevronDown />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{ backgroundColor: RED, color: "#fff", fontFamily: "'Inter',sans-serif", fontWeight: 700, letterSpacing: "0.04em", padding: "12px", borderRadius: 0, border: "none" }}
          >
            LOG IN
          </button>

          <div className="d-flex align-items-center gap-2 my-3">
            <div style={{ flex: 1, borderTop: "1px solid #333" }}></div>
            <span style={{ color: "#6b6b6b", fontSize: "0.75rem", letterSpacing: "0.08em" }}>OR</span>
            <div style={{ flex: 1, borderTop: "1px solid #333" }}></div>
          </div>

          <button
            type="button"
            onClick={onLogin}
            className="btn w-100 d-flex align-items-center justify-content-center gap-2"
            style={{ backgroundColor: "#fff", color: "#1c1b19", fontFamily: "'Inter',sans-serif", fontWeight: 600, padding: "12px", borderRadius: 0, border: "1px solid #333" }}
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
              <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
            </svg>
            Sign in with Google
          </button>

          {error && <div style={{ color: "#ff6b6b", fontSize: "0.85rem" }} className="text-center mt-3">{error}</div>}

          <div className="text-center mt-4" style={{ color: "#9a9a9a", fontSize: "0.88rem" }}>
            New here? <span style={{ color: RED, fontWeight: 600 }}>Create an account</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;