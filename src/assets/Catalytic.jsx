import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import catalyticVideo from "../assets/Catalystic.mp4"; // الفيديو الخاص بـ Catalytic Reaction

const Catalytic = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

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
          src={catalyticVideo}
          autoPlay
          muted
          loop
          className="full-video"
          onClick={() => setModalOpen(true)}
        />
        <div className="video-overlay">
          <h1>Catalytic Reaction </h1>
          <p>
            Catalytic reactions are chemical reactions accelerated by catalysts, 
            substances that increase the reaction rate without being consumed. Catalysts are widely 
            used in industry, environmental chemistry, and energy production.
          </p>
          <button onClick={goToLabHandler}>Go to Chemistry Lab</button>
          <p style={{fontSize: '0.9rem', marginTop: '10px', color: '#fff'}}>Click on video to watch full-screen</p>
        </div>
      </div>

      {/* MODAL VIDEO */}
      {modalOpen && (
        <div className="video-modal">
          <div className="modal-content">
            <span className="modal-close" onClick={() => setModalOpen(false)}>
              &times;
            </span>
            <video src={catalyticVideo} controls autoPlay className="modal-video" />
          </div>
        </div>
      )}

      {/* DETAILED SECTIONS */}
      <section className="oxidation-section">
        <h2>Definition</h2>
        <p>
          A catalytic reaction involves a catalyst that provides an alternative pathway with lower activation energy, 
          allowing the reaction to proceed faster. Catalysts are not consumed in the reaction and can be reused. 
          They are crucial in speeding up industrial processes and making reactions more energy-efficient.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Mechanism</h2>
        <p>
          Catalysts work by adsorbing reactants onto their surface, bringing them close together to facilitate bond breaking 
          and formation. In biological systems, enzymes are natural catalysts that enable biochemical reactions to occur efficiently 
          at mild conditions. Catalytic mechanisms can involve intermediate species, surface reactions, or electron transfer.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Common Examples</h2>
        <ul>
          <li>Hydrogenation of alkenes using palladium or platinum catalysts.</li>
          <li>Decomposition of hydrogen peroxide using manganese dioxide.</li>
          <li>Industrial Haber process for ammonia synthesis using iron catalyst.</li>
          <li>Oxidation of carbon monoxide in catalytic converters in cars.</li>
          <li>Enzymatic catalysis in biological systems (e.g., catalase).</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Experimental Procedure</h2>
        <ol>
          <li>Wear proper PPE (gloves, goggles, lab coat).</li>
          <li>Use small amounts of reactants and catalyst.</li>
          <li>Observe reaction rate, color changes, gas evolution, and heat.</li>
          <li>Document all observations carefully.</li>
          <li>Clean equipment and dispose of chemicals safely.</li>
        </ol>
      </section>

      <section className="oxidation-section safety">
        <h2>Safety Tips</h2>
        <ul>
          <li>Handle all catalysts and chemicals with care; some may be toxic or reactive.</li>
          <li>Always perform reactions in a ventilated area or fume hood.</li>
          <li>Wear protective gear and follow lab protocols.</li>
          <li>Be aware of exothermic reactions that release heat quickly.</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Reaction Table</h2>
        <table className="reaction-table">
          <thead>
            <tr>
              <th>Reactants</th>
              <th>Catalyst</th>
              <th>Product</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>H2 + C2H4</td>
              <td>Pd</td>
              <td>C2H6</td>
            </tr>
            <tr>
              <td>2H2O2</td>
              <td>MnO2</td>
              <td>2H2O + O2</td>
            </tr>
            <tr>
              <td>N2 + 3H2</td>
              <td>Fe</td>
              <td>2NH3</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="oxidation-section">
        <h2>Further Reading</h2>
        <p>
          Catalytic reactions are essential in chemical industries, energy production, and biochemistry. 
          Understanding how catalysts work allows chemists to improve reaction efficiency, reduce energy consumption, 
          and design greener chemical processes.
        </p>
        <a
          href="https://en.wikipedia.org/wiki/Catalysis"
          target="_blank"
          rel="noreferrer"
          className="research-link"
        >
          Learn more about Catalytic Reactions
        </a>
      </section>
    </div>
  );
};

export default Catalytic;