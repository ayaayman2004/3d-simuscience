import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="modern-footer">
      <style>{`
        .modern-footer {
          background: rgba(10, 30, 55, 0.65);
          backdrop-filter: blur(12px);
          padding: 30px 20px 20px;
          color: #eef4ff;
          position: relative;
          border-top: 1px solid rgba(0, 180, 255, 0.35);
          margin-top: 0;
        }

        .modern-footer::before {
          display: none;
        }

        .footer-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 20px;
          position: relative;
          z-index: 2;
        }

        .footer-section h3, .footer-section h4 {
          color: #00d4ff;
          margin-bottom: 15px;
          font-size: 1.1rem;
          letter-spacing: 0.5px;
          text-shadow: 0 0 4px rgba(0,212,255,0.2);
        }

        .footer-section p {
          color: #c0dcff;
          line-height: 1.5;
          font-size: 0.85rem;
          margin: 5px 0;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 8px;
        }

        .footer-links a {
          color: #c0dcff;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-block;
          font-size: 0.85rem;
          position: relative;
        }

        .footer-links a:hover {
          color: #00d4ff;
          transform: translateX(5px);
          text-shadow: 0 0 6px rgba(0,212,255,0.3);
        }

        .social-icons {
          display: flex;
          gap: 12px;
          margin-top: 12px;
          flex-wrap: wrap;
        }

        .social-icon {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(0, 212, 255, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #eef4ff;
          font-size: 1rem;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .social-icon:hover {
          background: #00d4ff;
          color: #0a1e30;
          transform: translateY(-3px) rotate(360deg);
          box-shadow: 0 0 18px rgba(0, 212, 255, 0.6);
          border-color: #00d4ff;
        }

        .footer-bottom {
          margin-top: 25px;
          padding-top: 15px;
          border-top: 1px solid rgba(0, 212, 255, 0.2);
          text-align: center;
          font-size: 0.75rem;
          color: #8aaee0;
        }

        @media (max-width: 768px) {
          .modern-footer {
            padding: 20px 15px 15px;
          }
          .footer-grid {
            gap: 15px;
            text-align: center;
          }
          .social-icons {
            justify-content: center;
          }
          .footer-links a:hover {
            transform: scale(1.05) translateX(0);
          }
        }
      `}</style>

      <div className="footer-grid">
        <div className="footer-section">
          <h3>🧪 3D-Simuscience</h3>
          <p>
            The future of science education. Safe, interactive, and immersive
            3D chemical reactions at your fingertips.
          </p>
          <div className="social-icons">
            <a href="#" className="social-icon" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" className="social-icon" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" className="social-icon" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" className="social-icon" aria-label="Github"><FaGithub /></a>
            <a href="#" className="social-icon" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Navigation</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/LabScene">Virtual Lab</Link></li>
            <li><Link to="/ChemicalTools">Lab Tools</Link></li>
            <li><Link to="/Review">Feedback</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul className="footer-links">
            <li><Link to="/help">Help Center</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: aya.ayman@simulab.edu</p>
          <p>Cairo, Egypt</p>
          <p style={{ marginTop: "8px", color: "#00d4ff", fontSize: "0.75rem" }}>
            Available 24/7 for support
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 3D-Simuscience | Designed with ❤️ for Science Students</p>
      </div>
    </footer>
  );
}