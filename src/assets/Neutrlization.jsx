import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import neutralizationVideo from "../assets/neutrilization.mp4";
// import VideoPlayer from "./VideoPlayer"
// خلي الفيديو موجود داخل assets

const Neutralization = () => {
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
          src={neutralizationVideo}
          autoPlay
          muted
          loop
          className="full-video"
        />
        <div className="video-overlay">
          <h1>Neutralization Reaction</h1>
          <p>
            Neutralization reactions occur when an acid reacts with a base to
            produce salt and water. These reactions are fundamental in chemistry,
            biology, medicine, and industrial processes.
          </p>
          <button onClick={goToLabHandler}>Go to Chemistry Lab</button>
        </div>
      </div>

      {/* CONTENT SECTIONS */}
      <section className="oxidation-section">
        <h2>Definition</h2>
        <p>
          A neutralization reaction is a chemical reaction between an acid and a
          base in which the acidic and basic properties are canceled, forming a
          neutral solution. The main products of this reaction are salt and water.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>How Neutralization Works</h2>
        <p>
          Acids release hydrogen ions (H⁺) while bases release hydroxide ions
          (OH⁻). When these ions meet, they combine to form water (H₂O). The
          remaining ions form a salt. This process reduces acidity and basicity.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>General Equation</h2>
        <p>
          Acid + Base → Salt + Water
        </p>
        <p>
          Example:  
          HCl + NaOH → NaCl + H₂O
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Common Examples</h2>
        <ul>
          <li>Hydrochloric acid + Sodium hydroxide → Sodium chloride + Water</li>
          <li>Sulfuric acid + Potassium hydroxide → Potassium sulfate + Water</li>
          <li>Antacid tablets neutralizing stomach acid</li>
          <li>Soil treatment in agriculture to reduce acidity</li>
          <li>Wastewater treatment to control pH levels</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Experimental Procedure</h2>
        <ol>
          <li>Wear protective gloves, goggles, and lab coat.</li>
          <li>Prepare dilute acid and base solutions.</li>
          <li>Add indicator (such as phenolphthalein).</li>
          <li>Slowly mix the acid and base.</li>
          <li>Observe color change indicating neutralization.</li>
          <li>Record results and dispose of solutions safely.</li>
        </ol>
      </section>

      <section className="oxidation-section safety">
        <h2>Safety Tips</h2>
        <ul>
          <li>Always add acid to water, not water to acid.</li>
          <li>Avoid skin and eye contact with acids and bases.</li>
          <li>Use dilute solutions for safer experiments.</li>
          <li>Neutralize spills immediately.</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Reaction Table</h2>
        <table className="reaction-table">
          <thead>
            <tr>
              <th>Acid</th>
              <th>Base</th>
              <th>Salt Formed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>HCl</td>
              <td>NaOH</td>
              <td>NaCl</td>
            </tr>
            <tr>
              <td>H₂SO₄</td>
              <td>KOH</td>
              <td>K₂SO₄</td>
            </tr>
            <tr>
              <td>HNO₃</td>
              <td>Ca(OH)₂</td>
              <td>Ca(NO₃)₂</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="oxidation-section">
        <h2>Importance and Applications</h2>
        <p>
          Neutralization reactions are widely used in medicine, agriculture,
          environmental protection, and chemical industries. They help maintain
          pH balance in biological systems and are essential for safe chemical
          waste management.
        </p>
        <a
          href="https://en.wikipedia.org/wiki/Neutralization_(chemistry)"
          target="_blank"
          rel="noreferrer"
          className="research-link"
        >
          Learn more about Neutralization Reactions
        </a>
      </section>
    </div>
  );
};

export default Neutralization;