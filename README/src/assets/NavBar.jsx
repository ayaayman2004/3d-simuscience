import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "./logo.png";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("groq_api_key");
    setUser(null);
    setShowDropdown(false);
    navigate("/");
    closeMenu();
  };

  const getInitial = () => {
    if (!user || !user.name) return "?";
    return user.name.charAt(0).toUpperCase();
  };

  return (
    <>
      <nav className="custom-navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <Link to="/" onClick={closeMenu}>
              <img src={logo} alt="Logo" className="lo1" />
            </Link>
          </div>

          <button className="menu-toggle" onClick={toggleMenu}>
            {isOpen ? "✕" : "☰"}
          </button>

          <ul className={`navbar-nav ${isOpen ? "active" : ""}`}>
            <li><Link className="nav-link-item" to="/" onClick={closeMenu}>Home</Link></li>
            {!user && (
              <>
                <li><Link className="nav-link-item" to="/Register" onClick={closeMenu}>Register</Link></li>
                <li><Link className="nav-link-item" to="/Login" onClick={closeMenu}>Login</Link></li>
              </>
            )}
            <li><Link className="nav-link-item" to="/Review" onClick={closeMenu}>Review</Link></li>
            <li><Link className="nav-link-item" to="/ChemicalTools" onClick={closeMenu}>Chemical Tools</Link></li>
            <li>
              <Link className="nav-link-item chatbot-link" to="/ChatBot" onClick={closeMenu}>
                ⚗️ ChemBot
              </Link>
            </li>
          </ul>

          {user && (
            <div className="user-avatar-wrapper" ref={dropdownRef}>
              <div
                className="user-avatar"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {getInitial()}
              </div>
              {showDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-email">{user.email}</div>
                  <button className="dropdown-item logout-btn" onClick={handleLogout}>
                    🚪 تسجيل الخروج
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      <style>{`
        .custom-navbar {
          width: 100%;
          background: rgba(10, 30, 55, 0.7);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(0, 180, 255, 0.25);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
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
          filter: drop-shadow(0 0 6px rgba(0,212,255,0.2));
        }
        .navbar-nav {
          display: flex;
          list-style: none;
          gap: 24px;
          margin: 0;
          padding: 0;
          align-items: center;
          transition: all 0.4s ease;
        }
        .nav-link-item {
          color: #eef4ff;
          text-decoration: none;
          font-weight: 500;
          font-size: 15px;
          transition: color 0.3s ease, text-shadow 0.2s;
          position: relative;
        }
        .nav-link-item:hover {
          color: #00d4ff;
          text-shadow: 0 0 6px rgba(0,212,255,0.4);
        }
        .chatbot-link {
          background: linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,201,167,0.1));
          border: 1px solid rgba(0,212,255,0.5);
          border-radius: 30px;
          padding: 6px 16px;
          transition: all 0.3s ease;
        }
        .chatbot-link:hover {
          background: linear-gradient(135deg, rgba(0,212,255,0.3), rgba(0,201,167,0.2));
          box-shadow: 0 0 12px rgba(0,212,255,0.4);
          transform: translateY(-2px);
          border-color: #00d4ff;
        }
        .user-avatar-wrapper {
          margin-left: 20px;
          position: relative;
        }
        .user-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00d4ff, #7b2ff7);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: bold;
          color: white;
          cursor: pointer;
          transition: 0.2s;
          box-shadow: 0 0 10px rgba(0,212,255,0.4);
        }
        .user-avatar:hover {
          transform: scale(1.05);
          box-shadow: 0 0 18px rgba(0,212,255,0.7);
        }
        .dropdown-menu {
          position: absolute;
          top: 48px;
          right: 0;
          background: rgba(10, 25, 45, 0.95);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0,212,255,0.4);
          border-radius: 12px;
          padding: 8px 0;
          min-width: 180px;
          z-index: 2100;
          animation: fadeIn 0.2s ease;
        }
        .dropdown-email {
          padding: 8px 16px;
          color: #b8d0ff;
          font-size: 12px;
          border-bottom: 1px solid rgba(0,212,255,0.3);
          text-align: center;
          word-break: break-all;
        }
        .dropdown-item {
          display: block;
          padding: 8px 16px;
          color: #eef4ff;
          text-decoration: none;
          font-size: 14px;
          transition: 0.2s;
          white-space: nowrap;
          text-align: center;
        }
        .dropdown-item:hover {
          background: rgba(0,212,255,0.2);
          color: #00d4ff;
        }
        .logout-btn {
          background: none;
          border: none;
          width: 100%;
          cursor: pointer;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
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
        @media (max-width: 992px) {
          .menu-toggle {
            display: block;
          }
          .navbar-container {
            flex-wrap: wrap;
          }
          .navbar-nav {
            position: fixed;
            top: 0;
            right: -100%;
            width: 70%;
            height: 100vh;
            background: rgba(6, 15, 30, 0.96);
            backdrop-filter: blur(20px);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 30px;
            box-shadow: -10px 0 30px rgba(0,0,0,0.5);
            transition: right 0.3s ease;
          }
          .navbar-nav.active {
            right: 0;
          }
          .user-avatar-wrapper {
            margin-left: 0;
            position: absolute;
            top: 12px;
            right: 70px;
          }
          .dropdown-menu {
            right: 0;
          }
        }
      `}</style>
    </>
  );
}