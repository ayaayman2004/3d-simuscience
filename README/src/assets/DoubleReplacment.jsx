import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import doubleReplacementVideo from "../assets/doubledisplacement.mp4"; 
// حطي الفيديو في assets

const DoubleReplacement = () => {
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
          src={doubleReplacementVideo}
          autoPlay
          muted
          loop
          className="full-video"
        />
        <div className="video-overlay">
          <h1>Double Replacement Reaction</h1>
          <p>
            Double replacement reactions occur when two ionic compounds
            exchange ions to form two new compounds. These reactions are
            fundamental in aqueous chemistry and are commonly observed in
            precipitation, neutralization, and gas-forming reactions.
          </p>
          <button onClick={goToLabHandler}>Go to Chemistry Lab</button>
        </div>
      </div>

      {/* SECTIONS */}
      <section className="oxidation-section">
        <h2>Definition</h2>
        <p>
          A double replacement reaction, also known as a double displacement
          reaction, is a chemical reaction in which the positive and negative
          ions of two different compounds exchange places, forming two new
          compounds. These reactions usually occur in aqueous solutions.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>General Equation</h2>
        <p>
          The general form of a double replacement reaction is:
        </p>
        <p>
          AB + CD → AD + CB
        </p>
        <p>
          One of the products is often a precipitate, a gas, or a weak
          electrolyte like water, which drives the reaction forward.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Common Examples</h2>
        <ul>
          <li>AgNO₃ + NaCl → AgCl ↓ + NaNO₃</li>
          <li>BaCl₂ + Na₂SO₄ → BaSO₄ ↓ + 2NaCl</li>
          <li>HCl + NaOH → NaCl + H₂O</li>
          <li>Pb(NO₃)₂ + KI → PbI₂ ↓ + 2KNO₃</li>
          <li>Na₂CO₃ + CaCl₂ → CaCO₃ ↓ + 2NaCl</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Experimental Procedure</h2>
        <ol>
          <li>Wear gloves, goggles, and lab coat.</li>
          <li>Prepare aqueous solutions of both reactants.</li>
          <li>Mix the solutions slowly in a clean container.</li>
          <li>Observe precipitate formation, color change, or gas evolution.</li>
          <li>Record observations carefully.</li>
          <li>Dispose of waste according to safety guidelines.</li>
        </ol>
      </section>

      <section className="oxidation-section safety">
        <h2>Safety Tips</h2>
        <ul>
          <li>Avoid skin and eye contact with ionic solutions.</li>
          <li>Some precipitates may be toxic—handle with care.</li>
          <li>Work in a well-ventilated area.</li>
          <li>Label all chemicals properly.</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Reaction Table</h2>
        <table className="reaction-table">
          <thead>
            <tr>
              <th>Reactants</th>
              <th>Products</th>
              <th>Observation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>AgNO₃ + NaCl</td>
              <td>AgCl + NaNO₃</td>
              <td>White precipitate</td>
            </tr>
            <tr>
              <td>BaCl₂ + Na₂SO₄</td>
              <td>BaSO₄ + NaCl</td>
              <td>White precipitate</td>
            </tr>
            <tr>
              <td>HCl + NaOH</td>
              <td>NaCl + H₂O</td>
              <td>Heat released</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="oxidation-section">
        <h2>Importance and Applications</h2>
        <p>
          Double replacement reactions are widely used in analytical chemistry,
          water treatment, medicine, and industrial processes. They help in
          identifying ions, removing impurities from water, and producing
          useful compounds in laboratories and factories.
        </p>
        <a
          href="https://en.wikipedia.org/wiki/Double_displacement_reaction"
          target="_blank"
          rel="noreferrer"
          className="research-link"
        >
          Learn more about Double Replacement Reactions
        </a>
      </section>
    </div>
  );
};

export default DoubleReplacement;
