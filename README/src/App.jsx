import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";

import NavBar from "./assets/NavBar";
import Footer from "./assets/Footer";
import PageLoader from "./Components/PageLoader";

import Home from "./Home";
import Lab from "./assets/Lab";
import Elements from "./assets/Elements";
import Login from "./assets/Login";
import Register from "./assets/Register";
import UserProfile from "./assets/UserProfile";
import ChemistryLab from "./assets/chemistryLab";
import ChemicalTools from "./assets/ChemicalTools";
import Review from "./assets/Review";
import UserDashboard from "./assets/UserDashbord";
import compination from "./assets/compination";
import LabScene from "./Components/LabScene";
import ExperimentsHistory from "./Components/ExperimentsHistory";
import ChatBot from "./Components/ChatBot";

// Experiments Pages
import OxidationReduction from "./assets/Oxide";
import Addition from "./assets/Addition";
import Catalytic from "./assets/Catalytic";
import Compustionofhydro from "./assets/Compustionofhydro";
import Condinsation from "./assets/Condinsation";
import Cumbustion from "./assets/Cumbustion";
import Decomposition from "./assets/Decomposition";
import Disproportionation from "./assets/Disproportionation";
import DoubleReplacment from "./assets/DoubleReplacment";
import Hydrolysis from "./assets/Hydrolysis";
import Neutrlization from "./assets/Neutrlization";
import Redox from "./assets/Redox";
import SingleReplacement from "./assets/SingleReplacement";
import PhotoChemical from "./assets/photochmical";
import Precipitation from "./assets/preceptition";
import Polymerization from "./assets/polymerization";
import AcideBasereaction from "./assets/AcideBasereaction";
import Combination from "./assets/compination";
import Electrolysis from "./assets/Electrolysis";
import Substiution from "./assets/Substiution";
import ReactionCatalog from "./Components/reactionCatalog";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

/* ──────────────────────────────────────────────────
   GLOBAL BACKGROUND TRANSPARENCY RESET
────────────────────────────────────────────────── */
const GLOBAL_TRANSPARENT_CSS = `
  html, body {
    background: transparent !important;
  }
  .home-dark,
  .lab-page,
  .login-page,
  .register-page,
  .profile-page,
  .review-page,
  .tools-page,
  .history-page,
  .catalog-page,
  .experiment-page,
  .dashboard-page,
  .page-wrapper,
  .page-container,
  .main-content,
  [class$="-page"],
  [class$="-container"],
  [class$="-wrapper"] {
    background: transparent !important;
    background-color: transparent !important;
  }
  section:not([class*="hero"]):not([class*="video"]) {
    background: transparent !important;
    background-color: transparent !important;
  }
`;

/* ──────────────────────────────────────────────────
   ANIMATED KOHLI GRADIENT + MOVING ORBS/PARTICLES
────────────────────────────────────────────────── */
const ORBS = [
  { size: 520, x: 12, y: 8,  color: "rgba(10,42,74,0.25)",  dur: 18, delay: 0   },
  { size: 380, x: 72, y: 15, color: "rgba(30,58,138,0.25)", dur: 22, delay: -4  },
  { size: 280, x: 40, y: 55, color: "rgba(0,212,255,0.2)",  dur: 15, delay: -8  },
  { size: 440, x: 85, y: 55, color: "rgba(139,92,246,0.2)", dur: 25, delay: -12 },
  { size: 200, x: 20, y: 80, color: "rgba(16,185,129,0.15)",dur: 12, delay: -6  },
  { size: 320, x: 60, y: 85, color: "rgba(0,100,200,0.22)", dur: 20, delay: -2  },
  { size: 180, x: 90, y: 10, color: "rgba(59,130,246,0.22)",dur: 14, delay: -9  },
  { size: 260, x: 5,  y: 45, color: "rgba(123,47,247,0.2)", dur: 17, delay: -3  },
];

