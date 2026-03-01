// src/experiments/OxidationReduction.jsx
 
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import decompositionVideo from "../assets/decomposition.mp4"; // ضع الفيديو في assets

const Decomposition = () => {
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
        <video src={decompositionVideo} autoPlay muted loop className="full-video" />
        <div className="video-overlay">
          <h1>Decomposition Reaction (تفاعل التحلل)</h1>
          <p>
            Decomposition reactions are chemical reactions in which a single compound breaks down into two or more simpler substances. 
            They are commonly used in laboratory experiments to study reaction kinetics and energy changes.
          </p>
          <button onClick={goToLabHandler}>Go to Chemistry Lab</button>
        </div>
      </div>

      {/* DETAILED SECTIONS */}
      <section className="oxidation-section">
        <h2>Definition</h2>
        <p>
          A decomposition reaction occurs when a compound breaks down into simpler substances, usually under the influence of heat, light, or electricity. 
          General form: AB → A + B. Common examples include the decomposition of hydrogen peroxide, calcium carbonate, and water electrolysis.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Mechanism</h2>
        <p>
          Energy is typically required to break chemical bonds in the compound. 
          Once bonds are broken, simpler molecules or elements are released. 
          Catalysts can accelerate decomposition by lowering activation energy.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Common Examples</h2>
        <ul>
          <li>Hydrogen peroxide decomposition: 2H2O2 → 2H2O + O2</li>
          <li>Calcium carbonate decomposition: CaCO3 → CaO + CO2</li>
          <li>Potassium chlorate decomposition: 2KClO3 → 2KCl + 3O2</li>
          <li>Electrolysis of water: 2H2O → 2H2 + O2</li>
          <li>Ammonium dichromate decomposition: (NH4)2Cr2O7 → Cr2O3 + N2 + 4H2O</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Experimental Procedure</h2>
        <ol>
          <li>Wear appropriate PPE (gloves, goggles, lab coat).</li>
          <li>Use small quantities of substances for safety.</li>
          <li>Provide the necessary energy source (heat, light, or electricity).</li>
          <li>Observe gas evolution, color change, and residue formation.</li>
          <li>Record all observations and reactions.</li>
          <li>Clean up safely after the experiment.</li>
        </ol>
      </section>

      <section className="oxidation-section safety">
        <h2>Safety Tips</h2>
        <ul>
          <li>Handle chemicals carefully; some decomposition reactions release toxic or flammable gases.</li>
          <li>Use fume hoods when necessary.</li>
          <li>Do not touch hot apparatus or reactive compounds.</li>
          <li>Keep fire extinguishers nearby for emergencies.</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Reaction Table</h2>
        <table className="reaction-table">
          <thead>
            <tr>
              <th>Compound</th>
              <th>Condition</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2H2O2</td>
              <td>Catalyst / Heat</td>
              <td>2H2O + O2</td>
            </tr>
            <tr>
              <td>CaCO3</td>
              <td>Heat</td>
              <td>CaO + CO2</td>
            </tr>
            <tr>
              <td>2KClO3</td>
              <td>MnO2 / Heat</td>
              <td>2KCl + 3O2</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="oxidation-section">
        <h2>Further Reading</h2>
        <p>
          Decomposition reactions are fundamental in chemistry labs, industry, and environmental science. 
          They help chemists understand reaction mechanisms and energy changes, and are used to produce oxygen, metal oxides, and other compounds.
        </p>
        <a
          href="https://en.wikipedia.org/wiki/Decomposition_reaction"
          target="_blank"
          rel="noreferrer"
          className="research-link"
        >
          Learn more about Decomposition Reactions
        </a>
      </section>
    </div>
  );
};

export default Decomposition;
