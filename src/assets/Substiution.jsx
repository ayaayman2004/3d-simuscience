// src/experiments/OxidationReduction.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
// import experimentVideo from "../assets/oxidation_reduction.mp4"; // ضعي فيديو التجربة هنا

export default function Substiution() {
  const navigate = useNavigate();

  const goToLab = () => {
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

  return (
    <div className="experiment-page">
      <h1>Oxidation-Reduction Experiment</h1>

      <div className="experiment-video-container">
        {/* <video src={experimentVideo} controls width="100%" /> */}
      </div>

      <section className="experiment-description">
        <h2>About This Experiment</h2>
        <p>
          This experiment demonstrates the principles of oxidation and reduction (redox reactions). 
          You will observe electron transfer between substances, which is fundamental in chemistry. 
        </p>
        <p>
          ⚠️ Safety: This experiment is <strong>moderately safe</strong> when proper precautions are followed. 
          Always wear protective equipment and handle chemicals carefully.
        </p>

        <h3>Learn More:</h3>
        <p>
          You can read more about Oxidation-Reduction reactions in this 
          <a href="https://en.wikipedia.org/wiki/Redox" target="_blank" rel="noopener noreferrer">
            Wikipedia article
          </a>.
        </p>

        <button onClick={goToLab} className="experiment-btn">
          Go to Lab
        </button>
      </section>
    </div>
  );
}