const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: (i * 13 + 7) % 96,
  size: 2 + (i % 4),
  dur: 5 + (i % 8),
  delay: (i * 0.35) % 8,
  opacity: 0.2 + (i % 5) * 0.1,
  color: i % 4 === 0 ? "#00d4ff" : i % 4 === 1 ? "#3b82f6" : i % 4 === 2 ? "#8b5cf6" : "#1e3a8a",
}));

function AnimatedBackground() {
  return (
    <>
      <div style={{
        position: "fixed", inset: 0, zIndex: -10,
        background: "linear-gradient(135deg, #0a2a4a, #0a1c3a, #1a2a5e, #0a1025, #1e1b4b)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 18s ease infinite",
      }} />

      <div style={{
        position: "fixed", inset: 0, zIndex: -9,
        backgroundImage: `
          linear-gradient(rgba(64, 128, 255, 0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(64, 128, 255, 0.07) 1px, transparent 1px)
        `,
        backgroundSize: "70px 70px",
        animation: "bgGridMove 20s linear infinite",
        maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 100%)",
      }} />

      <div style={{ position: "fixed", inset: 0, zIndex: -8, overflow: "hidden", pointerEvents: "none" }}>
        {ORBS.map((orb, i) => (
          <div key={i} style={{
            position: "absolute",
            width:  orb.size,
            height: orb.size,
            left:  `calc(${orb.x}% - ${orb.size / 2}px)`,
            top:   `calc(${orb.y}% - ${orb.size / 2}px)`,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: "blur(50px)",
            animation: `orbDrift${i % 4} ${orb.dur}s ease-in-out infinite`,
            animationDelay: `${orb.delay}s`,
          }} />
        ))}
      </div>

      <div style={{ position: "fixed", inset: 0, zIndex: -7, overflow: "hidden", pointerEvents: "none" }}>
        {PARTICLES.map((p) => (
          <div key={p.id} style={{
            position: "absolute",
            left: `${p.x}%`,
            bottom: "-10px",
            width:  p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.color,
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animation: `particleRise ${p.dur}s ease-in infinite`,
            animationDelay: `${p.delay}s`,
          }} />
        ))}
      </div>

      <div style={{ position: "fixed", inset: 0, zIndex: -7, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: 0, left: 0, width: 280, height: 280,
          background: "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, transparent 70%)",
          borderRight: "1px solid rgba(59,130,246,0.15)",
          borderBottom: "1px solid rgba(59,130,246,0.15)",
        }} />
        <div style={{
          position: "absolute", bottom: 0, right: 0, width: 280, height: 280,
          background: "linear-gradient(315deg, rgba(139,92,246,0.1) 0%, transparent 70%)",
          borderLeft: "1px solid rgba(139,92,246,0.15)",
          borderTop: "1px solid rgba(139,92,246,0.15)",
        }} />
      </div>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 0%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 50% 100%; }
          75% { background-position: 0% 50%; }
          100% { background-position: 0% 0%; }
        }
        @keyframes bgGridMove {
          0%   { background-position: 0 0; }
          100% { background-position: 70px 70px; }
        }
        @keyframes particleRise {
          0%   { transform: translateY(0px) scale(1); opacity: 0.2; }
          50%  { transform: translateY(-50vh) scale(1.4); opacity: 0.7; }
          100% { transform: translateY(-105vh) scale(0.6); opacity: 0; }
        }
        @keyframes orbDrift0 {
          0%,100% { transform: translate(0,0); }
          33%     { transform: translate(35px, -25px); }
          66%     { transform: translate(-20px, 30px); }
        }
        @keyframes orbDrift1 {
          0%,100% { transform: translate(0,0); }
          33%     { transform: translate(-30px, 35px); }
          66%     { transform: translate(25px, -20px); }
        }
        @keyframes orbDrift2 {
          0%,100% { transform: translate(0,0); }
          50%     { transform: translate(40px, 30px); }
        }
        @keyframes orbDrift3 {
          0%,100% { transform: translate(0,0); }
          50%     { transform: translate(-35px, -35px); }
        }
      `}</style>
    </>
  );
}

/* ──────────────────────────────────────────────────
   SCROLL TO TOP & LOADER
────────────────────────────────────────────────── */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function WithLoader({ children }) {
  const { pathname } = useLocation();
  return <PageLoader key={pathname}>{children}</PageLoader>;
}

/* ──────────────────────────────────────────────────
   MAIN APP
────────────────────────────────────────────────── */
function App() {
  const [theme, setTheme]       = useState("light");
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    document.body.className = theme;
    document.body.dir = language === "ar" ? "rtl" : "ltr";
    document.body.style.background    = "transparent";
    document.documentElement.style.background = "transparent";
  }, [theme, language]);

  return (
    <Router>
      <style>{GLOBAL_TRANSPARENT_CSS}</style>
      <AnimatedBackground />
      <ScrollToTop />
      <NavBar theme={theme} setTheme={setTheme} language={language} setLanguage={setLanguage} />
      <div style={{ margin: 0, padding: 0, position: "relative", zIndex: 1 }}>
        <Routes>
          <Route path="/"                     element={<WithLoader><Home /></WithLoader>} />
          <Route path="/LabScene"             element={<WithLoader><div className="lab-page"><LabScene /></div></WithLoader>} />
          <Route path="/ExperimentsHistory"   element={<WithLoader><ExperimentsHistory /></WithLoader>} />
          <Route path="/login"                element={<WithLoader><Login /></WithLoader>} />
          <Route path="/register"             element={<WithLoader><Register /></WithLoader>} />
          <Route path="/userprofile"          element={<WithLoader><UserProfile /></WithLoader>} />
          <Route path="/review"               element={<WithLoader><Review /></WithLoader>} />
          <Route path="/ChemicalTools"        element={<WithLoader><ChemicalTools /></WithLoader>} />
          <Route path="/oxidation-reduction"  element={<WithLoader><OxidationReduction /></WithLoader>} />
          <Route path="/Addition"             element={<WithLoader><Addition /></WithLoader>} />
          <Route path="/Catalytic"            element={<WithLoader><Catalytic /></WithLoader>} />
          <Route path="/Compustionofhydro"    element={<WithLoader><Compustionofhydro /></WithLoader>} />
          <Route path="/Condinsation"         element={<WithLoader><Condinsation /></WithLoader>} />
          <Route path="/Cumbustion"           element={<WithLoader><Cumbustion /></WithLoader>} />
          <Route path="/Decomposition"        element={<WithLoader><Decomposition /></WithLoader>} />
          <Route path="/Disproportionation"   element={<WithLoader><Disproportionation /></WithLoader>} />
          <Route path="/DoubleReplacment"     element={<WithLoader><DoubleReplacment /></WithLoader>} />
          <Route path="/Hydrolysis"           element={<WithLoader><Hydrolysis /></WithLoader>} />
          <Route path="/Neutrlization"        element={<WithLoader><Neutrlization /></WithLoader>} />
          <Route path="/Redox"                element={<WithLoader><Redox /></WithLoader>} />
          <Route path="/SingleReplacement"    element={<WithLoader><SingleReplacement /></WithLoader>} />
          <Route path="/photochmical"         element={<WithLoader><PhotoChemical /></WithLoader>} />
          <Route path="/preceptition"         element={<WithLoader><Precipitation /></WithLoader>} />
          <Route path="/polymerization"       element={<WithLoader><Polymerization /></WithLoader>} />
          <Route path="/AcideBasereaction"    element={<WithLoader><AcideBasereaction /></WithLoader>} />
          <Route path="/Electrolysis"         element={<WithLoader><Electrolysis /></WithLoader>} />
          <Route path="/Substiution"          element={<WithLoader><Substiution /></WithLoader>} />
          <Route path="/catalog"              element={<WithLoader><ReactionCatalog /></WithLoader>} />
          <Route path="/compination"          element={<WithLoader><compination /></WithLoader>} />
          <Route path="/ChatBot"              element={<WithLoader><ChatBot /></WithLoader>} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
