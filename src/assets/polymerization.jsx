import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import polymerizationVideo from "../assets/polymeriation.mp4";

const Polymerization = () => {
  const navigate = useNavigate();

  const goToLabHandler = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      const hasAccount = window.confirm(
        "You are not logged in. Do you already have an account?"
      );
      if (hasAccount) {
        navigate("/login", { state: { redirectToLab: true } });
      } else {
        navigate("/register", { state: { redirectToLab: true } });
      }
    } else {
      navigate("/LabScene");
    }
  };

  useEffect(() => {
    const sections = document.querySelectorAll(".oxidation-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="oxidation-container">
      {/* HERO VIDEO */}
      <div className="video-hero">
        <video
          src={polymerizationVideo}
          autoPlay
          muted
          loop
          className="full-video"
        />
        <div className="video-overlay">
          <h1>Polymerization Reaction (تفاعل البلمرة)</h1>
          <p>
            Polymerization reactions involve linking small molecules (monomers) into large chain molecules (polymers). 
            These reactions are fundamental in producing plastics, resins, and synthetic fibers.
          </p>
          <button onClick={goToLabHandler}>Go to Chemistry Lab</button>
        </div>
      </div>

      {/* DETAILED SECTIONS */}
      <section className="oxidation-section">
        <h2>Definition</h2>
        <p>
          Polymerization is a chemical reaction in which monomer molecules combine to form long-chain molecules called polymers. 
          There are two main types: addition (chain-growth) polymerization and condensation (step-growth) polymerization.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Mechanism</h2>
        <p>
          In addition polymerization, reactive sites like radicals, cations, or anions open double bonds in monomers to link them. 
          In condensation polymerization, monomers react with the elimination of small molecules such as water.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Examples</h2>
        <ul>
          <li>Polyethylene: nCH₂=CH₂ → -(CH₂-CH₂)n-</li>
          <li>Polyvinyl chloride (PVC): nCH₂=CHCl → -(CH₂-CHCl)n-</li>
          <li>Polystyrene: nCH₂=CHC₆H₅ → -(CH₂-CHC₆H₅)n-</li>
          <li>Condensation polymerization: formation of nylon from hexamethylenediamine and adipic acid.</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Experimental Procedure</h2>
        <ol>
          <li>Wear proper PPE including gloves, goggles, and lab coat.</li>
          <li>Mix monomers in controlled conditions.</li>
          <li>Use catalysts or initiators as required.</li>
          <li>Observe polymer formation, viscosity changes, and exothermic reactions.</li>
          <li>Collect and purify the polymer if necessary.</li>
          <li>Dispose of unreacted monomers safely.</li>
        </ol>
      </section>

      <section className="oxidation-section safety">
        <h2>Safety Tips</h2>
        <ul>
          <li>Monomers may be toxic or flammable; handle with care.</li>
          <li>Perform reactions in ventilated areas or fume hoods.</li>
          <li>Wear protective gear at all times.</li>
          <li>Be cautious of exothermic polymerization reactions.</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Applications</h2>
        <p>
          Polymerization reactions are essential in producing plastics, synthetic fibers, rubber, resins, and other materials used in daily life and industry.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Further Reading</h2>
        <a
          href="https://en.wikipedia.org/wiki/Polymerization"
          target="_blank"
          rel="noreferrer"
          className="research-link"
        >
          Learn more about Polymerization Reactions
        </a>
      </section>
    </div>
  );
};

export default Polymerization;