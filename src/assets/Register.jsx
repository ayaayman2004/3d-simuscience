import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "", email: "", password: "", confirmPassword: "",
    phone: "", age: "", gender: "", city: "", country: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    if (!formData.fullName.trim()) return "Full name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Invalid email format";
    if (formData.password.length < 6) return "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) return "Passwords do not match";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) { setError(validationError); return; }
    try {
      await registerUser({
        full_name: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword,
      });
      setError("");
      alert("Registered successfully, please login");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Register failed");
    }
  };

  return (
    <div className="rg-page">
      <style>{`
        /* ── Reset ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; }

        /* ── Page: يسمح بالـ scroll العمودي فقط لو الفورم أكبر من الشاشة ── */
        .rg-page {
          min-height: 100svh;
          background: radial-gradient(circle at top, #0d1b3e, #04060f);
          display: flex;
          align-items: flex-start;        /* flex-start مش center عشان على موبايل يسمح بالسكرول */
          justify-content: center;
          padding: clamp(24px, 5vw, 60px) clamp(16px, 4vw, 24px);
          overflow-x: hidden;             /* ← يمنع الـ horizontal scroll */
          overflow-y: auto;               /* ← يسمح بـ vertical scroll لو احتجنا */
          font-family: 'Segoe UI', sans-serif;
          color: #f0f6ff;
        }

        /* ── Card ── */
        .rg-card {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0,212,255,0.18);
          border-radius: clamp(16px, 3vw, 28px);
          padding: clamp(24px, 5vw, 44px) clamp(20px, 5vw, 40px);
          width: 100%;
          max-width: 600px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.4);
        }

        /* ── Title ── */
        .rg-card h2 {
          font-size: clamp(1.4rem, 4vw, 2rem);
          background: linear-gradient(135deg, #00d4ff, #7b61ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: clamp(20px, 4vw, 32px);
          text-align: center;
        }

        /* ── Row of inputs ── */
        .rg-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(10px, 2vw, 16px);
          margin-bottom: clamp(10px, 2vw, 16px);
        }

        /* ── Single-field row ── */
        .rg-row.single {
          grid-template-columns: 1fr;
        }

        /* ── Input / Select ── */
        .rg-card input,
        .rg-card select {
          width: 100%;
          background: rgba(0,0,0,0.25);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: clamp(8px, 1.5vw, 12px);
          padding: clamp(10px, 2vw, 14px) clamp(12px, 2vw, 16px);
          color: #fff;
          font-size: clamp(13px, 2vw, 15px);
          font-family: inherit;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s;
          appearance: none;
          -webkit-appearance: none;
        }
        .rg-card select { cursor: pointer; }
        .rg-card select option { background: #0d1b3e; }

        .rg-card input::placeholder { color: #5a7899; }

        .rg-card input:focus,
        .rg-card select:focus {
          border-color: #00d4ff;
          box-shadow: 0 0 0 3px rgba(0,212,255,0.1);
        }

        /* ── Error ── */
        .rg-error {
          color: #ff6b7a;
          font-size: clamp(12px, 2vw, 13px);
          margin: 12px 0 4px;
          text-align: center;
          padding: 8px 12px;
          background: rgba(255,80,80,0.08);
          border: 1px solid rgba(255,80,80,0.2);
          border-radius: 8px;
        }

        /* ── Submit button ── */
        .rg-btn {
          width: 100%;
          margin-top: clamp(16px, 3vw, 24px);
          padding: clamp(12px, 2.5vw, 15px);
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
        }
        .rg-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .rg-btn:active { transform: translateY(0); }

        /* ── Mobile: كل حقل في سطر لوحده ── */
        @media (max-width: 480px) {
          .rg-row { grid-template-columns: 1fr; }
          .rg-page { align-items: flex-start; padding-top: 20px; padding-bottom: 32px; }
        }
      `}</style>

      <div className="rg-card">
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <div className="rg-row">
            <input type="text"     name="fullName"        placeholder="Full Name"        value={formData.fullName}        onChange={handleChange} />
            <input type="email"    name="email"           placeholder="Email"            value={formData.email}           onChange={handleChange} />
          </div>

          <div className="rg-row">
            <input type="password" name="password"        placeholder="Password"         value={formData.password}        onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
          </div>

          <div className="rg-row">
            <input type="tel"      name="phone"           placeholder="Phone Number"     value={formData.phone}           onChange={handleChange} />
            <input type="number"   name="age"             placeholder="Age"              value={formData.age}             onChange={handleChange} />
          </div>

          <div className="rg-row">
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
          </div>

          <div className="rg-row single">
            <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
          </div>

          {error && <div className="rg-error">{error}</div>}

          <button type="submit" className="rg-btn">Register</button>
        </form>
      </div>
    </div>
  );
}
