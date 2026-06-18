import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import tool1 from "./beaker-removebg-preview.png";
import tool2 from "./flask.png";
import tool3 from "./bureette.png";
import tool4 from "./test_tubejpg-removebg-preview.png";
import tool5 from "./bunsenburner.png";
import tool6 from "./balancejpg-removebg-preview.png";
import tool7 from "./thermometerjpg-removebg-preview.png";
import tool8 from "./pipettejpg-removebg-preview.png";

const tools = [
  { id: 1, name: "Beaker",        image: tool1, description: "Used to hold and mix liquids." },
  { id: 2, name: "Flask",         image: tool2, description: "Used for mixing and heating solutions." },
  { id: 3, name: "Burette",       image: tool3, description: "Measures precise liquid volumes." },
  { id: 4, name: "Test Tube",     image: tool4, description: "Used for small-scale reactions." },
  { id: 5, name: "Bunsen Burner", image: tool5, description: "Produces a single open gas flame." },
  { id: 6, name: "Balance",       image: tool6, description: "Measures mass very accurately." },
  { id: 7, name: "Thermometer",   image: tool7, description: "Measures the temperature." },
  { id: 8, name: "Pipette",       image: tool8, description: "Transports measured volumes." },
];

const CARD_W = 200;
const GAP    = 30;
const TOTAL  = (CARD_W + GAP) * tools.length;

export default function ChemicalTools() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [paused, setPaused] = useState(false);

  const tripled = [...tools, ...tools, ...tools];

  return (
    <div className="mq-container">
      <style>{`
        .mq-container {
          min-height: 50vh;
          background: #04060f;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: clamp(24px, 5vw, 48px) 0;
        }

        .mq-title {
          color: #00d4ff;
          font-size: clamp(1.4rem, 5vw, 2.5rem);
          margin: 0 0 clamp(20px, 4vw, 40px);
          text-transform: uppercase;
          letter-spacing: clamp(2px, 1vw, 6px);
          text-shadow: 0 0 20px rgba(0,212,255,0.3);
          text-align: center;
          padding: 0 16px;
        }

        /* الـ window هو الوحيد اللي بيقص المحتوى */
        .mq-window {
          width: 100%;
          overflow: hidden;
          position: relative;
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          mask-image:         linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }

        /* CSS animation بدل Framer Motion x لأنه أكثر دقة مع الـ marquee */
        .mq-track {
          display: flex;
          gap: ${GAP}px;
          padding: 20px 0;
          width: max-content;
          animation: mqScroll ${tools.length * 3.5}s linear infinite;
          will-change: transform;
        }
        .mq-track.paused { animation-play-state: paused; }

        @keyframes mqScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${TOTAL}px); }
        }

        .mq-card {
          width: ${CARD_W}px;
          flex-shrink: 0;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(0,212,255,0.1);
          backdrop-filter: blur(10px);
          border-radius: clamp(12px, 2vw, 20px);
          padding: clamp(14px, 2vw, 20px);
          text-align: center;
          cursor: pointer;
          transition: border-color 0.3s, background 0.3s, transform 0.3s, box-shadow 0.3s;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }
        .mq-card:hover {
          border-color: rgba(0,212,255,0.5);
          background: rgba(0,212,255,0.05);
          transform: translateY(-10px) scale(1.05);
          box-shadow: 0 10px 30px rgba(0,212,255,0.2);
        }
        .mq-card img {
          width: clamp(70px, 12vw, 100px);
          height: clamp(70px, 12vw, 100px);
          object-fit: contain;
          margin-bottom: 12px;
          filter: drop-shadow(0 0 10px rgba(0,212,255,0.2));
          pointer-events: none;
        }
        .mq-card h3 {
          color: #fff;
          font-size: clamp(0.85rem, 2.5vw, 1.1rem);
          margin: 0;
        }

        /* Modal */
        .mq-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5000;
          padding: 20px;
        }
        .mq-modal {
          background: #0d1530;
          padding: clamp(24px, 5vw, 40px);
          border-radius: clamp(16px, 3vw, 30px);
          border: 1px solid #00d4ff;
          text-align: center;
          width: 100%;
          max-width: 380px;
        }
        .mq-modal img {
          width: clamp(100px, 25vw, 150px);
          object-fit: contain;
          margin-bottom: 12px;
        }
        .mq-modal h2 {
          color: #00d4ff;
          font-size: clamp(1.2rem, 4vw, 1.6rem);
          margin: 0 0 10px;
        }
        .mq-modal p {
          color: #a8c0d8;
          font-size: clamp(0.85rem, 2.5vw, 1rem);
          margin: 0 0 20px;
          line-height: 1.5;
        }
        .mq-close-btn {
          padding: clamp(8px, 2vw, 10px) clamp(20px, 4vw, 28px);
          border-radius: 20px;
          border: none;
          background: #00d4ff;
          color: #04060f;
          font-weight: 700;
          font-size: clamp(0.85rem, 2.5vw, 1rem);
          cursor: pointer;
        }
        .mq-close-btn:hover { background: #00b8e0; }

        @media (prefers-reduced-motion: reduce) {
          .mq-track { animation-duration: 60s; }
        }
      `}</style>

      <h2 className="mq-title">Laboratory Gear</h2>

      <div
        className="mq-window"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div className={`mq-track ${paused ? "paused" : ""}`}>
          {tripled.map((tool, i) => (
            <div key={i} className="mq-card" onClick={() => setSelectedTool(tool)}>
              <img src={tool.image} alt={tool.name} />
              <h3>{tool.name}</h3>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedTool && (
          <motion.div
            className="mq-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTool(null)}
          >
            <motion.div
              className="mq-modal"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0,  opacity: 1 }}
              exit={{ y: 40,    opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 260 }}
              onClick={e => e.stopPropagation()}
            >
              <img src={selectedTool.image} alt={selectedTool.name} />
              <h2>{selectedTool.name}</h2>
              <p>{selectedTool.description}</p>
              <button className="mq-close-btn" onClick={() => setSelectedTool(null)}>Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
