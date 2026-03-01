import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import video1 from "./assets/img1.mp4";
import video2 from "./assets/img2.mp4";
import video3 from "./assets/img3.mp4";
 import oxidationVideo from "./assets/oxidation.mp4";
 import additionVideo from "./assets/Addition.mp4";
 import catalyticVideo from "./assets/Catalystic.mp4";
 import compositionVideo from "./assets/Compustionofhydro.mp4";
 import condensationVideo from "./assets/condinsation.mp4"; 
 import combustionVideo from "./assets/Combu.mp4";
 import decompositionVideo from "./assets/decomposition.mp4";
 import disproportionationVideo from "./assets/desproparation.mp4"; 
 import doubleReplacementVideo from "./assets/doubledisplacement.mp4"; 
 import hydrolysisVideo from "./assets/hydro.mp4"; 
 import neutralizationVideo from "./assets/neutrilization.mp4";
 import redoxVideo from "./assets/redox.mp4";
 import singleReplacementVideo from "./assets/singlereplacement.mp4";
 import photochemicalVideo from "./assets/photochemical.mp4";
 import precipitationVideo from "./assets/preception.mp4";
 import polymerizationVideo from "./assets/polymeriation.mp4";
export default function Home() {
  const navigate = useNavigate();

  // كل تجربة عندها دالة navigate خاصة
  const goToExperiment1 = () => navigate("/oxidation-reduction");
  const goToExperiment2 = () => navigate("/Addition");
  const goToExperiment3 = () => navigate("/Catalytic");
  const goToExperiment4 = () => navigate("/Compustionofhydro");
  const goToExperiment5 = () => navigate("/Condinsation");
  const goToExperiment6 = () => navigate("/Cumbustion");
  const goToExperiment7 = () => navigate("/Decomposition");
  const goToExperiment8 = () => navigate("/Disproportionation");
  const goToExperiment9 = () => navigate("/DoubleReplacment");
  const goToExperiment10 = () => navigate("/Hydrolysis");
  const goToExperiment11 = () => navigate("/Neutrlization");
  const goToExperiment12 = () => navigate("/Redox");
  const goToExperiment13 = () => navigate("/SingleReplacement");
  const goToExperiment14 = () => navigate("/photochmical");
  const goToExperiment15 = () => navigate("/preceptition");
  const goToExperiment16 = () => navigate("/polymerization"); 
  // const goToExperiment17 = () => navigate("/AcideBasereaction");//11
  // const goToExperiment18 = () => navigate("/compination");
  // const goToExperiment19 = () => navigate("/Electrolysis");
  // const goToExperiment20 = () => navigate("/Substiution");////1

  const goToLab = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      const hasAccount = window.confirm(
        "You are not logged in. Do you already have an account?"
      );
      if (hasAccount) navigate("/login", { state: { redirectToLab: true } });
      else navigate("/register", { state: { redirectToLab: true } });
    } else {
      navigate("/LabScene");
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.2 }
    );

    document
      .querySelectorAll(".about-chemistry, .experiments-section, .hero-overlay")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-container">
      <div className="hero-video">
        <video src={video2} autoPlay loop muted />
        <div className="hero-overlay">
          <h1>Welcome to Chemistry Lab</h1>
          <p>Discover chemical experiments, explore compounds in 3D, and learn interactively!</p>
          <button onClick={goToLab} className="enter-lab-btn">Go to Experiments</button>
        </div>
      </div>

      <section className="about-chemistry">
        <h2 className="section-title">About Chemistry Lab</h2>
        <p className="section-description">
          Chemistry Lab is an interactive platform to explore the fascinating world of chemistry.
          Here you can learn about different types of chemical reactions, observe experiments in 3D, 
          and enhance your understanding with hands-on simulations.
        </p>

        <h3 className="section-subtitle">Types of Chemical Reactions</h3>
        <ul className="reactions-list">
          <li><strong>Combination:</strong> Two or more substances combine to form a single product.</li>
          <li><strong>Decomposition:</strong> A single compound breaks down into two or more simpler substances.</li>
          <li><strong>Single Replacement:</strong> An element replaces another in a compound.</li>
          <li><strong>Double Replacement:</strong> Exchange of ions between two compounds.</li>
          <li><strong>Combustion:</strong> A substance reacts with oxygen releasing energy in the form of light or heat.</li>
        </ul>
      </section>

      <section className="experiments-section">
        <h2 className="section-title">Our Experiments</h2>
        <div className="experiments-container">

          <div className="experiment-card" onClick={goToExperiment1}>
            <video src={oxidationVideo} autoPlay loop muted className="experiment-video" />
            <div className="experiment-overlay">
            <h1>Oxidation-Reduction</h1>
    <p>A chemical reaction where oxidation and reduction occur simultaneously.</p>
  </div>
          </div>

          <div className="experiment-card" onClick={goToExperiment2}>
            <video src={additionVideo} autoPlay loop muted className="experiment-video" />
            <div className="experiment-overlay">
            <h1>Addition Reaction</h1>
  <p>Two or more reactants combine to form a single product.</p>
