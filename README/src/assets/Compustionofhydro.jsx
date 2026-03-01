import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import compositionVideo from "../assets/Compustionofhydro.mp4"; // ضع الفيديو في assets

const Compustionofhydro = () => {
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
        <video src={compositionVideo} autoPlay muted loop className="full-video" />
        <div className="video-overlay">
          <h1>Composition Hydro Reaction (تفاعل تكوين الهيدرو)</h1>
          <p>
            Composition Hydro reactions involve the combination of simpler molecules 
            to form more complex compounds with water as a product. They are widely 
            studied in inorganic chemistry and are important in understanding hydration, 
            acid-base reactions, and industrial processes. This page explains the concept, 
            mechanism, examples, and experimental procedure.
          </p>
          <button onClick={goToLabHandler}>Go to Chemistry Lab</button>
        </div>
      </div>

      {/* DETAILED SECTIONS */}
      <section className="oxidation-section">
        <h2>Definition</h2>
        <p>
          A composition hydro reaction is a chemical process where water is formed 
          as a byproduct of combining two or more reactants. These reactions are 
          fundamental in acid-base chemistry, hydration reactions, and salt formation. 
          They illustrate how hydrogen and hydroxide ions interact with other compounds 
          to produce water.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Mechanism</h2>
        <p>
          Typically, in a composition hydro reaction, H+ ions from an acid react with 
          OH- ions from a base, forming H2O. In some reactions, water is generated 
          from combination reactions of oxides or hydrides. Understanding the electron 
          transfer and molecular rearrangement is key to predicting products.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Common Examples</h2>
        <ul>
          <li>HCl + NaOH → NaCl + H2O</li>
          <li>SO3 + H2O → H2SO4</li>
          <li>CaO + H2O → Ca(OH)2</li>
          <li>MgO + H2O → Mg(OH)2</li>
          <li>Combination of hydrogen and oxygen gases to form water: 2H2 + O2 → 2H2O</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Experimental Procedure</h2>
        <ol>
          <li>Wear protective gear (gloves, goggles, lab coat).</li>
          <li>Measure small quantities of reactants accurately.</li>
          <li>Mix acids and bases carefully in a controlled environment.</li>
          <li>Observe formation of water, temperature changes, and reaction rate.</li>
          <li>Document observations and clean up safely after the experiment.</li>
        </ol>
      </section>

      <section className="oxidation-section safety">
        <h2>Safety Tips</h2>
        <ul>
          <li>Always wear PPE to avoid chemical burns.</li>
          <li>Mix acids and bases slowly to prevent splashes.</li>
          <li>Work in a well-ventilated area or fume hood.</li>
          <li>Handle reactive oxides and hydrides with extreme care.</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Reaction Table</h2>
        <table className="reaction-table">
          <thead>
            <tr>
              <th>Reactants</th>
              <th>Product</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>HCl + NaOH</td>
              <td>NaCl + H2O</td>
              <td>Acid-Base</td>
            </tr>
            <tr>
              <td>CaO + H2O</td>
              <td>Ca(OH)2</td>
              <td>Hydration</td>
            </tr>
            <tr>
              <td>2H2 + O2</td>
              <td>2H2O</td>
              <td>Combination</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="oxidation-section">
        <h2>Further Reading</h2>
        <p>
          Composition hydro reactions are fundamental in chemistry education, 
          industrial processes, and environmental chemistry. Understanding these 
          reactions helps in predicting products, designing safe experiments, 
          and applying concepts in chemical manufacturing.
        </p>
        <a
          href="https://en.wikipedia.org/wiki/Composition_reaction"
          target="_blank"
          rel="noreferrer"
          className="research-link"
        >
          Learn more about Composition Hydro Reactions
        </a>
      </section>
    </div>
  );
};

export default Compustionofhydro;