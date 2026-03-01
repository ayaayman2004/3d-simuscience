import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import additionVideo from "../assets/Addition.mp4";

const Addition = () => {
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
      navigate("/lab");
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
          src={additionVideo}
          autoPlay
          muted
          loop
          className="full-video"
          width="100%"
          height="100px"
        />
        <div className="video-overlay">
          <h1>Addition Reaction  </h1>
          <p>
            Addition reactions involve adding two or more reactants to form a single product. 
            They are widely used in organic chemistry to build complex molecules from simpler ones. 
            Understanding these reactions is crucial for industrial applications, pharmaceuticals, and polymer production.
          </p>
          <button onClick={goToLabHandler}>Go to Chemistry Lab</button>
        </div>
      </div>

      {/* DETAILED SECTIONS */}
      <section className="oxidation-section">
        <h2>Definition</h2>
        <p>
          An addition reaction is a chemical reaction in which atoms or groups of atoms are added to a molecule, usually across a double or triple bond. 
          This type of reaction increases the saturation of the molecule. 
          Typical addition reactions include hydrogenation, halogenation, hydrohalogenation, and hydration. 
          Addition reactions are key in synthetic chemistry, allowing the formation of more complex molecules from simpler ones.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Mechanism</h2>
        <p>
          Most addition reactions involve the breaking of a pi bond in an unsaturated compound, allowing reactants to attach to the carbons. 
          For example, in hydrogenation, H₂ is added across a double bond in the presence of a catalyst such as Pd, Pt, or Ni. 
          Mechanisms may involve intermediate carbocations, radicals, or concerted steps, depending on the reaction. 
          Understanding the mechanism is essential for predicting products and optimizing conditions.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Examples</h2>
        <ul>
          <li>Hydrogenation of ethene: C₂H₄ + H₂ → C₂H₆</li>
          <li>Bromination of alkenes: C₂H₄ + Br₂ → C₂H₄Br₂</li>
          <li>Hydration of ethene: C₂H₄ + H₂O → C₂H₅OH</li>
          <li>Addition of HCl to propene: CH₃CH=CH₂ + HCl → CH₃CHClCH₃</li>
          <li>Formation of cyclohexane from benzene under catalytic hydrogenation.</li>
          <li>Addition of hydrogen halides to alkynes to form haloalkenes.</li>
          <li>Epoxidation and dihydroxylation reactions in organic synthesis.</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Experimental Procedure</h2>
        <ol>
          <li>Wear proper personal protective equipment (PPE).</li>
          <li>Set up small-scale reactions under controlled lab conditions.</li>
          <li>Use catalysts appropriately for specific addition reactions.</li>
          <li>Observe reaction carefully, noting color changes, gas evolution, temperature variations.</li>
          <li>Record all observations in a lab notebook.</li>
          <li>Dispose of chemical waste according to safety regulations.</li>
        </ol>
      </section>

      <section className="oxidation-section safety">
        <h2>Safety Tips</h2>
        <ul>
          <li>Handle chemicals, especially halogens and acids, with caution.</li>
          <li>Conduct reactions in well-ventilated areas or under fume hoods.</li>
          <li>Avoid ignition sources near hydrogen gas or flammable reagents.</li>
          <li>Small-scale experiments minimize hazards and are easier to control.</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Reaction Table</h2>
        <table className="reaction-table">
          <thead>
            <tr>
              <th>Reactants</th>
              <th>Product</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>C₂H₄ + H₂</td>
              <td>C₂H₆</td>
              <td>Hydrogenation</td>
            </tr>
            <tr>
              <td>C₂H₄ + Br₂</td>
              <td>C₂H₄Br₂</td>
              <td>Bromination</td>
            </tr>
            <tr>
              <td>C₂H₄ + H₂O</td>
              <td>C₂H₅OH</td>
              <td>Hydration</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="oxidation-section">
        <h2>Further Reading</h2>
        <p>
          Addition reactions are fundamental in organic synthesis, drug development, and polymer production. 
          Understanding these reactions allows chemists to design molecules with desired properties and to optimize industrial processes.
        </p>
        <a
          href="https://en.wikipedia.org/wiki/Addition_reaction"
          target="_blank"
          rel="noreferrer"
          className="research-link"
        >
          Learn more about Addition Reactions
        </a>
      </section>
    </div>
  );
};

export default Addition;