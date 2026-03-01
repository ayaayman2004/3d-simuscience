import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import photochemicalVideo from "../assets/photochemical.mp4";

const Photochemical = () => {
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
          src={photochemicalVideo}
          autoPlay
          muted
          loop
          className="full-video"
          width="100%"
          height="100%"
        />
        <div className="video-overlay">
          <h1>Photochemical Reaction (التفاعل الضوئي)</h1>
          <p>
            Photochemical reactions are chemical reactions initiated by light. 
            They play a crucial role in processes like photosynthesis, photopolymerization, and environmental chemistry. 
            Understanding these reactions helps in designing light-driven chemical processes and solar energy applications.
          </p>
          <button onClick={goToLabHandler}>Go to Chemistry Lab</button>
        </div>
      </div>

      {/* DETAILED SECTIONS */}
      <section className="oxidation-section">
        <h2>Definition</h2>
        <p>
          A photochemical reaction is a chemical reaction that occurs when molecules absorb light energy, typically UV or visible light, 
          leading to electronic excitation and subsequent chemical change. 
          These reactions are fundamental in chemistry, biology, and materials science.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Mechanism</h2>
        <p>
          Photons are absorbed by molecules, exciting electrons to higher energy states. 
          This can cause bond cleavage, radical formation, or electron transfer, initiating a chemical reaction. 
          The pathway depends on the molecule, wavelength of light, and presence of photosensitizers.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Examples</h2>
        <ul>
          <li>Formation of ozone: O₂ + hv → 2O</li>
          <li>Photosynthesis in plants: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂</li>
          <li>Photodegradation of silver halides in photography.</li>
          <li>Photochemical smog formation: NO₂ + sunlight → NO + O</li>
          <li>UV-initiated polymerization of resins and coatings.</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Experimental Procedure</h2>
        <ol>
          <li>Wear proper PPE including UV protection if needed.</li>
          <li>Use a controlled light source of specific wavelength.</li>
          <li>Prepare reaction mixture in transparent containers.</li>
          <li>Expose the sample to light for a specific duration.</li>
          <li>Observe changes such as color shift, precipitation, or gas evolution.</li>
          <li>Document all observations and handle chemicals safely.</li>
        </ol>
      </section>

      <section className="oxidation-section safety">
        <h2>Safety Tips</h2>
        <ul>
          <li>Avoid direct exposure to UV light to prevent skin or eye damage.</li>
          <li>Use protective shields or goggles for high-intensity light sources.</li>
          <li>Handle all reactants carefully, especially photosensitive compounds.</li>
          <li>Dispose of photochemically reactive substances according to regulations.</li>
        </ul>
      </section>

      <section className="oxidation-section">
        <h2>Applications</h2>
        <p>
          Photochemical reactions are used in organic synthesis, solar energy conversion, environmental remediation, and the production of light-sensitive materials. 
          They are also key in studying molecular mechanisms in biochemistry and photobiology.
        </p>
      </section>

      <section className="oxidation-section">
        <h2>Further Reading</h2>
        <a
          href="https://en.wikipedia.org/wiki/Photochemistry"
          target="_blank"
          rel="noreferrer"
          className="research-link"
        >
          Learn more about Photochemical Reactions
        </a>
      </section>
    </div>
  );
};

export default Photochemical;