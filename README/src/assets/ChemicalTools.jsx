
import React, { useState } from "react";

// 🔹 Images - استبدلي tool1.jpg ... tool10.jpg بالصور الحقيقية بتاعتك
import tool1 from "./beaker-removebg-preview.png";
import tool2 from "./flask.png";
import tool3 from "./bureette.png";
import tool4 from "./test_tubejpg-removebg-preview.png";
import tool5 from "./bunsenburner.png";
import tool6 from "./balancejpg-removebg-preview.png";
import tool7 from "./thermometerjpg-removebg-preview.png";
import tool8 from "./pipettejpg-removebg-preview.png";
import tool9 from "./funnel-removebg-preview.png";
import tool10 from "./microscope-removebg-preview.png";
import tool11 from "./cylinderjpg-removebg-preview.png";
import tool12 from "./ptridishjpg.jpg";

 
// 🔹 Images - استبدلي tool1.jpg ... tool10.jpg بالصور الحقيقية بتاعتك
 

 

 

 

const tools = [
  { id: 1, name: "Beaker", image: tool1, description: "Used to hold and mix liquids. Essential for basic lab work." },
  { id: 2, name: "Flask", image: tool2, description: "Used for mixing and heating solutions. Types include Erlenmeyer and round-bottom." },
  { id: 3, name: "Burette", image: tool3, description: "Measures precise liquid volumes during titrations." },
  { id: 4, name: "Test Tube", image: tool4, description: "Holds small chemical samples for reactions and heating." },
  { id: 5, name: "Bunsen Burner", image: tool5, description: "Provides a flame for heating, sterilization, and combustion." },
  { id: 6, name: "Balance", image: tool6, description: "Measures mass accurately. Can be digital or mechanical." },
  { id: 7, name: "Thermometer", image: tool7, description: "Measures temperature in experiments." },
  { id: 8, name: "Pipette", image: tool8, description: "Transfers small, precise amounts of liquid." },
  { id: 9, name: "Funnel", image: tool9, description: "Helps pour liquids safely and can be used with filter paper." },
  { id: 10, name: "Microscope", image: tool10, description: "Observes tiny objects, cells, and microorganisms." },
  { id: 11, name: "Graduated Cylinder", image: tool11, description: "Measures the volume of liquids accurately." },
  { id: 12, name: "Petri Dish", image: tool12, description: "Used to culture cells, bacteria, or small plants." }
];

export default function ChemicalTools() {
  const [selectedTool, setSelectedTool] = useState(null);

  return (
    <div style={styles.page}>
      <h1 className="ci">Chemical Laboratory Tools</h1>

      {/* Grid الأدوات */}
      <div style={styles.grid}>
        {tools.map(tool => (
          <div key={tool.id} style={styles.card} onClick={() => setSelectedTool(tool)}>
            <img src={tool.image} alt={tool.name} style={styles.cardImg} />
            <h3>{tool.name}</h3>
          </div>
        ))}
      </div>

      {/* Overlay */}
      {selectedTool && (
        <div style={styles.overlay} onClick={() => setSelectedTool(null)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <button style={styles.closeBtn} onClick={() => setSelectedTool(null)}>✖</button>

            <div style={styles.content}>
              <img src={selectedTool.image} alt={selectedTool.name} style={styles.toolImg} />
              <div style={styles.textContent}>
                <h2>{selectedTool.name}</h2>
                <p>{selectedTool.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 🎨 Styles
const styles = {
  page: { padding: "20px", textAlign: "center" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "20px", marginTop: "20px" },
  card: { padding: "15px", background: "#f5f5f5", borderRadius: "10px", cursor: "pointer" },
  cardImg: { width: "100px", height: "100px", objectFit: "contain" },
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center" },
  modal: { background: "rgba(255,255,255,0.95)", borderRadius: "15px", padding: "20px", width: "70%", maxWidth: "700px", textAlign: "left", position: "relative" },
  closeBtn: { position: "absolute", top: "10px", right: "10px", border: "none", background: "none", fontSize: "20px", cursor: "pointer" },
  content: { display: "flex", flexDirection: "row", gap: "20px", alignItems: "center" }, // النص جنب الصورة
  textContent: { flex: 1 }, // النص ياخد المساحة المتبقية
  toolImg: { width: "300px", borderRadius: "10px" }
};