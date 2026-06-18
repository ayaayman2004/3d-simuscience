import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import singleReplacementVideo from "../assets/singlereplacement.mp4";

const SingleReplacement = () => {
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
          src={singleReplacementVideo}
          autoPlay
          muted
          loop
          className="full-video"
          width="100%"
          height="100%"
        />
        <div className="video-overlay">
          <h1>Single Replacement Reaction (تفاعل الاستبدال الأحادي)</h1>
          <p>
            Single replacement reactions occur when a more reactive element replaces a less reactive element in a compound. 
            These reactions are common in metal–acid reactions, metal–salt solutions, and halogen displacement. 
            They are crucial in inorganic chemistry, metallurgy, and electrochemistry.
          </p>
          <button onClick={goToLabHandler}>Go to Chemistry Lab</button>
        </div>
      </div>

      {/* DETAILED SECTIONS */}
      <section className="oxidation-section">
        <h2>Definition</h2>
        <p>
          A single replacement reaction, also called single displacement, is a chemical reaction in which one element replaces another in a compound. 
          The reaction only occurs if the free element is more reactive than the element it displaces. 
          These reactions are essential in predicting outcomes of redox reactions and metal extraction.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>General Equation</h2>
        <p>
          General formula: <strong>A + BC → AC + B</strong> <br />
          Element A replaces element B in compound BC if A is more reactive than B.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Examples</h2>
        <ul>
          <li>Zn + CuSO₄ → ZnSO₄ + Cu</li>
          <li>Fe + 2HCl → FeCl₂ + H₂</li>
          <li>Cl₂ + 2KBr → 2KCl + Br₂</li>
          <li>Mg + H₂SO₄ → MgSO₄ + H₂</li>
          <li>Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Reactivity Series</h2>
        <p>
          The reactivity series ranks metals by their ability to replace other metals in compounds. 
          Metals higher in the series can displace metals below them from solutions.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Reaction Mechanism</h2>
        <p>
          Single replacement reactions are redox reactions: the free element is oxidized and the displaced element is reduced. 
          For example, Zn + CuSO₄ → ZnSO₄ + Cu involves Zn oxidized, Cu reduced.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Experimental Procedure</h2>
        <ol>
          <li>Wear protective equipment (gloves, goggles, lab coat).</li>
          <li>Prepare a dilute solution of a metal salt in a test tube.</li>
          <li>Add a strip of a more reactive metal to the solution.</li>
          <li>Observe color change, solid formation, or gas evolution.</li>
          <li>Record all observations and compare with predictions.</li>
          <li>Dispose of chemical waste safely.</li>
        </ol>
      </section>

      <section className="oxidation-section safety">
        <h2>Safety Tips</h2>
        <ul>
          <li>Avoid direct contact with acids and metal salts.</li>
          <li>Conduct experiments in a well-ventilated area.</li>
          <li>Use small amounts to reduce hazard.</li>
          <li>Wash hands thoroughly after handling chemicals.</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Applications</h2>
        <p>
          Single replacement reactions are used in metal extraction, batteries, corrosion prevention, and industrial synthesis. 
          They also play a key role in teaching redox chemistry and reaction prediction.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Further Reading</h2>
        <a
          href="https://en.wikipedia.org/wiki/Single-displacement_reaction"
          target="_blank"
          rel="noreferrer"
          className="research-link"
        >
          Learn more about Single Replacement Reactions
        </a>
      </section>
    </div>
  );
};

export default SingleReplacement;
