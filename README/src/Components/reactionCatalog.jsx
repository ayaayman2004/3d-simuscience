import { useState, useMemo, useEffect, useRef } from "react";
import reactionData from "../Data/csvjson (1).json";

const STATE_LABELS = {
  solid: "Solid",
  liquid: "Liquid",
  gas: "Gas",
  aqueous: "Aqueous",
};

const CONDITION_LABELS = {
  "room temperature": "Room Temp",
  "heated gently": "Heated Gently",
  "heated strongly": "Heated Strongly",
  "pressure applied": "Pressure Applied",
  "requires catalyst": "Catalyst Required",
  "spark or heat": "Spark / Heat",
};

const OBSERVATION_LABELS = {
  "no visible change": "No visible change",
  "heat released": "Heat released",
  "gas evolved": "Gas evolved",
  "white solid formed": "White solid formed",
  "color change observed": "Color change observed",
  "heat released, water formed": "Heat released + water formed",
};

function getSafetyInfo(safety) {
  if (
    safety.includes("highly reactive") ||
    safety.includes("toxic") ||
    safety.includes("flammable")
  )
    return { label: "High Risk", color: "#3d0000", text: "#ff8888", border: "#7f0000" };
  if (safety.includes("irritant") || safety.includes("reactive with water"))
    return { label: "Caution", color: "#2d2000", text: "#fcd34d", border: "#7a5c00" };
  return { label: "Low Hazard", color: "#002d1a", text: "#00ffaa", border: "#006644" };
}

