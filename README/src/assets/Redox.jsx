import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import redoxVideo from "../assets/redox.mp4"; 
// تأكدي إن الفيديو موجود في assets

const Redox = () => {
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
          src={redoxVideo}
          autoPlay
          muted
          loop
          className="full-video"
        />
        <div className="video-overlay">
          <h1>Redox Reaction</h1>
          <p>
            Redox reactions involve the transfer of electrons between substances.
            Oxidation and reduction always occur together and are fundamental to
            energy production, corrosion, metabolism, and industrial chemistry.
          </p>
          <button onClick={goToLabHandler}>Go to Chemistry Lab</button>
        </div>
      </div>

      {/* CONTENT */}
      <section className="oxidation-section">
        <h2>What is a Redox Reaction?</h2>
        <p>
          A redox reaction (reduction–oxidation reaction) is a chemical reaction
          in which electrons are transferred from one substance to another.
          Oxidation involves loss of electrons, while reduction involves gain of
          electrons.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Oxidation and Reduction</h2>
        <p>
          Oxidation is defined as the loss of electrons or increase in oxidation
          number. Reduction is the gain of electrons or decrease in oxidation
          number. These processes cannot occur independently and always happen
          simultaneously.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Oxidation Numbers</h2>
        <p>
          Oxidation numbers are used to track electron transfer. By comparing the
          oxidation states of elements before and after the reaction, we can
          identify which substance is oxidized and which is reduced.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Common Examples</h2>
        <ul>
          <li>Rusting of iron: Fe + O₂ → Fe₂O₃</li>
          <li>Combustion reactions involving oxygen</li>
          <li>Respiration in living organisms</li>
          <li>Photosynthesis in plants</li>
          <li>Electrochemical cells and batteries</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>General Redox Equation</h2>
        <p>
          Oxidation: Zn → Zn²⁺ + 2e⁻  
        </p>
        <p>
          Reduction: Cu²⁺ + 2e⁻ → Cu  
        </p>
        <p>
          Overall Reaction: Zn + Cu²⁺ → Zn²⁺ + Cu
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Experimental Procedure</h2>
        <ol>
          <li>Wear safety goggles and gloves.</li>
          <li>Prepare metal strips and salt solutions.</li>
          <li>Place metal in solution and observe changes.</li>
          <li>Record color changes or deposits.</li>
          <li>Clean and dispose of materials safely.</li>
        </ol>
      </section>

      <section className="oxidation-section safety">
        <h2>Safety Precautions</h2>
        <ul>
          <li>Avoid direct contact with metal salts.</li>
          <li>Do not inhale fumes from reactions.</li>
          <li>Use small quantities for experiments.</li>
          <li>Follow laboratory safety rules.</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Reaction Table</h2>
        <table className="reaction-table">
          <thead>
            <tr>
              <th>Substance</th>
              <th>Oxidation State Change</th>
              <th>Process</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Fe → Fe³⁺</td>
              <td>0 → +3</td>
              <td>Oxidation</td>
            </tr>
            <tr>
              <td>Cu²⁺ → Cu</td>
              <td>+2 → 0</td>
              <td>Reduction</td>
            </tr>
            <tr>
              <td>Zn → Zn²⁺</td>
              <td>0 → +2</td>
              <td>Oxidation</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="oxidation-section">
        <h2>Importance of Redox Reactions</h2>
        <p>
          Redox reactions are essential in chemistry and daily life. They are
          involved in energy generation, corrosion prevention, metallurgy,
          biological processes, and environmental systems.
        </p>
        <a
          href="https://en.wikipedia.org/wiki/Redox"
          target="_blank"
          rel="noreferrer"
          className="research-link"
        >
          Learn more about Redox Reactions
        </a>
      </section>
    </div>
  );
};

export default Redox;
