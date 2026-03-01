import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import acidBaseVideo from "../assets/AcidBase.mp4";

const AcidBase = () => {
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
          src={acidBaseVideo}
          autoPlay
          muted
          loop
          className="full-video"
        />
        <div className="video-overlay">
          <h1>Acid-Base Reaction (تفاعل الحمض والقاعدة)</h1>
          <p>
            Acid-base reactions involve the transfer of protons (H⁺ ions) from acids to bases. 
            These reactions are fundamental in chemistry and are used in neutralization, buffer solutions, and industrial processes.
          </p>
          <button onClick={goToLabHandler}>Go to Chemistry Lab</button>
        </div>
      </div>

      {/* DETAILED SECTIONS */}
      <section className="oxidation-section">
        <h2>Definition</h2>
        <p>
          An acid-base reaction is a chemical reaction in which an acid donates a proton (H⁺) to a base. 
          The reaction typically produces a salt and water, known as neutralization. 
          Examples include HCl + NaOH → NaCl + H₂O.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Mechanism</h2>
        <p>
          The acid (proton donor) transfers an H⁺ ion to the base (proton acceptor). 
          In aqueous solutions, this is often the transfer of H⁺ to OH⁻ forming water. 
          Understanding the mechanism helps predict products and reaction strength.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Examples</h2>
        <ul>
          <li>Hydrochloric acid reacts with sodium hydroxide: HCl + NaOH → NaCl + H₂O</li>
          <li>Sulfuric acid reacts with potassium hydroxide: H₂SO₄ + 2KOH → K₂SO₄ + 2H₂O</li>
          <li>Acetic acid reacts with ammonia: CH₃COOH + NH₃ → CH₃COONH₄</li>
          <li>Neutralization of nitric acid with calcium hydroxide: 2HNO₃ + Ca(OH)₂ → Ca(NO₃)₂ + 2H₂O</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Experimental Procedure</h2>
        <ol>
          <li>Wear PPE: gloves, goggles, lab coat.</li>
          <li>Measure precise amounts of acid and base.</li>
          <li>Mix slowly while stirring to control reaction rate.</li>
          <li>Observe temperature change and pH using indicators.</li>
          <li>Record the volume of acid and base used for neutralization.</li>
          <li>Dispose of solutions safely following lab protocols.</li>
        </ol>
      </section>

      <section className="oxidation-section safety">
        <h2>Safety Tips</h2>
        <ul>
          <li>Handle strong acids and bases with extreme care; they can cause burns.</li>
          <li>Always add acid to water, not water to acid.</li>
          <li>Use proper ventilation when working with volatile acids.</li>
          <li>Wear appropriate PPE at all times.</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Reaction Table</h2>
        <table className="reaction-table">
          <thead>
            <tr>
              <th>Acid</th>
              <th>Base</th>
              <th>Salt + Water</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>HCl</td>
              <td>NaOH</td>
              <td>NaCl + H₂O</td>
            </tr>
            <tr>
              <td>H₂SO₄</td>
              <td>KOH</td>
              <td>K₂SO₄ + H₂O</td>
            </tr>
            <tr>
              <td>HNO₃</td>
              <td>Ca(OH)₂</td>
              <td>Ca(NO₃)₂ + H₂O</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="oxidation-section">
        <h2>Further Reading</h2>
        <a
          href="https://en.wikipedia.org/wiki/Acid%E2%80%93base_reaction"
          target="_blank"
          rel="noreferrer"
          className="research-link"
        >
          Learn more about Acid-Base Reactions
        </a>
      </section>
    </div>
  );
};

export default AcidBase;