</div>

          </div>

          <div className="experiment-card" onClick={goToExperiment3}>
            <video src={catalyticVideo} autoPlay loop muted className="experiment-video" />
            <div className="experiment-overlay">
            <h1>Catalytic Reaction</h1>
  <p>Reaction accelerated by a catalyst without being consumed.</p>
</div>
          </div>

          <div className="experiment-card" onClick={goToExperiment4}>
            <video src={compositionVideo} autoPlay loop muted className="experiment-video" />
            <div className="experiment-overlay">
            <h1>Combustion of Hydrocarbons</h1>
  <p>Hydrocarbon reacts with oxygen releasing energy in the form of heat and light.</p>
</div>
          </div>

          <div className="experiment-card" onClick={goToExperiment5}>
            <video src={condensationVideo} autoPlay loop muted className="experiment-video" />
            <div className="experiment-overlay">
            <h1>Condensation Reaction</h1>
  <p>Two molecules combine to form a larger molecule with the release of water.</p>
</div>
          </div>

          {/* تابع نفس الطريقة لباقي التجارب */}
          <div className="experiment-card" onClick={goToExperiment6}>
            <video src={combustionVideo} autoPlay loop muted className="experiment-video" />
            <div className="experiment-overlay">
            <video src={combustionVideo} autoPlay loop muted />
  <h1>Combustion</h1>
  <p>Substance reacts with oxygen producing heat and light.</p>
</div>
          </div>

          <div className="experiment-card" onClick={goToExperiment7}>
            <video src={decompositionVideo} autoPlay loop muted className="experiment-video" />
            <div className="experiment-overlay">
            <h1>Decomposition Reaction</h1>
  <p>A single compound breaks down into simpler substances.</p>
</div>
          </div>

          <div className="experiment-card" onClick={goToExperiment8}>
            <video src={disproportionationVideo} autoPlay loop muted className="experiment-video" />
            <div className="experiment-overlay">
            <h1>Disproportionation</h1>
  <p>An element in one oxidation state is simultaneously oxidized and reduced.</p>
</div>
          </div>

          <div className="experiment-card" onClick={goToExperiment9}>
            <video src={doubleReplacementVideo} autoPlay loop muted className="experiment-video" />
            <div className="experiment-overlay">
            <h1>Double Replacement</h1>
  <p>Exchange of ions between two compounds.</p>
</div>
          </div>

          <div className="experiment-card" onClick={goToExperiment10}>
            <video src={hydrolysisVideo} autoPlay loop muted className="experiment-video" />
            <div className="experiment-overlay">
            <h1>Hydrolysis</h1>
  <p>Water breaks chemical bonds in a compound.</p>
</div>

          </div>

          <div className="experiment-card" onClick={goToExperiment11}>
            <video src={neutralizationVideo} autoPlay loop muted className="experiment-video" />
            <div className="experiment-overlay">
            <h1>Neutralization</h1>
  <p>Acid reacts with base to form salt and water.</p>
</div>
          </div>

          <div className="experiment-card" onClick={goToExperiment12}>
            <video src={redoxVideo} autoPlay loop muted className="experiment-video" />
            <div className="experiment-overlay">
            <h1>Redox Reaction</h1>
  <p>Electron transfer between two substances.</p>
</div>
          </div>

          <div className="experiment-card" onClick={goToExperiment13}>
            <video src={singleReplacementVideo} autoPlay loop muted className="experiment-video" />
            <div className="experiment-overlay">
            <h1>Single Replacement</h1>
  <p>An element replaces another element in a compound.</p>
</div>
          </div>

          <div className="experiment-card" onClick={goToExperiment14}>
            <video src={photochemicalVideo} autoPlay loop muted className="experiment-video" />
            <div className="experiment-overlay">
            <h1>Photochemical Reaction</h1>
  <p>Reaction initiated by light energy.</p>
</div>

          </div>

          <div className="experiment-card" onClick={goToExperiment15}>
            <video src={precipitationVideo} autoPlay loop muted className="experiment-video" />
            <div className="experiment-overlay">
            <h1>Precipitation Reaction</h1>
  <p>Formation of an insoluble solid from two solutions.</p>
</div>
          </div>

          <div className="experiment-card" onClick={goToExperiment16}>
            <video src={polymerizationVideo} autoPlay loop muted className="experiment-video" />
            <div className="experiment-overlay">
            <h1>Polymerization</h1>
  <p>Monomers join to form a polymer chain.</p>
</div>
          </div>
 </div>
      </section>
    </div>
  );
}
 