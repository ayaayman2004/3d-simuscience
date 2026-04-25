import { useState, useMemo } from "react";
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
        fontSize: 15,              // 🔥 كان 11
        padding: "6px 14px",       // 🔥 تكبير واضح
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
        padding: "2.5rem", // 🔥 كان 1.5
        fontFamily: "sans-serif",
        width: "100%",
        margin: 0,
        minHeight: "100vh",
        color: "#e0f4ff",
        background: "linear-gradient(180deg, #081630 0%, #02050d 100%)",
      }}
    >
      <h2 style={{ 
        fontSize: 32,     // 🔥 كان 20
        fontWeight: 700, 
        marginBottom: "1.5rem", 
        color: "#00d4ff" 
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
            padding: "12px 16px",     // 🔥
            borderRadius: 10,
            border: "1px solid rgba(0,212,255,0.2)",
            fontSize: 16,             // 🔥
            background: "rgba(255,255,255,0.05)",
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
            border: "1px solid rgba(0,212,255,0.2)",
            fontSize: 16,
            background: "#0d1428",
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
            border: "1px solid rgba(0,212,255,0.2)",
            fontSize: 16,
            background: "#0d1428",
            color: "#e0f4ff",
          }}
        >
          <option value="">All Product States</option>
          {Object.keys(STATE_LABELS).map((s) => (
            <option key={s} value={s}>{STATE_LABELS[s]}</option>
          ))}
        </select>
      </div>

      <p style={{ fontSize: 16, color: "#88aacc", marginBottom: "1rem" }}>
        {filtered.length} reaction{filtered.length !== 1 ? "s" : ""} found
      </p>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 16 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,212,255,0.2)" }}>
              {["Equation", "Product State", "Conditions", "Observation", "Safety"].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "14px 14px",
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
                  <tr
                    key={i}
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <td style={{ padding: "16px", fontFamily: "monospace", fontSize: 18 }}>
                      {d.equation}
                    </td>
                    <td style={{ padding: "16px" }}>
                      <span
                        style={{
                          display: "inline-block",
                          width: 18,     // 🔥 كان 10
                          height: 18,
                          borderRadius: "50%",
                          background: d.product_color || "#ccc",
                          border: "1px solid rgba(255,255,255,0.2)",
                          marginRight: 10,
                        }}
                      />
                      <Pill
                        label={STATE_LABELS[d.products_state] || d.products_state}
                        bg="rgba(255,255,255,0.06)"
                        text="#c8e8ff"
                        border="rgba(255,255,255,0.1)"
                      />
                    </td>
                    <td style={{ padding: "16px" }}>
                      <Pill
                        label={CONDITION_LABELS[d.conditions] || d.conditions}
                        bg="rgba(0,212,255,0.08)"
                        text="#00d4ff"
                        border="rgba(0,212,255,0.2)"
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