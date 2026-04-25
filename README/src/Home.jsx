import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PageLoader from "./Components/PageLoader";

import video2 from "./assets/img2.mp4";
import oxidationVideo from "./assets/oxidation.mp4";
import additionVideo from "./assets/Addition.mp4";
import catalyticVideo from "./assets/Catalystic.mp4";
import compositionVideo from "./assets/Compustionofhydro.mp4";
import condensationVideo from "./assets/condinsation.mp4";
import combustionVideo from "./assets/Combu.mp4";
import decompositionVideo from "./assets/decomposition.mp4";
import disproportionationVideo from "./assets/desproparation.mp4";
import doubleReplacementVideo from "./assets/doubledisplacement.mp4";
import hydrolysisVideo from "./assets/hydro.mp4";
import neutralizationVideo from "./assets/neutrilization.mp4";
import redoxVideo from "./assets/redox.mp4";
import singleReplacementVideo from "./assets/singlereplacement.mp4";
import photochemicalVideo from "./assets/photochemical.mp4";
import precipitationVideo from "./assets/preception.mp4";
import polymerizationVideo from "./assets/polymeriation.mp4";

/* ── hook: IntersectionObserver ── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── عداد الأرقام ── */
function Counter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal(0.3);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = end / (duration / 16);
    const t = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(t);
      } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(t);
  }, [visible, end, duration]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ── 3D Tilt Card ── */
