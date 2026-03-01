import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import hydrolysisVideo from "../assets/hydro.mp4"; 
// حطي الفيديو في assets

const Hydrolysis = () => {
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
          src={hydrolysisVideo}
          autoPlay
          muted
          loop
          className="full-video"
        />
        <div className="video-overlay">
          <h1>Hydrolysis Reaction</h1>
          <p>
            Hydrolysis reactions involve the breaking of chemical bonds by the
            addition of water. These reactions play a crucial role in chemistry,
            biology, and industrial processes, especially in digestion and
            polymer breakdown.
          </p>
          <button onClick={goToLabHandler}>Go to Chemistry Lab</button>
        </div>
      </div>

      {/* SECTIONS */}
      <section className="oxidation-section">
        <h2>Definition</h2>
        <p>
          Hydrolysis is a chemical reaction in which water is used to break
          chemical bonds in a compound. The word "hydrolysis" comes from the
          Greek words "hydro" meaning water and "lysis" meaning breaking.
          It is the opposite of condensation reactions.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>How Hydrolysis Works</h2>
        <p>
          In a hydrolysis reaction, a water molecule splits into H⁺ and OH⁻ ions.
          These ions attach to different parts of the compound, causing the
          molecule to split into two or more smaller molecules. This process is
          essential in both inorganic and organic chemistry.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Common Examples</h2>
        <ul>
          <li>Hydrolysis of salts such as Na₂CO₃ in water</li>
          <li>Hydrolysis of esters to form alcohols and acids</li>
          <li>Digestion of proteins into amino acids</li>
          <li>Hydrolysis of carbohydrates into simple sugars</li>
          <li>Breaking polymers into monomers using water</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>General Equation</h2>
        <p>
          AB + H₂O → A–OH + B–H
        </p>
        <p>
          This equation represents how water participates directly in breaking
          the bond between A and B.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Experimental Procedure</h2>
        <ol>
          <li>Wear safety goggles, gloves, and a lab coat.</li>
          <li>Prepare the compound to be hydrolyzed.</li>
          <li>Add distilled water carefully.</li>
          <li>Apply heat or a catalyst if required.</li>
          <li>Observe pH change, temperature, or product formation.</li>
          <li>Record all results and clean equipment properly.</li>
        </ol>
      </section>

      <section className="oxidation-section safety">
        <h2>Safety Tips</h2>
        <ul>
          <li>Some hydrolysis reactions are exothermic.</li>
          <li>Avoid direct contact with acids or bases formed.</li>
          <li>Work in a ventilated area.</li>
          <li>Dispose of chemicals according to lab rules.</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Reaction Table</h2>
        <table className="reaction-table">
          <thead>
            <tr>
              <th>Compound</th>
              <th>Products</th>
              <th>Observation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ester</td>
              <td>Alcohol + Acid</td>
              <td>pH change</td>
            </tr>
            <tr>
              <td>Protein</td>
              <td>Amino Acids</td>
              <td>Molecule breakdown</td>
            </tr>
            <tr>
              <td>Salt</td>
              <td>Acid/Base Solution</td>
              <td>Change in pH</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="oxidation-section">
        <h2>Importance and Applications</h2>
        <p>
          Hydrolysis reactions are essential in biological systems, industrial
          chemistry, and environmental processes. They are responsible for food
          digestion, drug metabolism, wastewater treatment, and recycling of
          polymers.
        </p>
        <a
          href="https://en.wikipedia.org/wiki/Hydrolysis"
          target="_blank"
          rel="noreferrer"
          className="research-link"
        >
          Learn more about Hydrolysis Reactions
        </a>
      </section>
    </div>
  );
};

export default Hydrolysis;