import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import oxidationVideo from "../assets/oxidation.mp4"; // الفيديو هنا

const OxidationReduction = () => {
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
        <video src={oxidationVideo} autoPlay muted loop className="full-video" />
        <div className="video-overlay">
          <h1>Oxidation Reaction  </h1>
          <p>
            Oxidation reactions are fundamental chemical processes where substances lose electrons. 
            They are crucial in energy production, corrosion, metabolism, and industrial chemistry.
            This page will guide you through detailed explanations, examples, experiments, and safety tips.
          </p>
          <button onClick={goToLabHandler}>Go to Chemistry Lab</button>
        </div>
      </div>

      {/* DETAILED SECTIONS */}
      <section className="oxidation-section">
        <h2>Definition and Importance</h2>
        <p>
          Oxidation is the process where a molecule, atom, or ion loses electrons. In everyday life, 
          oxidation is observed in rusting iron, browning fruits, and burning fuels. This process is 
          paired with reduction in a redox reaction, which is key to energy production in cells (cellular respiration) 
          and in batteries. Oxidation reactions are central to both organic and inorganic chemistry.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Mechanism of Oxidation</h2>
        <p>
          The electron transfer is the core mechanism. During oxidation, one substance loses electrons 
          while another accepts them (reduction). For example, in the reaction of iron with oxygen to form rust:
          4Fe + 3O2 → 2Fe2O3, each iron atom loses electrons to oxygen. 
          Similarly, combustion reactions involve fuel oxidation, releasing energy as heat and light.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Examples in Daily Life</h2>
        <ul>
          <li>Rust formation on metals exposed to air and moisture.</li>
          <li>Combustion of wood or gasoline, releasing CO2 and H2O.</li>
          <li>Oxidation of glucose in cellular respiration to generate ATP.</li>
          <li>Bleaching agents oxidizing pigments in fabrics or hair.</li>
          <li>Oxidation of wine, which changes flavor over time.</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Experimental Procedure</h2>
        <ol>
          <li>Put on lab coat, gloves, and goggles for protection.</li>
          <li>Prepare small quantities of reactive metals and oxidizers.</li>
          <li>Conduct reactions in well-ventilated areas or under a fume hood.</li>
          <li>Observe color changes, heat emission, gas evolution, and precipitate formation.</li>
          <li>Document all observations carefully in a lab notebook.</li>
          <li>Dispose of chemicals according to lab safety regulations.</li>
        </ol>
      </section>

      <section className="oxidation-section safety">
        <h2>Safety Guidelines</h2>
        <ul>
          <li>Never handle strong oxidizers without protective gear.</li>
          <li>Do not inhale fumes from any oxidation reactions.</li>
          <li>Keep fire extinguishers and neutralizers ready in case of accidents.</li>
          <li>Ensure small-scale experiments to prevent uncontrolled reactions.</li>
          <li>Work under supervision if inexperienced with chemicals.</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Reaction Table</h2>
        <table className="reaction-table">
          <thead>
            <tr>
              <th>Substance</th>
              <th>Oxidation Number Change</th>
              <th>Reaction Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Fe → Fe2O3</td>
              <td>0 → +3</td>
              <td>Metal Oxidation</td>
            </tr>
            <tr>
              <td>C + O2 → CO2</td>
              <td>0 → +4</td>
              <td>Combustion</td>
            </tr>
            <tr>
              <td>H2O2 → O2 + H2O</td>
              <td>-1 → 0</td>
              <td>Decomposition</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="oxidation-section">
        <h2>Further Learning</h2>
        <p>
          Oxidation reactions are not only central to chemistry but also crucial for biology, environmental science, 
          and energy applications. Understanding these reactions helps in designing safer chemicals, improving battery 
          technologies, and analyzing environmental processes.
        </p>
        <a
          href="https://en.wikipedia.org/wiki/Oxidation"
          target="_blank"
          rel="noreferrer"
          className="research-link"
        >
          Learn more about Oxidation
        </a>
      </section>
    </div>
  );
};

export default OxidationReduction;
