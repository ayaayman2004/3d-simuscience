import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="chem-footer">
      <div className="footer-container">

        {/* About */}
        <div className="footer-section">
          <h3>🧪 Chemistry Lab</h3>
          <p>
            An interactive virtual chemistry lab where students can explore
            reactions, compounds, and chemical properties safely.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/LabScene">Virtual Lab</Link></li>
            <li><Link to="/elements">Elements</Link></li>
            <li><Link to="/literature">Literature</Link></li>
          </ul>
        </div>

        {/* Account */}
        <div className="footer-section">
          <h4>Account</h4>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/userprofile">User Profile</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: chem.lab@edu.com</p>
          <p>Faculty of Science</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Chemistry Lab | All Rights Reserved</p>
      </div>
    </footer>
  );
}
