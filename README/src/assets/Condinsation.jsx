import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import condensationVideo from "../assets/condinsation.mp4"; // ضع الفيديو في assets

const Condinsation = () => {
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
        <video src={condensationVideo} autoPlay muted loop className="full-video" />
        <div className="video-overlay">
          <h1>Condensation Reaction (تفاعل التكاثف)</h1>
          <p>
            Condensation reactions are chemical processes where two molecules combine 
            to form a larger molecule, often producing water or another small molecule as a byproduct. 
            They are fundamental in organic chemistry, polymer formation, and biochemistry. 
            This page explains the concept, mechanism, examples, and experimental procedure.
          </p>
          <button onClick={goToLabHandler}>Go to Chemistry Lab</button>
        </div>
      </div>

      {/* DETAILED SECTIONS */}
      <section className="oxidation-section">
        <h2>Definition</h2>
        <p>
          A condensation reaction is a chemical reaction in which two molecules combine 
          to form a single larger molecule with the elimination of a small molecule such as water, HCl, or methanol. 
          These reactions are widely used to synthesize esters, amides, and polymers. 
          They illustrate how molecular building blocks can be joined together efficiently.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Mechanism</h2>
        <p>
          Typically, condensation reactions involve nucleophilic attack on a carbonyl carbon, 
          followed by elimination of a leaving group (often water). 
          Examples include esterification (acid + alcohol → ester + water) and amide formation (acid + amine → amide + water). 
          Catalysts such as acids or bases are often used to speed up these reactions.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Common Examples</h2>
        <ul>
          <li>Formation of esters: CH3COOH + CH3OH → CH3COOCH3 + H2O</li>
          <li>Formation of amides: CH3COOH + NH3 → CH3CONH2 + H2O</li>
          <li>Polymerization: n HO–R–OH + n HOC–R'–COOH → –[O–R–O–C–R'–C]–n + 2n H2O</li>
          <li>Formation of peptides in proteins: Amino acids → Peptides + Water</li>
          <li>Acetal formation from aldehydes and alcohols.</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Experimental Procedure</h2>
        <ol>
          <li>Wear proper PPE (gloves, goggles, lab coat).</li>
          <li>Measure reactants accurately and mix in a controlled environment.</li>
          <li>Add acid or base catalyst if required.</li>
          <li>Heat gently if necessary and monitor water formation.</li>
          <li>Document all observations and reaction progress.</li>
          <li>Clean up safely and dispose of chemicals properly.</li>
        </ol>
      </section>

      <section className="oxidation-section safety">
        <h2>Safety Tips</h2>
        <ul>
          <li>Always use PPE to avoid contact with acids, bases, or reactive compounds.</li>
          <li>Handle heating devices with caution.</li>
          <li>Work in a ventilated area or fume hood.</li>
          <li>Be cautious with flammable solvents used in some condensation reactions.</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Reaction Table</h2>
        <table className="reaction-table">
          <thead>
            <tr>
              <th>Reactants</th>
              <th>Product</th>
              <th>Byproduct</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CH3COOH + CH3OH</td>
              <td>CH3COOCH3</td>
              <td>H2O</td>
            </tr>
            <tr>
              <td>CH3COOH + NH3</td>
              <td>CH3CONH2</td>
              <td>H2O</td>
            </tr>
            <tr>
              <td>Amino acids</td>
              <td>Peptides</td>
              <td>H2O</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="oxidation-section">
        <h2>Further Reading</h2>
        <p>
          Condensation reactions are vital in organic synthesis, biochemistry, and polymer chemistry. 
          Mastering these reactions enables chemists to build complex molecules, synthesize polymers, 
          and understand biological processes like protein and nucleic acid formation.
        </p>
        <a
          href="https://en.wikipedia.org/wiki/Condensation_reaction"
          target="_blank"
          rel="noreferrer"
          className="research-link"
        >
          Learn more about Condensation Reactions
        </a>
      </section>
    </div>
  );
};

export default Condinsation;
