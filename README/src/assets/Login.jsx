import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";

export default function Login() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data  = await loginUser({ email, password });
      const token = data.access_token;
      localStorage.setItem("token", token);

      let userName = "";
      if (data.user) {
        userName = data.user.full_name || data.user.name || email.split("@")[0];
      } else {
        userName = email.split("@")[0];
      }
      localStorage.setItem("user", JSON.stringify({ name: userName, email }));
      navigate("/");
    } catch {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="lg-page">
      <style>{`
        /* ── Reset ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; }

        /* ── Page: مركز + يمنع الـ horizontal scroll ── */
        .lg-page {
          min-height: 100svh;
          background: radial-gradient(circle at top, #0d1b3e, #04060f);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(20px, 5vw, 40px) clamp(16px, 4vw, 24px);
          overflow-x: hidden;             /* ← يمنع الـ horizontal scroll */
          overflow-y: auto;               /* ← يسمح بـ vertical scroll لو الشاشة صغيرة */
          font-family: 'Segoe UI', sans-serif;
          color: #f0f6ff;
        }

        /* ── Card ── */
        .lg-card {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0,212,255,0.18);
          border-radius: clamp(16px, 3vw, 28px);
          padding: clamp(28px, 6vw, 52px) clamp(24px, 5vw, 44px);
          width: 100%;
          max-width: 420px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.4);
          text-align: center;
        }

        /* ── Title ── */
        .lg-card h2 {
          font-size: clamp(1.5rem, 5vw, 2rem);
          background: linear-gradient(135deg, #00d4ff, #7b61ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: clamp(24px, 5vw, 36px);
        }

        /* ── Inputs ── */
        .lg-card input {
          display: block;
          width: 100%;
          background: rgba(0,0,0,0.25);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: clamp(8px, 2vw, 12px);
          padding: clamp(11px, 2.5vw, 14px) clamp(14px, 2.5vw, 18px);
          color: #fff;
          font-size: clamp(13px, 2.5vw, 15px);
          font-family: inherit;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s;
          margin-bottom: clamp(12px, 2.5vw, 18px);
        }
        .lg-card input::placeholder { color: #5a7899; }
        .lg-card input:focus {
          border-color: #00d4ff;
          box-shadow: 0 0 0 3px rgba(0,212,255,0.1);
        }

        /* ── Submit button ── */
        .lg-btn {
          width: 100%;
          padding: clamp(12px, 3vw, 15px);
          border-radius: clamp(10px, 2vw, 14px);
          border: none;
          background: linear-gradient(135deg, #00d4ff, #7b61ff);
          color: #fff;
          font-weight: 700;
          font-size: clamp(0.95rem, 2.5vw, 1.05rem);
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(0,212,255,0.25);
          transition: opacity 0.2s, transform 0.2s;
          font-family: inherit;
          touch-action: manipulation;
          margin-top: clamp(4px, 1vw, 8px);
        }
        .lg-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .lg-btn:active { transform: translateY(0); }

        /* ── Mobile safe area ── */
        @media (max-width: 400px) {
          .lg-page { align-items: flex-start; padding-top: 40px; }
        }
      `}</style>

      <div className="lg-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="lg-btn">Login</button>
        </form>
      </div>
    </div>
  );
}
