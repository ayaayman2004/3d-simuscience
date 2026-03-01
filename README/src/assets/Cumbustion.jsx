// src/experiments/OxidationReduction.jsx
 
 
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import combustionVideo from "../assets/Combu.mp4"; // ضع الفيديو في assets

const Cumbustion = () => {
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
        <video src={combustionVideo} autoPlay muted loop className="full-video" />
        <div className="video-overlay">
          <h1>Combustion Reaction (تفاعل الاحتراق)</h1>
          <p>
            Combustion reactions are rapid chemical reactions between a substance and oxygen, producing heat and light. 
            They are essential in energy production, engines, and fire chemistry. 
            This page explains the concept, mechanism, examples, and safety procedures.
          </p>
          <button onClick={goToLabHandler}>Go to Chemistry Lab</button>
        </div>
      </div>

      {/* DETAILED SECTIONS */}
      <section className="oxidation-section">
        <h2>Definition</h2>
        <p>
          A combustion reaction is a high-energy exothermic reaction where a fuel reacts with oxygen to produce energy, usually in the form of heat and light. 
          Common fuels include hydrocarbons like methane, propane, and gasoline. Products are typically CO2 and H2O.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Mechanism</h2>
        <p>
          Combustion usually starts with the fuel being heated to its ignition temperature. 
          Free radicals form, breaking chemical bonds and allowing oxygen to react with the fuel. 
          Chain reactions propagate rapidly, releasing energy in the form of heat and light.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Common Examples</h2>
        <ul>
          <li>Methane combustion: CH4 + 2O2 → CO2 + 2H2O</li>
          <li>Propane combustion: C3H8 + 5O2 → 3CO2 + 4H2O</li>
          <li>Hydrogen combustion: 2H2 + O2 → 2H2O</li>
          <li>Gasoline combustion in car engines</li>
          <li>Wood burning in fireplaces</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Experimental Procedure</h2>
        <ol>
          <li>Wear proper PPE (gloves, goggles, lab coat).</li>
          <li>Use small, controlled amounts of fuel for safety.</li>
          <li>Ensure proper ventilation to prevent accumulation of gases.</li>
          <li>Ignite fuel carefully and observe the flame and reaction.</li>
          <li>Document temperature changes, color, and gas production.</li>
          <li>Extinguish flame safely and clean the area.</li>
        </ol>
      </section>

      <section className="oxidation-section safety">
        <h2>Safety Tips</h2>
        <ul>
          <li>Combustion reactions release heat and light; avoid burns.</li>
          <li>Do not perform indoors without ventilation.</li>
          <li>Keep flammable materials away from open flames.</li>
          <li>Use fire extinguishers in case of accidents.</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Reaction Table</h2>
        <table className="reaction-table">
          <thead>
            <tr>
              <th>Fuel</th>
              <th>Oxygen</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CH4</td>
              <td>2O2</td>
              <td>CO2 + 2H2O</td>
            </tr>
            <tr>
              <td>C3H8</td>
              <td>5O2</td>
              <td>3CO2 + 4H2O</td>
            </tr>
            <tr>
              <td>2H2</td>
              <td>O2</td>
              <td>2H2O</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="oxidation-section">
        <h2>Further Reading</h2>
        <p>
          Combustion reactions are fundamental in energy production, engines, and fire science. 
          Understanding them allows chemists and engineers to design safer fuels and efficient energy systems.
        </p>
        <a
          href="https://en.wikipedia.org/wiki/Combustion"
          target="_blank"
          rel="noreferrer"
          className="research-link"
        >
          Learn more about Combustion Reactions
        </a>
      </section>
    </div>
  );
};

export default Cumbustion;