function Pill({ label, bg, text, border }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: 15,
        padding: "6px 14px",
        borderRadius: 999,
        background: bg,
        color: text,
        border: `1px solid ${border}`,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

// مكون النجوم المتحركة (مطابق لباقي الصفحات)
function StarsBackground() {
  const starsRef = useRef(null);
  useEffect(() => {
    const container = starsRef.current;
    if (!container) return;
    const count = 220;
    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      star.className = "catalog-star";
      const size = Math.random() * 2.5 + 1.2;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 8}s`;
      star.style.animationDuration = `${Math.random() * 6 + 5}s`;
      star.style.opacity = Math.random() * 0.7 + 0.2;
      container.appendChild(star);
    }
    return () => { while (container.firstChild) container.removeChild(container.firstChild); };
  }, []);
  return <div ref={starsRef} className="catalog-stars" />;
}

export default function ReactionCatalog() {
  const [query, setQuery] = useState("");
  const [condition, setCondition] = useState("");
  const [productState, setProductState] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return reactionData.filter((d) => {
      const matchQ =
        !q ||
        d.reactants?.toLowerCase().includes(q) ||
        d.products?.toLowerCase().includes(q) ||
        d.equation?.toLowerCase().includes(q);
      const matchC = !condition || d.conditions === condition;
      const matchP = !productState || d.products_state === productState;
      return matchQ && matchC && matchP;
    });
  }, [query, condition, productState]);

  return (
    <div
      style={{
        padding: "2.5rem",
        fontFamily: "sans-serif",
        width: "100%",
        margin: 0,
        minHeight: "100vh",
        color: "#e0f4ff",
        background: "transparent", // أصبحت شفافة
        position: "relative",
      }}
    >
      <StarsBackground />

      <style>{`
        .catalog-stars {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: -5;
          overflow: hidden;
          background: transparent;
        }
        .catalog-stars .catalog-star {
          position: absolute;
          background: radial-gradient(circle, #ffffff, #aaddff);
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(255,255,200,0.6);
          animation: catalogStarTwinkle 6s infinite alternate;
        }
        @keyframes catalogStarTwinkle {
          0% { opacity: 0.2; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.3); }
        }
        table {
          width: 100%;
          border-collapse: collapse;
          backdrop-filter: blur(2px);
        }
        th, td {
          padding: 14px 16px;
          border-bottom: 1px solid rgba(0,212,255,0.15);
        }
        tr:hover {
          background: rgba(0,212,255,0.05);
        }
        input, select {
          background: rgba(10, 25, 45, 0.75) !important;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(0,212,255,0.3);
          transition: 0.2s;
        }
        input:focus, select:focus {
          border-color: #00d4ff;
          outline: none;
          box-shadow: 0 0 10px rgba(0,212,255,0.3);
        }
      `}</style>

      <h2 style={{ 
        fontSize: 32,     
        fontWeight: 700, 
        marginBottom: "1.5rem", 
        color: "#00d4ff",
        textShadow: "0 0 6px rgba(0,212,255,0.3)"
      }}>
        Reaction Catalog
      </h2>

      {/* Filters */}
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: "1.5rem" }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search reactant or product..."
          style={{
            flex: 1,
            minWidth: 220,
            padding: "12px 16px",
            borderRadius: 10,
            border: "1px solid rgba(0,212,255,0.3)",
            fontSize: 16,
            background: "rgba(10, 25, 45, 0.75)",
            color: "#e0f4ff",
            outline: "none",
          }}
        />
        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          style={{
            padding: "12px 16px",
            borderRadius: 10,
            border: "1px solid rgba(0,212,255,0.3)",
            fontSize: 16,
            background: "rgba(10, 25, 45, 0.75)",
            color: "#e0f4ff",
          }}
        >
          <option value="">All Conditions</option>
          {Object.keys(CONDITION_LABELS).map((c) => (
            <option key={c} value={c}>{CONDITION_LABELS[c]}</option>
          ))}
        </select>
        <select
          value={productState}
          onChange={(e) => setProductState(e.target.value)}
          style={{
            padding: "12px 16px",
            borderRadius: 10,
            border: "1px solid rgba(0,212,255,0.3)",
            fontSize: 16,
            background: "rgba(10, 25, 45, 0.75)",
            color: "#e0f4ff",
          }}
        >
          <option value="">All Product States</option>
          {Object.keys(STATE_LABELS).map((s) => (
            <option key={s} value={s}>{STATE_LABELS[s]}</option>
          ))}
        </select>
      </div>

      <p style={{ fontSize: 16, color: "#aac8ff", marginBottom: "1rem" }}>
        {filtered.length} reaction{filtered.length !== 1 ? "s" : ""} found
      </p>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,212,255,0.4)" }}>
              {["Equation", "Product State", "Conditions", "Observation", "Safety"].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "14px 16px",
                    fontWeight: 700,
                    fontSize: 16,
                    color: "#00d4ff",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "3rem", fontSize: 16 }}>
                  No results found
                </td>
              </tr>
            ) : (
              filtered.map((d, i) => {
                const safety = getSafetyInfo(d.safety || "");
                return (
                  <tr key={i}>
                    <td style={{ padding: "16px", fontFamily: "monospace", fontSize: 18 }}>
                      {d.equation}
                    </td>
                    <td style={{ padding: "16px" }}>
                      <span
                        style={{
                          display: "inline-block",
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: d.product_color || "#ccc",
                          border: "1px solid rgba(255,255,255,0.2)",
                          marginRight: 10,
                        }}
                      />
                      <Pill
                        label={STATE_LABELS[d.products_state] || d.products_state}
                        bg="rgba(255,255,255,0.08)"
                        text="#c8e8ff"
                        border="rgba(255,255,255,0.15)"
                      />
                    </td>
                    <td style={{ padding: "16px" }}>
                      <Pill
                        label={CONDITION_LABELS[d.conditions] || d.conditions}
                        bg="rgba(0,212,255,0.12)"
                        text="#00d4ff"
                        border="rgba(0,212,255,0.3)"
                      />
                    </td>
                    <td style={{ padding: "16px", fontSize: 15 }}>
                      {OBSERVATION_LABELS[d.observation] || d.observation}
                    </td>
                    <td style={{ padding: "16px" }}>
                      <Pill
                        label={safety.label}
                        bg={safety.color}
                        text={safety.text}
                        border={safety.border}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}