
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import combinationVideo from "./compination.mp4";

const combination = () => {
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
          src={combinationVideo}
          autoPlay
          muted
          loop
          className="full-video"
        />
        <div className="video-overlay">
          <h1>Combination Reaction (تفاعل التركيب)</h1>
          <p>
            Combination reactions occur when two or more reactants combine to form a single product. 
            These reactions are common in inorganic chemistry and are essential in industrial processes and material synthesis.
          </p>
          <button onClick={goToLabHandler}>Go to Chemistry Lab</button>
        </div>
      </div>

      {/* DETAILED SECTIONS */}
      <section className="oxidation-section">
        <h2>Definition</h2>
        <p>
          A combination reaction is a type of chemical reaction in which two or more substances (elements or compounds) combine to form a single product. 
          General form: A + B → AB. These reactions increase molecular complexity and are often exothermic.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Mechanism</h2>
        <p>
          In combination reactions, reactants collide and bonds rearrange to form a new single product. 
          The reaction may involve the transfer or sharing of electrons depending on the type of reactants (ionic or covalent). 
          Energy is often released as heat or light.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Examples</h2>
        <ul>
          <li>Hydrogen reacts with oxygen: 2H₂ + O₂ → 2H₂O</li>
          <li>Iron reacts with sulfur: Fe + S → FeS</li>
          <li>Nitrogen reacts with hydrogen in Haber process: N₂ + 3H₂ → 2NH₃</li>
          <li>Calcium reacts with chlorine: Ca + Cl₂ → CaCl₂</li>
          <li>Magnesium reacts with oxygen: 2Mg + O₂ → 2MgO</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Experimental Procedure</h2>
        <ol>
          <li>Wear appropriate PPE: gloves, goggles, lab coat.</li>
          <li>Use clean and dry reactants to ensure accurate reaction.</li>
          <li>Mix reactants carefully under controlled conditions.</li>
          <li>Observe changes such as temperature increase, color change, or gas evolution.</li>
          <li>Record observations and product formation carefully.</li>
          <li>Dispose of leftover chemicals safely.</li>
        </ol>
      </section>

      <section className="oxidation-section safety">
        <h2>Safety Tips</h2>
        <ul>
          <li>Handle reactive elements like sodium, magnesium, or chlorine with extreme care.</li>
          <li>Conduct reactions in a ventilated area or fume hood.</li>
          <li>Be aware of exothermic reactions that release heat quickly.</li>
          <li>Wear proper PPE and follow all lab safety protocols.</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Reaction Table</h2>
        <table className="reaction-table">
          <thead>
            <tr>
              <th>Reactants</th>
              <th>Product</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2H₂ + O₂</td>
              <td>2H₂O</td>
            </tr>
            <tr>
              <td>Fe + S</td>
              <td>FeS</td>
            </tr>
            <tr>
              <td>N₂ + 3H₂</td>
              <td>2NH₃</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="oxidation-section">
        <h2>Further Reading</h2>
        <a
          href="https://en.wikipedia.org/wiki/Combination_reaction"
          target="_blank"
          rel="noreferrer"
          className="research-link"
        >
          Learn more about Combination Reactions
        </a>
      </section>
    </div>
  );
};

export default combination;
