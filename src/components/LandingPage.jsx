import React, { useEffect } from "react";
import heroImg from "../assets/hero.jpg";

const RED = "#e5171f";
const BG = "#0a0a0a";
const BORDER = "#242424";
const MUTED = "#9a9a9a";

const IconScissors = (p) => (
  <svg viewBox="0 0 24 24" width={p.size || 18} height={p.size || 18} fill="none" stroke={p.color || "#fff"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
    <line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" /><line x1="8.12" y1="8.12" x2="12" y2="12" />
  </svg>
);
const IconStar = (p) => (
  <svg viewBox="0 0 24 24" width={p.size || 14} height={p.size || 14} fill={RED} stroke={RED}>
    <polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9" />
  </svg>
);
const IconArrowRight = (p) => (
  <svg viewBox="0 0 24 24" width={p.size || 16} height={p.size || 16} fill="none" stroke={p.color || "#fff"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const IconClock = (p) => (
  <svg viewBox="0 0 24 24" width={p.size || 22} height={p.size || 22} fill="none" stroke={RED} strokeWidth="2">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const IconCalCheck = (p) => (
  <svg viewBox="0 0 24 24" width={p.size || 22} height={p.size || 22} fill="none" stroke={RED} strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    <polyline points="9 15 11 17 15 13" />
  </svg>
);
const IconPin = (p) => (
  <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke={RED} strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke={RED} strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke={RED} strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="22 6 12 13 2 6" />
  </svg>
);

function useDisplayFont() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);
}

const eyebrowStyle = { color: RED, fontFamily: "'Inter',sans-serif", fontWeight: 700, letterSpacing: "0.18em", fontSize: "0.78rem", textTransform: "uppercase" };
const h2Style = { fontFamily: "'Anton',sans-serif", color: "#fff", fontSize: "clamp(2.2rem,4vw,3.1rem)", textTransform: "uppercase", letterSpacing: "0.01em" };

const scrollToId = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

function LandingPage({ onGetStarted }) {
  useDisplayFont();

  const menu = [
    {
      name: "Haircut",
      duration: "30 MIN",
      desc: "A professional trim and style to keep your hair neat, fresh, and suited to your look.",
      prices: [
        { label: "Regular", price: "₱100" },
        { label: "Adult", price: "₱80" },
        { label: "Kids", price: "₱70" },
      ],
    },
    {
      name: "Shave",
      duration: "15 MIN",
      desc: "A clean, smooth shave for a polished appearance and refreshed feel.",
      prices: [
        { label: "Regular", price: "₱40" },
        { label: "Adult", price: "₱30" },
        { label: "Kids", price: "₱20" },
      ],
    },
  ];

  const steps = [
    { n: "01", icon: <IconScissors color={RED} size={22} />, title: "Pick Your Service", desc: "Choose from cuts, fades, and beard work — with upfront pricing." },
    { n: "02", icon: <IconClock />, title: "Choose Your Time", desc: "See real-time availability and lock in the slot that suits you." },
    { n: "03", icon: <IconCalCheck />, title: "Show Up Sharp", desc: "Skip the line. Your barber is ready when you walk in." },
  ];

  return (
    <div style={{ backgroundColor: BG, fontFamily: "'Inter',sans-serif" }}>
      <nav style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div className="container d-flex justify-content-between align-items-center py-3">
          <div className="d-flex align-items-center gap-2">
            <div style={{ width: 40, height: 40, backgroundColor: RED, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconScissors size={20} />
            </div>
            <span style={{ fontFamily: "'Anton',sans-serif", color: "#fff", fontSize: "1.25rem", letterSpacing: "0.02em" }}>
              BLADE <span style={{ color: RED }}>&amp;</span> CHAIR
            </span>
          </div>
          <div className="d-none d-md-flex gap-4" style={{ ...eyebrowStyle, letterSpacing: "0.08em", color: "#b8b8b8" }}>
            <span style={{ cursor: "pointer" }} onClick={() => scrollToId("services")}>SERVICES</span>
            <span style={{ cursor: "pointer" }} onClick={() => scrollToId("how-it-works")}>HOW IT WORKS</span>
            <span style={{ cursor: "pointer" }} onClick={() => scrollToId("contact")}>CONTACT</span>
          </div>
          <button
            onClick={onGetStarted}
            className="btn"
            style={{ border: `1px solid ${RED}`, color: RED, backgroundColor: "transparent", fontFamily: "'Inter',sans-serif", fontWeight: 700, letterSpacing: "0.06em", fontSize: "0.85rem", padding: "8px 18px" }}
          >
            LOG IN
          </button>
        </div>
      </nav>

      <section
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.85) 50%, rgba(10,10,10,0.55) 100%), url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <div className="container" style={{ paddingTop: "7rem", paddingBottom: "7rem" }}>
          <div className="d-flex align-items-center gap-2 mb-3">
            <IconStar />
            <span style={eyebrowStyle}>NOW BOOKING ONLINE</span>
          </div>
          <h1 style={{ fontFamily: "'Anton',sans-serif", textTransform: "uppercase", lineHeight: 0.98, fontSize: "clamp(2.8rem,7vw,5.2rem)", marginBottom: "1.5rem" }}>
            <div style={{ color: "#fff" }}>Your Chair.</div>
            <div style={{ color: RED }}>Your Time.</div>
            <div style={{ color: "#fff" }}>No Waiting.</div>
          </h1>
          <p style={{ color: MUTED, fontSize: "1.05rem", maxWidth: 480, lineHeight: 1.6 }} className="mb-4">
            Book your barber in under a minute. Real-time slots, upfront prices, and a fresh cut the moment you sit down.
          </p>
          <div className="d-flex gap-3 flex-wrap">
            <button onClick={onGetStarted} className="btn d-flex align-items-center gap-2" style={{ backgroundColor: RED, color: "#fff", fontFamily: "'Inter',sans-serif", fontWeight: 700, letterSpacing: "0.04em", padding: "14px 26px", borderRadius: 0, border: "none" }}>
              BOOK NOW <IconArrowRight />
            </button>
            <button onClick={() => scrollToId("how-it-works")} className="btn" style={{ backgroundColor: "transparent", color: "#fff", border: "1.5px solid #fff", fontFamily: "'Inter',sans-serif", fontWeight: 700, letterSpacing: "0.04em", padding: "14px 26px", borderRadius: 0 }}>
              HOW IT WORKS
            </button>
          </div>
        </div>
      </section>

      <section id="services" style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div className="container" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div style={eyebrowStyle} className="mb-2">THE MENU</div>
          <h2 style={h2Style} className="mb-5">Services &amp; Prices</h2>

          <div className="row g-0" style={{ border: `1px solid ${BORDER}` }}>
            {menu.map((m, i) => (
              <div className="col-md-6" key={m.name} style={{ borderLeft: i === 0 ? "none" : `1px solid ${BORDER}`, padding: "1.75rem" }}>
                <div className="d-flex justify-content-between align-items-baseline mb-1">
                  <span style={{ fontFamily: "'Anton',sans-serif", color: "#fff", fontSize: "1.1rem", textTransform: "uppercase" }}>{m.name}</span>
                  <span style={{ color: MUTED, fontSize: "0.72rem", letterSpacing: "0.08em" }}>{m.duration}</span>
                </div>
                <p style={{ color: "#8c8c8c", fontSize: "0.85rem", lineHeight: 1.5 }} className="mb-3">{m.desc}</p>
                <div>
                  {m.prices.map((p, j) => (
                    <div
                      key={p.label}
                      className="d-flex justify-content-between align-items-center"
                      style={{ padding: "0.5rem 0", borderTop: j === 0 ? "none" : `1px solid ${BORDER}` }}
                    >
                      <span style={{ color: "#d9d9d9", fontSize: "0.9rem" }}>{p.label}</span>
                      <span style={{ fontFamily: "'Anton',sans-serif", color: RED, fontSize: "1rem" }}>{p.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div className="container" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div style={eyebrowStyle} className="mb-2">RESERVATION SYSTEM</div>
          <h2 style={h2Style} className="mb-5">Booking In 3 Steps</h2>

          <div className="row g-4">
            {steps.map((s) => (
              <div className="col-md-4" key={s.n}>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <div style={{ flex: 1, borderTop: `1px solid ${RED}` }}></div>
                  <span style={{ fontFamily: "'Anton',sans-serif", fontSize: "2.8rem", color: "transparent", WebkitTextStroke: "1px #4a4a4a" }}>{s.n}</span>
                </div>
                <div className="mb-2">{s.icon}</div>
                <h5 style={{ fontFamily: "'Anton',sans-serif", color: "#fff", textTransform: "uppercase", fontSize: "1.05rem" }} className="mb-2">{s.title}</h5>
                <p style={{ color: MUTED, fontSize: "0.88rem", lineHeight: 1.6 }} className="mb-0">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: RED, textAlign: "center" }}>
        <div className="container" style={{ paddingTop: "4.5rem", paddingBottom: "4.5rem" }}>
          <h2 style={{ fontFamily: "'Anton',sans-serif", color: "#fff", textTransform: "uppercase", fontSize: "clamp(2rem,4.5vw,3.2rem)" }} className="mb-3">
            Ready For A Fresh Cut?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", maxWidth: 520 }} className="mx-auto mb-4">
            Create your account and reserve your chair today — walk-ins welcome, but bookers never wait.
          </p>
          <button onClick={onGetStarted} className="btn d-inline-flex align-items-center gap-2" style={{ backgroundColor: "#000", color: "#fff", fontFamily: "'Inter',sans-serif", fontWeight: 700, letterSpacing: "0.04em", padding: "14px 28px", borderRadius: 0, border: "none" }}>
            GET STARTED <IconArrowRight />
          </button>
        </div>
      </section>

      <footer id="contact" style={{ backgroundColor: BG }}>
        <div className="container" style={{ paddingTop: "4rem", paddingBottom: "2rem" }}>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <div style={{ width: 34, height: 34, backgroundColor: RED, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <IconScissors size={16} />
                </div>
                <span style={{ fontFamily: "'Anton',sans-serif", color: "#fff", fontSize: "1.05rem" }}>
                  BLADE <span style={{ color: RED }}>&amp;</span> CHAIR
                </span>
              </div>
              <p style={{ color: MUTED, fontSize: "0.88rem", maxWidth: 260 }}>
                Classic barbering, modern booking. Open Monday to Sunday, 9am – 8pm.
              </p>
            </div>

            <div className="col-md-4">
              <div style={{ ...eyebrowStyle, color: "#fff", letterSpacing: "0.06em" }} className="mb-3">VISIT US</div>
              <div className="d-flex align-items-center gap-2 mb-2" style={{ color: "#bdbdbd", fontSize: "0.88rem" }}><IconPin />Roxas, Oriental Mindoro</div>
              <div className="d-flex align-items-center gap-2 mb-2" style={{ color: "#bdbdbd", fontSize: "0.88rem" }}><IconPhone />+639 3013 47295</div>
              <div className="d-flex align-items-center gap-2" style={{ color: "#bdbdbd", fontSize: "0.88rem" }}><IconMail />sherwinmarino06@gmail.com</div>
            </div>

            <div className="col-md-4">
              <div style={{ ...eyebrowStyle, color: "#fff", letterSpacing: "0.06em" }} className="mb-3">QUICK LINKS</div>
              <div style={{ color: "#bdbdbd", fontSize: "0.88rem" }} className="mb-2">Services</div>
              <div style={{ color: "#bdbdbd", fontSize: "0.88rem" }} className="mb-2">How it works</div>
              <div style={{ color: "#bdbdbd", fontSize: "0.88rem" }}>Log in / Sign up</div>
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${BORDER}`, color: "#6b6b6b", fontSize: "0.78rem" }} className="text-center pt-4 mt-4">
            © 2026 BLADE &amp; CHAIR. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;