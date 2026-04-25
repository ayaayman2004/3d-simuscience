import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="custom-navbar">
        <div className="navbar-container">
          {/* اللوجو في أقصى اليسار */}
          <div className="navbar-logo">
            <Link to="/" onClick={closeMenu}>
              <img src={logo} alt="Logo" className="lo1" />
            </Link>
          </div>

          {/* زر الموبايل (الهامبرجر) */}
          <button className="menu-toggle" onClick={toggleMenu}>
            {isOpen ? "✕" : "☰"}
          </button>

          {/* الروابط في أقصى اليمين */}
          <ul className={`navbar-nav ${isOpen ? "active" : ""}`}>
            <li><Link className="nav-link-item" to="/" onClick={closeMenu}>Home</Link></li>
            <li><Link className="nav-link-item" to="/Register" onClick={closeMenu}>Register</Link></li>
            <li><Link className="nav-link-item" to="/Login" onClick={closeMenu}>Login</Link></li>
            <li><Link className="nav-link-item" to="/Review" onClick={closeMenu}>Review</Link></li>
            <li><Link className="nav-link-item" to="/ChemicalTools" onClick={closeMenu}>Chemical Tools</Link></li>
            {/* رابط ChemBot - ينتقل إلى صفحة منفصلة */}
            <li>
             <Link className="nav-link-item chatbot-link" to="/ChatBot" onClick={closeMenu}>
  ⚗️ ChemBot
</Link>
            </li>
          </ul>
        </div>
      </nav>

      <style>{`
        .custom-navbar {
          width: 100%;
          background: rgba(8, 13, 28, 0.9);
          backdrop-filter: blur(15px);
          border-bottom: 1px solid rgba(0, 212, 255, 0.15);
          padding: 10px 0;
          position: sticky;
          top: 0;
          z-index: 2000;
        }

        .navbar-container {
          max-width: 1300px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
        }

        .navbar-logo img {
          height: 45px;
          display: block;
        }

        .navbar-nav {
          display: flex;
          list-style: none;
          gap: 24px;
          margin: 0;
          padding: 0;
          transition: all 0.4s ease;
        }

        .nav-link-item {
          color: #f0f6ff;
          text-decoration: none;
          font-weight: 500;
          font-size: 15px;
          transition: color 0.3s ease;
          position: relative;
        }

        .nav-link-item:hover {
          color: #00d4ff;
        }

        /* رابط ChemBot مخصص */
        .chatbot-link {
          background: linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,201,167,0.1));
          border: 1px solid rgba(0,212,255,0.4);
          border-radius: 30px;
          padding: 6px 16px;
          transition: all 0.3s ease;
        }

        .chatbot-link:hover {
          background: linear-gradient(135deg, rgba(0,212,255,0.3), rgba(0,201,167,0.2));
          box-shadow: 0 0 10px rgba(0,212,255,0.3);
          transform: translateY(-2px);
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          color: #00d4ff;
          font-size: 28px;
          cursor: pointer;
          z-index: 2100;
        }

        /* التصميم المتجاوب (Responsive) */
        @media (max-width: 992px) {
          .menu-toggle {
            display: block;
          }

          .navbar-nav {
            position: fixed;
            top: 0;
            right: -100%;
            width: 70%;
            height: 100vh;
            background: rgba(4, 6, 15, 0.98);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 30px;
            box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
          }

          .navbar-nav.active {
            right: 0;
          }

          .nav-link-item {
            font-size: 20px;
          }
        }
      `}</style>
    </>
  );
}