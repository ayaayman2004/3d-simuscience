import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import precipitationVideo from "../assets/preception.mp4";

const Precipitation = () => {
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
      <div className="video-hero" width="100%" height="300px">
        <video
          src={precipitationVideo}
          autoPlay
          muted
          loop
          className="full-video"
          width="100%"
          height="100%"
        />
        <div className="video-overlay">
          <h1>Precipitation Reaction (تفاعل الترسيب)</h1>
          <p>
            Precipitation reactions occur when two solutions react to form an insoluble solid called a precipitate. 
            These reactions are common in inorganic chemistry and analytical chemistry for detecting ions.
          </p>
          <button onClick={goToLabHandler}>Go to Chemistry Lab</button>
        </div>
      </div>

      {/* DETAILED SECTIONS */}
      <section className="oxidation-section">
        <h2>Definition</h2>
        <p>
          A precipitation reaction is a chemical reaction in which soluble reactants combine to form an insoluble product called a precipitate. 
          It is an important reaction type for qualitative analysis and industrial processes.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Mechanism</h2>
        <p>
          When ions in solution exceed their solubility product, they combine to form a solid. 
          The precipitate separates from the solution and can be filtered or decanted. 
          Factors like concentration, temperature, and solubility influence the reaction.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Examples</h2>
        <ul>
          <li>Mixing silver nitrate and sodium chloride: AgNO₃ + NaCl → AgCl↓ + NaNO₃</li>
          <li>Mixing barium chloride and sulfuric acid: BaCl₂ + H₂SO₄ → BaSO₄↓ + 2HCl</li>
          <li>Formation of lead(II) iodide: Pb(NO₃)₂ + 2KI → PbI₂↓ + 2KNO₃</li>
          <li>Calcium carbonate formation from CaCl₂ + Na₂CO₃ → CaCO₃↓ + 2NaCl</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Experimental Procedure</h2>
        <ol>
          <li>Wear appropriate PPE (gloves, goggles, lab coat).</li>
          <li>Prepare solutions of the reactants carefully.</li>
          <li>Mix solutions in small amounts in a beaker or test tube.</li>
          <li>Observe formation of precipitate and note the color, texture, and rate.</li>
          <li>Filter or decant the precipitate if needed.</li>
          <li>Dispose of remaining solutions safely.</li>
        </ol>
      </section>

      <section className="oxidation-section safety">
        <h2>Safety Tips</h2>
        <ul>
          <li>Handle all chemicals carefully, some precipitates may be toxic.</li>
          <li>Wear protective eyewear and gloves.</li>
          <li>Work in a well-ventilated area.</li>
          <li>Clean all spills promptly to avoid contamination.</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Applications</h2>
        <p>
          Precipitation reactions are widely used in water purification, qualitative inorganic analysis, and the synthesis of compounds. 
          They are also essential in detecting specific ions in solution in laboratory experiments.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Further Reading</h2>
        <a
          href="https://en.wikipedia.org/wiki/Precipitation_(chemistry)"
          target="_blank"
          rel="noreferrer"
          className="research-link"
        >
          Learn more about Precipitation Reactions
        </a>
      </section>
    </div>
  );
};

export default Precipitation;