import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { TokenContext } from "../../Context/TokenContext";

export default function Navbar() {
  const { token, setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  }

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(255,255,255,0.92)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border)",
      boxShadow: "var(--shadow-sm)"
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Brand */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: "linear-gradient(135deg, var(--brand) 0%, #3b82f6 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 8px rgba(26,86,219,0.35)"
          }}>
            <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 20, color: "var(--text-primary)", letterSpacing: "-0.3px" }}>
            Social<span style={{ color: "var(--brand)" }}>App</span>
          </span>
        </Link>

        {/* Center nav */}
        {token && (
          <div style={{ display: "flex", gap: 4 }}>
            {[
              { to: "/", label: "Home", end: true, icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { to: "/userPosts", label: "My Posts", end: false, icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></svg> }
            ].map(({ to, label, end, icon }) => (
              <NavLink key={to} to={to} end={end}
                style={({ isActive }) => ({
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "6px 14px", borderRadius: "var(--radius-md)",
                  fontSize: 13.5, fontWeight: isActive ? 600 : 500,
                  color: isActive ? "var(--brand)" : "var(--text-secondary)",
                  background: isActive ? "var(--brand-light)" : "transparent",
                  textDecoration: "none", transition: "all 0.15s ease"
                })}
              >
                {icon} {label}
              </NavLink>
            ))}
          </div>
        )}

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {token ? (
            <button onClick={logOut} style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "7px 16px", borderRadius: "var(--radius-md)",
              fontSize: 13, fontWeight: 500, cursor: "pointer",
              border: "1px solid var(--border)", background: "transparent",
              color: "var(--text-secondary)", transition: "all 0.15s ease"
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--danger)"; e.currentTarget.style.color = "var(--danger)"; e.currentTarget.style.background = "var(--danger-light)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.background = "transparent"; }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Log out
            </button>
          ) : (
            <>
              <NavLink to="/login" style={{ fontSize: 13.5, fontWeight: 500, color: "var(--text-secondary)", textDecoration: "none", padding: "7px 12px" }}>Log in</NavLink>
              <NavLink to="/register" style={{
                fontSize: 13.5, fontWeight: 600, color: "white", textDecoration: "none",
                padding: "7px 18px", borderRadius: "var(--radius-md)",
                background: "linear-gradient(135deg, var(--brand) 0%, #3b82f6 100%)",
                boxShadow: "0 2px 8px rgba(26,86,219,0.3)"
              }}>Sign up</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}