function TiltCard({ children, className, style, onClick }) {
  const cardRef = useRef(null);
  const handleMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -8;
    const rotY = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px) scale(1.02)`;
    card.style.boxShadow = `${-rotY * 2}px ${rotX * 2}px 30px rgba(0,212,255,0.25)`;
  }, []);
  const handleLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      "perspective(800px) rotateX(0) rotateY(0) translateY(0) scale(1)";
    card.style.boxShadow = "";
  }, []);
  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        ...style,
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

/* ── Magnetic Button ── */
function MagneticBtn({ children, className, onClick }) {
  const btnRef = useRef(null);
  const handleMove = useCallback((e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  }, []);
  const handleLeave = useCallback(() => {
    const btn = btnRef.current;
    if (btn) btn.style.transform = "translate(0,0)";
  }, []);
  return (
    <button
      ref={btnRef}
      className={className}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: "transform 0.3s cubic-bezier(.23,1,.32,1)" }}
    >
      {children}
    </button>
  );
}

const EXPERIMENTS = [
  {
    video: oxidationVideo,
    title: "Oxidation-Reduction",
    desc: "Simultaneous oxidation and reduction.",
    route: "/oxidation-reduction",
  },
  {
    video: additionVideo,
    title: "Addition Reaction",
    desc: "Reactants combine to a single product.",
    route: "/Addition",
  },
  {
    video: catalyticVideo,
    title: "Catalytic Reaction",
    desc: "Accelerated by catalyst without loss.",
    route: "/Catalytic",
  },
  {
    video: compositionVideo,
    title: "Combustion of Hydrocarbons",
    desc: "Hydrocarbon + O₂ → heat & light.",
    route: "/Compustionofhydro",
  },
  {
    video: condensationVideo,
    title: "Condensation Reaction",
    desc: "Two molecules join, releasing water.",
    route: "/Condinsation",
  },
  {
    video: combustionVideo,
    title: "Combustion",
    desc: "Substance + O₂ → heat & light.",
    route: "/Cumbustion",
  },
  {
    video: decompositionVideo,
    title: "Decomposition",
    desc: "Compound breaks into simpler substances.",
    route: "/Decomposition",
  },
  {
    video: disproportionationVideo,
    title: "Disproportionation",
    desc: "Element simultaneously oxidized & reduced.",
    route: "/Disproportionation",
  },
  {
    video: doubleReplacementVideo,
    title: "Double Replacement",
    desc: "Ion exchange between two compounds.",
    route: "/DoubleReplacment",
  },
  {
    video: hydrolysisVideo,
    title: "Hydrolysis",
    desc: "Water breaks chemical bonds.",
    route: "/Hydrolysis",
  },
  {
    video: neutralizationVideo,
    title: "Neutralization",
    desc: "Acid + base → salt + water.",
    route: "/Neutrlization",
  },
  {
    video: redoxVideo,
    title: "Redox Reaction",
    desc: "Electron transfer between substances.",
    route: "/Redox",
  },
  {
    video: singleReplacementVideo,
    title: "Single Replacement",
    desc: "Element replaces another in compound.",
    route: "/SingleReplacement",
  },
  {
    video: photochemicalVideo,
    title: "Photochemical Reaction",
    desc: "Reaction initiated by light energy.",
    route: "/photochmical",
  },
  {
    video: precipitationVideo,
    title: "Precipitation Reaction",
    desc: "Insoluble solid from two solutions.",
    route: "/preceptition",
  },
  {
    video: polymerizationVideo,
    title: "Polymerization",
    desc: "Monomers join to form a polymer chain.",
    route: "/polymerization",
  },
];

const REACTION_TYPES = [
  {
    icon: "⚡",
    title: "Combination",
    desc: "Two or more substances combine into one product.",
  },
  {
    icon: "💥",
    title: "Decomposition",
    desc: "Single compound breaks into simpler substances.",
  },
  {
    icon: "🔄",
    title: "Single Replace",
    desc: "An element replaces another in a compound.",
  },
  {
    icon: "↔️",
    title: "Double Replace",
    desc: "Exchange of ions between two compounds.",
  },
  {
    icon: "🔥",
    title: "Combustion",
    desc: "Reaction with oxygen releasing energy as heat & light.",
  },
  {
    icon: "⚗️",
    title: "Redox",
    desc: "Transfer of electrons between reactants.",
  },
];

// ─── NEW SECTION DATA (Pioneers + Advanced Features + Cinematic) ───
const PIONEERS = [
  { name: "Antoine Lavoisier", contribution: "Father of modern chemistry", icon: "🧪", era: "1743–1794" },
  { name: "Dmitri Mendeleev", contribution: "Periodic table", icon: "📊", era: "1834–1907" },
  { name: "Marie Curie", contribution: "Radioactivity & elements", icon: "☢️", era: "1867–1934" },
  { name: "Linus Pauling", contribution: "Chemical bond & quantum chemistry", icon: "⚛️", era: "1901–1994" },
];

const FEATURES_ADVANCED = [
  { icon: "🧠", title: "AI Predictions", desc: "Real-time reaction outcome forecasting" },
  { icon: "📊", title: "Smart Analytics", desc: "Track your experiment history & progress" },
  { icon: "🌍", title: "Multi-language", desc: "English / Arabic interface" },
  { icon: "🎮", title: "Gamified Learning", desc: "Earn badges & level up your chemistry skills" },
];

export default function Home() {
  const navigate = useNavigate();
  const mouseGlowRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [scrollPct, setScrollPct] = useState(0);
  const heroWords = ["Chemistry", "Science", "Discovery"];
  const [wordIdx, setWordIdx] = useState(0);

  /* ── Mouse glow ── */
  useEffect(() => {
    const move = (e) => {
      if (mouseGlowRef.current) {
        mouseGlowRef.current.style.left = e.clientX + "px";
        mouseGlowRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* ── Scroll progress + parallax ── */
  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Word cycling for hero ── */
  useEffect(() => {
    const t = setInterval(() => setWordIdx((w) => (w + 1) % heroWords.length), 2800);
    return () => clearInterval(t);
  }, []);

  const goToLab = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      const hasAccount = window.confirm(
        "You are not logged in. Do you already have an account?"
      );
      if (hasAccount) navigate("/login", { state: { redirectToLab: true } });
      else navigate("/register", { state: { redirectToLab: true } });
    } else {
      navigate("/LabScene");
    }
  };

  const [heroRef, heroVis] = useReveal(0.1);
  const [aboutRef, aboutVis] = useReveal(0.15);
  const [statsRef, statsVis] = useReveal(0.2);
  const [typesRef, typesVis] = useReveal(0.1);
  const [expRef, expVis] = useReveal(0.05);
  const [ctaRef, ctaVis] = useReveal(0.2);
  // New section refs
  const [pioneersRef, pioneersVis] = useReveal(0.1);
  const [featuresRef, featuresVis] = useReveal(0.1);
  const [cinemaRef, cinemaVis] = useReveal(0.1);

  return (
    <PageLoader label="Loading Laboratory…">
      {/* ── Scroll progress bar ── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 10000,
          height: 3,
          width: `${scrollPct}%`,
          background: "linear-gradient(90deg, #00d4ff, #7b2ff7, #00d4ff)",
          backgroundSize: "200% 100%",
          animation: "gradShift 2s linear infinite",
          transition: "width 0.1s linear",
          boxShadow: "0 0 10px #00d4ff",
        }}
      />

      {/* ── Mouse glow cursor ── */}
      <div
        ref={mouseGlowRef}
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9998,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          transition: "left 0.08s ease, top 0.08s ease",
        }}
      />

      <div className="home-dark">
        {/* ══════════════════ HERO ══════════════════ */}
        <section className="hd-hero" style={{ overflow: "hidden" }}>
          <video
            className="hd-hero-video"
            src={video2}
            autoPlay
            loop
            muted
            playsInline
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
              transition: "transform 0s",
            }}
          />
          <div className="hd-hero-overlay" />

          {/* Enhanced particles */}
          <div className="hd-particles">
            {Array.from({ length: 25 }).map((_, i) => (
              <span
                key={i}
                className="hd-particle"
                style={{
                  left: `${(i * 4 + 3) % 98}%`,
                  animationDelay: `${(i * 0.35) % 6}s`,
                  animationDuration: `${5 + (i % 5)}s`,
                  width: `${3 + (i % 4) * 2}px`,
                  height: `${3 + (i % 4) * 2}px`,
                  opacity: 0.4 + (i % 3) * 0.2,
                }}
              />
            ))}
          </div>

          {/* Animated grid lines */}
          <div className="hero-grid-lines" />

          <div ref={heroRef} className={`hd-hero-content ${heroVis ? "reveal" : ""}`}>
            <div className="hd-hero-badge animate-badge">⚗️ Virtual Chemistry Lab</div>

            <h1 className="hd-hero-title hero-split-title">
              <span className="hero-word-line">Explore the World of</span>
              <br />
              <span className="hd-gradient-text hero-cycling-word" key={wordIdx}>
                {heroWords[wordIdx]}
              </span>
              <br />
              <span className="hero-word-line hero-word-delay">in 3D</span>
            </h1>

            <p className="hd-hero-sub hero-sub-reveal">
              Mix compounds and discover results in real-time —<br />
              a hands-on lab experience without the hazards.
            </p>

            <div className="hd-hero-actions">
              <MagneticBtn className="hd-btn-primary btn-glow-pulse" onClick={goToLab}>
                🚀 Enter the Lab
              </MagneticBtn>
              <MagneticBtn
                className="hd-btn-ghost"
                onClick={() =>
                  document.getElementById("experiments").scrollIntoView({ behavior: "smooth" })
                }
              >
                View Experiments ↓
              </MagneticBtn>
            </div>
          </div>
          <div className="hd-scroll-hint">
            <span />
          </div>
        </section>

        {/* ══════════════════ STATS ══════════════════ */}
        <section className="hd-stats" ref={statsRef}>
          {[
            { value: 7000, suffix: "+", label: "Reactions Simulated" },
            { value: 225, suffix: "+", label: "Unique Compounds" },
            { value: 16, suffix: "", label: "Experiment Types" },
            { value: 100, suffix: "%", label: "Safe Environment" },
          ].map((s, i) => (
            <TiltCard
              key={i}
              className={`hd-stat-card ${statsVis ? "reveal" : ""}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="hd-stat-num">
                {statsVis ? <Counter end={s.value} suffix={s.suffix} /> : `0${s.suffix}`}
              </div>
              <div className="hd-stat-label">{s.label}</div>
              <div className="stat-card-shine" />
            </TiltCard>
          ))}
        </section>

        {/* ══════════════════ ABOUT ══════════════════ */}
        <section className="hd-about" ref={aboutRef}>
          <div className={`hd-about-text ${aboutVis ? "reveal" : ""}`}>
            <div className="hd-section-tag">About the Platform</div>
            <h2 className="hd-section-title">
              What is <span className="hd-gradient-text">Simuscience?</span>
            </h2>
            <p className="hd-about-desc">
              Simuscience is an interactive 3D virtual chemistry lab built for students and
              educators.
            </p>
            <ul className="hd-feature-list">
              {[
                "🎨 Real compound colors & states",
                "🤖 AI-powered reaction prediction",
                "🧪 225+ chemical compounds",
                "🔬 Interactive 3D beaker simulation",
              ].map((f, i) => (
                <li key={i} className="hd-feature-item" style={{ animationDelay: `${i * 0.1}s` }}>
                  {f}
                </li>
              ))}
            </ul>
            <MagneticBtn className="hd-btn-primary" onClick={goToLab}>
              Start Experimenting →
            </MagneticBtn>
          </div>
          <div className={`hd-about-visual ${aboutVis ? "reveal-right" : ""}`}>
            <div className="hd-beaker-card beaker-float">
              <div className="hd-beaker-icon">⚗️</div>
              <div className="hd-beaker-lines">
                {["Fe + O₂ → Fe₂O₃", "H₂ + Cl₂ → 2HCl", "NaOH + HCl → NaCl + H₂O"].map(
                  (eq, i) => (
                    <div key={i} className="hd-beaker-eq" style={{ animationDelay: `${i * 0.6}s` }}>
                      {eq}
                    </div>
                  )
                )}
              </div>
              <div className="hd-beaker-glow" />
              <div className="beaker-orbit">
                {["H", "O", "C", "N"].map((el, i) => (
                  <span key={i} className="orbit-atom" style={{ animationDelay: `${i * 0.5}s` }}>
                    {el}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════ REACTION TYPES ══════════════════ */}
        <section className="hd-types" ref={typesRef}>
          <div className="hd-section-header">
            <div className="hd-section-tag">Reaction Types</div>
            <h2 className="hd-section-title">6 Core Reaction Categories</h2>
          </div>
          <div className="hd-types-grid">
            {REACTION_TYPES.map((rt, i) => (
              <TiltCard
                key={i}
                className={`hd-type-card type-card-enhanced ${typesVis ? "reveal" : ""}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="type-card-bg-glow" />
                <span className="hd-type-icon type-icon-animated">{rt.icon}</span>
                <h3 className="hd-type-title">{rt.title}</h3>
                <p className="hd-type-desc">{rt.desc}</p>
                <div className="hd-type-line type-line-animated" />
              </TiltCard>
            ))}
          </div>
        </section>

        {/* ══════════════════ EXPERIMENTS (Infinite Auto-Scroll) ══════════════════ */}
        <section className="hd-experiments-infinite" id="experiments" ref={expRef}>
          <div className="hd-section-header">
            <div className="hd-section-tag">Lab Experiments</div>
            <h2 className="hd-section-title">Our Interactive Experiments</h2>
          </div>

          <div className="infinite-slider-container">
            {/* Fade edges */}
            <div className="slider-fade-left" />
            <div className="slider-fade-right" />
            <div className="infinite-slider-track">
              {[...EXPERIMENTS, ...EXPERIMENTS].map((exp, i) => (
                <div key={i} className="exp-infinite-card" onClick={() => navigate(exp.route)}>
                  <video src={exp.video} autoPlay loop muted playsInline />
                  <div className="exp-infinite-overlay">
                    <div className="exp-infinite-num">{i % EXPERIMENTS.length + 1}</div>
                    <h3 className="exp-infinite-title">{exp.title}</h3>
                    <p className="exp-infinite-desc">{exp.desc}</p>
                    <div className="exp-card-btn">Explore →</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ────────────── NEW SECTION 1 : PIONEERS (Creative Cards) ────────────── */}
        <section className="hd-pioneers" ref={pioneersRef}>
          <div className="hd-section-header">
            <div className="hd-section-tag">Chemistry Heroes</div>
            <h2 className="hd-section-title">Pioneers Who Shaped Science</h2>
          </div>
          <div className="pioneers-grid">
            {PIONEERS.map((p, idx) => {
              const [cardRef, cardVis] = useReveal(0.2);
              return (
                <div
                  key={idx}
                  ref={cardRef}
                  className={`pioneer-card ${cardVis ? "pioneer-reveal" : ""}`}
                  style={{ transitionDelay: `${idx * 0.1}s` }}
                >
                  <div className="pioneer-icon">{p.icon}</div>
                  <h3 className="pioneer-name">{p.name}</h3>
                  <p className="pioneer-contribution">{p.contribution}</p>
                  <div className="pioneer-era">{p.era}</div>
                  <div className="pioneer-glow" />
                </div>
              );
            })}
          </div>
        </section>

        {/* ────────────── NEW SECTION 2 : ADVANCED FEATURES (Modern Grid) ────────────── */}
        <section className="hd-advanced-features" ref={featuresRef}>
          <div className="hd-section-header">
            <div className="hd-section-tag">Beyond the Lab</div>
            <h2 className="hd-section-title">Why Choose Simuscience</h2>
          </div>
          <div className="features-advanced-grid">
            {FEATURES_ADVANCED.map((f, idx) => {
              const [featRef, featVis] = useReveal(0.15);
              return (
                <div
                  key={idx}
                  ref={featRef}
                  className={`feature-advanced-card ${featVis ? "feature-reveal" : ""}`}
                  style={{ transitionDelay: `${idx * 0.1}s` }}
                >
                  <div className="feature-icon">{f.icon}</div>
                  <h3 className="feature-title">{f.title}</h3>
                  <p className="feature-desc">{f.desc}</p>
                  <div className="feature-underline"></div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ────────────── NEW SECTION 3 : CINEMATIC EXPERIENCE (Full width video/glow) ────────────── */}
        <section className="hd-cinematic" ref={cinemaRef}>
          <div className={`cinematic-container ${cinemaVis ? "cinema-reveal" : ""}`}>
            <div className="cinematic-backdrop">
              <div className="cinematic-glow-1"></div>
              <div className="cinematic-glow-2"></div>
              <div className="cinematic-glow-3"></div>
            </div>
            <div className="cinematic-content">
              <div className="cinematic-badge">✨ Immersive Experience</div>
              <h2 className="cinematic-title">
                Step Into a <span className="cinematic-gradient">Cinematic Science</span> Journey
              </h2>
              <p className="cinematic-desc">
                Watch reactions unfold in stunning 3D, with real-time particle effects, dynamic lighting, and an immersive environment that makes learning chemistry feel like a blockbuster movie.
              </p>
              <div className="cinematic-features">
                <span>🎬 4K Visuals</span>
                <span>🌀 Real-time Physics</span>
                <span>🔊 3D Spatial Audio</span>
                <span>⚡ Interactive Elements</span>
              </div>
              <MagneticBtn className="hd-btn-primary cinematic-btn" onClick={goToLab}>
                Experience the Lab →
              </MagneticBtn>
            </div>
          </div>
        </section>

        {/* ══════════════════ CTA ══════════════════ */}
        <section className="hd-cta" ref={ctaRef}>
          <div className={`hd-cta-inner cta-enhanced ${ctaVis ? "reveal" : ""}`}>
            <div className="cta-glow-orb cta-orb-1" />
            <div className="cta-glow-orb cta-orb-2" />
            <div className="hd-section-tag" style={{ marginBottom: 16 }}>
              Get Started
            </div>
            <h2 className="hd-cta-title">Ready to Start Experimenting?</h2>
            <p style={{ color: "#88aacc", marginBottom: 32, fontSize: 16 }}>
              Join thousands of students exploring chemistry in a safe, interactive environment.
            </p>
            <MagneticBtn className="hd-btn-primary hd-btn-large btn-glow-pulse" onClick={goToLab}>
              ⚗️ Open Virtual Lab
            </MagneticBtn>
          </div>
        </section>

        {/* ══════════════════ CSS (existing + new sections styles) ══════════════════ */}
        <style>{`
          /* ── RESET GLOBAL MARGINS/PADDINGS TO REMOVE GAP BETWEEN NAVBAR AND HERO ── */
          html, body, #root {
            margin: 0 !important;
            padding: 0 !important;
            scroll-behavior: smooth;
          }
          .home-dark {
            margin-top: 0;
            padding-top: 0;
          }
          .hd-hero {
            margin-top: 0 !important;
            margin-bottom: 0 !important;
            padding-top: 0 !important;
          }
          /* قواعد أخرى موجودة مسبقاً مع إضافة التأثيرات السينمائية إن أردت */
          @keyframes gradShift {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
          }
          .hero-grid-lines {
            position: absolute;
            inset: 0;
            z-index: 1;
            background-image: linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px);
            background-size: 60px 60px;
            animation: gridMove 20s linear infinite;
            mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
          }
          @keyframes gridMove {
            0% { background-position: 0 0; }
            100% { background-position: 60px 60px; }
          }
          .animate-badge {
            animation: badgePop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
            animation-delay: 0.3s;
          }
          @keyframes badgePop {
            0% { opacity: 0; transform: translateY(-20px) scale(0.8); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          .hero-cycling-word {
            display: inline-block;
            animation: wordSwap 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          }
          @keyframes wordSwap {
            0% { opacity: 0; transform: translateY(30px) rotateX(-60deg); }
            100% { opacity: 1; transform: translateY(0) rotateX(0deg); }
          }
          .hero-sub-reveal {
            animation: fadeSlideUp 0.7s ease both;
            animation-delay: 0.8s;
            opacity: 0;
            animation-fill-mode: forwards;
          }
          @keyframes fadeSlideUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .hero-word-line {
            display: inline-block;
            animation: slideInLine 0.6s ease both;
            animation-delay: 0.2s;
          }
          .hero-word-delay {
            animation-delay: 0.9s;
          }
          @keyframes slideInLine {
            0% { opacity: 0; transform: translateX(-30px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          .hd-stat-card {
            position: relative;
            overflow: hidden;
          }
          .stat-card-shine {
            position: absolute;
            top: -50%;
            left: -60%;
            width: 40%;
            height: 200%;
            background: linear-gradient(
              105deg,
              transparent 40%,
              rgba(255, 255, 255, 0.07) 50%,
              transparent 60%
            );
            transform: rotate(15deg);
            transition: left 0.5s ease;
          }
          .hd-stat-card:hover .stat-card-shine {
            left: 120%;
          }
          .type-card-enhanced {
            position: relative;
            overflow: hidden;
            cursor: default;
          }
          .type-card-bg-glow {
            position: absolute;
            inset: 0;
            opacity: 0;
            background: radial-gradient(circle at 50% 0%, rgba(0,212,255,0.12), transparent 70%);
            transition: opacity 0.4s ease;
          }
          .type-card-enhanced:hover .type-card-bg-glow {
            opacity: 1;
          }
          .type-icon-animated {
            display: inline-block;
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          .type-card-enhanced:hover .type-icon-animated {
            transform: scale(1.3) rotate(-5deg);
          }
          .type-line-animated {
            transition: width 0.4s ease, background 0.4s ease;
          }
          .type-card-enhanced:hover .type-line-animated {
            width: 100% !important;
            background: linear-gradient(90deg, #00d4ff, #7b2ff7) !important;
          }
          .btn-glow-pulse {
            animation: btnGlow 2.5s ease-in-out infinite;
          }
          @keyframes btnGlow {
            0%, 100% { box-shadow: 0 0 20px rgba(0,212,255,0.3); }
            50% { box-shadow: 0 0 40px rgba(0,212,255,0.7), 0 0 80px rgba(0,212,255,0.2); }
          }
          .beaker-float {
            animation: floatCard 4s ease-in-out infinite;
          }
          @keyframes floatCard {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
          }
          .beaker-orbit {
            position: absolute;
            inset: 0;
            pointer-events: none;
          }
          .orbit-atom {
            position: absolute;
            font-size: 12px;
            font-weight: 700;
            color: #00d4ff;
            opacity: 0.7;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            border: 1px solid rgba(0,212,255,0.3);
            animation: orbitSpin 8s linear infinite;
          }
          .orbit-atom:nth-child(1) { animation-delay: 0s; top: 10%; left: 5%; }
          .orbit-atom:nth-child(2) { animation-delay: -2s; top: 5%; right: 10%; }
          .orbit-atom:nth-child(3) { animation-delay: -4s; bottom: 15%; left: 8%; }
          .orbit-atom:nth-child(4) { animation-delay: -6s; bottom: 10%; right: 5%; }
          @keyframes orbitSpin {
            0% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
            50% { transform: translateY(-8px) rotate(180deg); opacity: 1; }
            100% { transform: translateY(0) rotate(360deg); opacity: 0.7; }
          }
          .hd-experiments-infinite {
            padding: 80px 0 40px 0;
            overflow: hidden;
            background: #060818;
          }
          .infinite-slider-container {
            width: 100%;
            overflow: hidden;
            position: relative;
            padding: 20px 0;
          }
          .slider-fade-left,
          .slider-fade-right {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 120px;
            z-index: 2;
            pointer-events: none;
          }
          .slider-fade-left {
            left: 0;
            background: linear-gradient(to right, #060818, transparent);
          }
          .slider-fade-right {
            right: 0;
            background: linear-gradient(to left, #060818, transparent);
          }
          .infinite-slider-track {
            display: flex;
            width: calc(320px * ${EXPERIMENTS.length * 2});
            animation: scroll-infinite 50s linear infinite;
          }
          .infinite-slider-container:hover .infinite-slider-track {
            animation-play-state: paused;
          }
          .exp-infinite-card {
            width: 300px;
            height: 200px;
            margin: 0 10px;
            flex-shrink: 0;
            border-radius: 16px;
            overflow: hidden;
            position: relative;
            cursor: pointer;
            border: 1px solid rgba(0,212,255,0.2);
            transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.3s ease;
          }
          .exp-infinite-card:hover {
            transform: translateY(-10px) scale(1.03);
            border-color: #00d4ff;
          }
          .exp-infinite-card video {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .exp-infinite-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 65%);
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 15px;
            color: white;
            opacity: 0.85;
            transition: opacity 0.3s ease;
          }
          .exp-infinite-card:hover .exp-infinite-overlay {
            opacity: 1;
          }
          .exp-infinite-num {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 24px;
            font-weight: 900;
            opacity: 0.2;
            color: #00d4ff;
          }
          .exp-infinite-title {
            font-size: 16px;
            margin: 0 0 4px 0;
            color: #00d4ff;
          }
          .exp-infinite-desc {
            font-size: 12px;
            margin: 0 0 8px 0;
            opacity: 0.8;
            line-height: 1.4;
          }
          .exp-card-btn {
            font-size: 11px;
            color: #00d4ff;
            letter-spacing: 0.05em;
            opacity: 0;
            transform: translateY(6px);
            transition: opacity 0.3s ease, transform 0.3s ease;
          }
          .exp-infinite-card:hover .exp-card-btn {
            opacity: 1;
            transform: translateY(0);
          }
          @keyframes scroll-infinite {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-320px * ${EXPERIMENTS.length})); }
          }
          .cta-enhanced {
            position: relative;
            overflow: hidden;
          }
          .cta-glow-orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(80px);
            pointer-events: none;
          }
          .cta-orb-1 {
            width: 300px;
            height: 300px;
            top: -100px;
            left: -100px;
            background: rgba(0,212,255,0.15);
            animation: orbFloat 6s ease-in-out infinite;
          }
          .cta-orb-2 {
            width: 250px;
            height: 250px;
            bottom: -80px;
            right: -80px;
            background: rgba(123,47,247,0.15);
            animation: orbFloat 8s ease-in-out infinite reverse;
          }
          @keyframes orbFloat {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(20px, -20px); }
          }

          /* ---------- NEW SECTIONS STYLES (modern & compact) ---------- */
          .hd-pioneers, .hd-advanced-features {
            padding: 60px 5%;
            margin: 0;
            background: transparent;
          }
          .pioneers-grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 28px;
            margin-top: 40px;
          }
          .pioneer-card {
            background: rgba(15, 25, 45, 0.65);
            backdrop-filter: blur(8px);
            border-radius: 28px;
            padding: 28px 20px;
            width: 220px;
            text-align: center;
            border: 1px solid rgba(0,212,255,0.2);
            transition: all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
            position: relative;
            overflow: hidden;
            opacity: 0;
            transform: translateY(30px);
          }
          .pioneer-reveal {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 0.6s ease, transform 0.6s ease;
          }
          .pioneer-card:hover {
            transform: translateY(-8px) scale(1.02);
            border-color: #00d4ff;
            background: rgba(20, 35, 60, 0.8);
            box-shadow: 0 20px 35px -12px rgba(0,212,255,0.25);
          }
          .pioneer-icon {
            font-size: 52px;
            margin-bottom: 16px;
            display: inline-block;
          }
          .pioneer-name {
            font-size: 20px;
            font-weight: 700;
            color: #eef5ff;
            margin: 12px 0 6px;
          }
          .pioneer-contribution {
            font-size: 13px;
            color: #9bb5e0;
            margin: 6px 0;
          }
          .pioneer-era {
            font-size: 11px;
            color: #5f7f9e;
            margin-top: 10px;
            letter-spacing: 0.5px;
          }
          .pioneer-glow {
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at 50% 0%, rgba(0,212,255,0.1), transparent 70%);
            opacity: 0;
            transition: opacity 0.3s;
            pointer-events: none;
          }
          .pioneer-card:hover .pioneer-glow { opacity: 1; }

          .features-advanced-grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 30px;
            margin-top: 40px;
          }
          .feature-advanced-card {
            background: linear-gradient(145deg, rgba(10,20,35,0.7), rgba(5,12,22,0.8));
            backdrop-filter: blur(6px);
            border-radius: 24px;
            padding: 28px 22px;
            width: 250px;
            text-align: center;
            border: 1px solid rgba(0,212,255,0.15);
            transition: all 0.4s ease;
            opacity: 0;
            transform: translateY(30px);
            position: relative;
          }
          .feature-reveal {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 0.6s ease, transform 0.6s ease;
          }
          .feature-advanced-card:hover {
            transform: translateY(-10px);
            border-color: #7b2ff7;
            box-shadow: 0 15px 30px -12px rgba(123,47,247,0.3);
            background: linear-gradient(145deg, rgba(20,40,65,0.85), rgba(8,18,32,0.95));
          }
          .feature-icon {
            font-size: 48px;
            margin-bottom: 18px;
          }
          .feature-title {
            font-size: 20px;
            font-weight: 700;
            background: linear-gradient(135deg, #e0f0ff, #b0e0ff);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            margin-bottom: 12px;
          }
          .feature-desc {
            font-size: 14px;
            color: #aac4e8;
            line-height: 1.4;
          }
          .feature-underline {
            width: 40px;
            height: 2px;
            background: #00d4ff;
            margin: 18px auto 0;
            transition: width 0.3s ease;
          }
          .feature-advanced-card:hover .feature-underline {
            width: 70px;
            background: linear-gradient(90deg, #00d4ff, #7b2ff7);
          }

          /* Cinematic Section */
          .hd-cinematic {
            padding: 80px 5%;
            margin: 0;
            background: transparent;
            perspective: 1000px;
          }
          .cinematic-container {
            background: linear-gradient(145deg, rgba(8,12,28,0.85), rgba(2,6,18,0.95));
            border-radius: 48px;
            border: 1px solid rgba(0,212,255,0.25);
            padding: 60px 40px;
            text-align: center;
            position: relative;
            overflow: hidden;
            transition: all 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1);
            opacity: 0;
            transform: translateY(50px) rotateX(8deg);
          }
          .cinema-reveal {
            opacity: 1;
            transform: translateY(0) rotateX(0);
          }
          .cinematic-backdrop {
            position: absolute;
            inset: 0;
            z-index: 0;
            overflow: hidden;
          }
          .cinematic-glow-1, .cinematic-glow-2, .cinematic-glow-3 {
            position: absolute;
            border-radius: 50%;
            filter: blur(90px);
            animation: cinemaGlowFloat 12s infinite alternate;
          }
          .cinematic-glow-1 {
            width: 400px;
            height: 400px;
            background: rgba(0,212,255,0.2);
            top: -150px;
            left: -100px;
          }
          .cinematic-glow-2 {
            width: 500px;
            height: 500px;
            background: rgba(123,47,247,0.15);
            bottom: -200px;
            right: -150px;
            animation-duration: 18s;
          }
          .cinematic-glow-3 {
            width: 300px;
            height: 300px;
            background: rgba(0,255,160,0.1);
            top: 40%;
            left: 30%;
            animation-duration: 15s;
          }
          @keyframes cinemaGlowFloat {
            0% { transform: translate(0, 0) scale(1); }
            100% { transform: translate(40px, -40px) scale(1.2); }
          }
          .cinematic-content {
            position: relative;
            z-index: 2;
          }
          .cinematic-badge {
            display: inline-block;
            background: rgba(0,212,255,0.15);
            backdrop-filter: blur(4px);
            border-radius: 100px;
            padding: 6px 18px;
            font-size: 13px;
            font-weight: 600;
            color: #00d4ff;
            margin-bottom: 24px;
            letter-spacing: 0.5px;
          }
          .cinematic-title {
            font-size: 3rem;
            font-weight: 800;
            margin: 20px 0;
            color: white;
          }
          .cinematic-gradient {
            background: linear-gradient(135deg, #00d4ff, #7b2ff7, #00ffa0);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
          .cinematic-desc {
            font-size: 1.1rem;
            color: #b8ceff;
            max-width: 700px;
            margin: 0 auto 32px;
            line-height: 1.6;
          }
          .cinematic-features {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 24px;
            margin-bottom: 40px;
          }
          .cinematic-features span {
            background: rgba(255,255,255,0.05);
            border-radius: 60px;
            padding: 8px 20px;
            font-size: 14px;
            font-weight: 500;
            color: #ccdeff;
            backdrop-filter: blur(5px);
            border: 1px solid rgba(0,212,255,0.2);
            transition: all 0.3s;
          }
          .cinematic-features span:hover {
            border-color: #00d4ff;
            color: #00d4ff;
            transform: translateY(-2px);
          }
          .cinematic-btn {
            background: linear-gradient(105deg, rgba(0,212,255,0.2), rgba(123,47,247,0.2));
            border: 1px solid rgba(0,212,255,0.5);
            box-shadow: 0 0 20px rgba(0,212,255,0.2);
          }

          /* تقليل المسافات بين السكشنات */
          .hd-stats, .hd-about, .hd-types, .hd-experiments-infinite, .hd-pioneers, .hd-advanced-features, .hd-cinematic, .hd-cta {
            margin-top: 0;
            margin-bottom: 0;
          }
          .hd-cta {
            padding: 50px 5% 60px;
          }
          @media (max-width: 768px) {
            .pioneer-card, .feature-advanced-card { width: 180px; padding: 20px 12px; }
            .pioneer-icon { font-size: 40px; }
            .exp-infinite-card { width: 240px; height: 160px; }
            .cinematic-title { font-size: 2rem; }
            .cinematic-features span { font-size: 11px; padding: 5px 12px; }
            @keyframes scroll-infinite {
              100% { transform: translateX(calc(-260px * ${EXPERIMENTS.length})); }
            }
          }
        `}</style>
      </div>
    </PageLoader>
  );
}