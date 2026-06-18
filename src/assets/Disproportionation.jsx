import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import disproportionationVideo from "../assets/desproparation.mp4"; 
// حطي الفيديو في assets

const Disproportionation = () => {
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
          src={disproportionationVideo}
          autoPlay
          muted
          loop
          className="full-video"
        />
        <div className="video-overlay">
          <h1>Disproportionation Reaction</h1>
          <p>
            Disproportionation reactions are a special type of redox reactions
            where the same element is simultaneously oxidized and reduced.
            These reactions play a vital role in inorganic chemistry,
            electrochemistry, and industrial processes.
          </p>
          <button onClick={goToLabHandler}>Go to Chemistry Lab</button>
        </div>
      </div>

      {/* SECTIONS */}
      <section className="oxidation-section">
        <h2>Definition</h2>
        <p>
          A disproportionation reaction is a redox reaction in which a single
          element in one oxidation state is both oxidized and reduced,
          forming two different products with different oxidation states.
          This type of reaction highlights the dual behavior of certain elements.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>How It Works</h2>
        <p>
          In disproportionation, one atom of the element loses electrons
          (oxidation), while another atom of the same element gains electrons
          (reduction). This happens because the element has intermediate
          oxidation states that are unstable under certain conditions.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Common Examples</h2>
        <ul>
          <li>Chlorine in water: Cl₂ + H₂O → HCl + HClO</li>
          <li>Hydrogen peroxide: 2H₂O₂ → 2H₂O + O₂</li>
          <li>Copper(I) ions: 2Cu⁺ → Cu²⁺ + Cu</li>
          <li>Chlorate ions: 4ClO₃⁻ → 3ClO₄⁻ + Cl⁻</li>
          <li>Hypochlorite ions under heat conditions</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Experimental Procedure</h2>
        <ol>
          <li>Wear lab coat, gloves, and safety goggles.</li>
          <li>Prepare reactants in controlled concentrations.</li>
          <li>Maintain proper temperature and pH if required.</li>
          <li>Observe gas evolution, color change, or precipitate formation.</li>
          <li>Record observations accurately.</li>
          <li>Dispose of chemicals according to lab safety rules.</li>
        </ol>
      </section>

      <section className="oxidation-section safety">
        <h2>Safety Considerations</h2>
        <ul>
          <li>Some disproportionation reactions release toxic gases.</li>
          <li>Always work in a well-ventilated area or fume hood.</li>
          <li>Avoid direct contact with strong oxidizing agents.</li>
          <li>Never heat reactions without supervision.</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Reaction Table</h2>
        <table className="reaction-table">
          <thead>
            <tr>
              <th>Element</th>
              <th>Initial State</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cl₂</td>
              <td>0</td>
              <td>Cl⁻ and Cl⁺¹</td>
            </tr>
            <tr>
              <td>H₂O₂</td>
              <td>-1</td>
              <td>H₂O (-2) & O₂ (0)</td>
            </tr>
            <tr>
              <td>Cu⁺</td>
              <td>+1</td>
              <td>Cu²⁺ and Cu</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="oxidation-section">
        <h2>Importance in Chemistry</h2>
        <p>
          Disproportionation reactions are essential in understanding redox
          behavior, reaction stability, and industrial chemical processes.
          They are widely used in water treatment, bleaching processes,
          electrochemical systems, and analytical chemistry.
        </p>
        <a
          href="https://en.wikipedia.org/wiki/Disproportionation"
          target="_blank"
          rel="noreferrer"
          className="research-link"
        >
          Learn more about Disproportionation Reactions
        </a>
      </section>
    </div>
  );
};

export default Disproportionation;