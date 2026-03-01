import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function ChemicalModal({ tool, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>

        <div className="tool-display">
          <Canvas style={{ width: 300, height: 300 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 0, 5]} />
            <mesh>
              <boxGeometry args={[1, 1, 1]} /> {/* ده مجرد مثال */}
              <meshStandardMaterial color="orange" />
            </mesh>
            <OrbitControls enableZoom={true} />
          </Canvas>

          <div className="tool-info">
            <h1>{tool.name}</h1>
            <p>{tool.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}