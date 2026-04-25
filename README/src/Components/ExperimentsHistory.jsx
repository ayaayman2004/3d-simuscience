import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://nadamomen26-users.hf.space";

const ExperimentsHistory = () => {
  const navigate = useNavigate();
  const [experiments, setExperiments] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserName(payload.sub || "");
    } catch {}

    fetch(`${BASE_URL}/history/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setExperiments(Array.isArray(data) ? data : []))
      .catch(() => setExperiments([]));
  }, [navigate]);

  const deleteExperiment = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`${BASE_URL}/history/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    setExperiments(prev => prev.filter(e => e.id !== id));
  };



  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr + "Z");
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Cairo" });
};

const formatTime = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr + "Z");
    return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Cairo" });
};

  return (
    <div style={containerStyle}>
      <style>{`
        .hist-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(0,212,255,0.2);
          border-radius: 15px;
          padding: 24px;
          margin-bottom: 15px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          transition: 0.3s;
        }
        .hist-card:hover {
          background: rgba(0,212,255,0.05);
          border-color: #00d4ff;
          transform: translateY(-3px);
        }
        .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-top: 8px; }
        .badge-success { background: rgba(0,255,136,0.15); color: #00ff88; }
        .delete-btn {
          margin-top: 10px;
          padding: 5px 14px;
          border-radius: 8px;
          background: rgba(255,50,50,0.1);
          border: 1px solid rgba(255,50,50,0.3);
          color: #ff6b6b;
          cursor: pointer;
          font-size: 12px;
          transition: 0.2s;
        }
        .delete-btn:hover { background: rgba(255,50,50,0.25); }
      `}</style>

      {/* Header */}
      <div style={headerStyle}>
        <h2 style={{ color: "#00d4ff", margin: 0, fontSize: "22px" }}>🧪 Experiment History</h2>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div style={userBadgeStyle}>👤 {userName}</div>
          <button onClick={() => navigate("/LabScene")} style={btnSecondary}>Back to Lab</button>
        </div>
      </div>

      {/* Stats */}
      <div style={statsGrid}>
        <div style={statCard("#00d4ff")}>
          <div style={statNum("#00d4ff")}>{experiments.length}</div>
          <div style={statLabel}>Total Experiments</div>
        </div>
        <div style={statCard("#00ff88")}>
          <div style={statNum("#00ff88")}>{experiments.length}</div>
          <div style={statLabel}>Successful</div>
        </div>
        <div style={statCard("#7b61ff")}>
          <div style={statNum("#7b61ff")}>{new Set(experiments.map(e => e.reaction_type)).size}</div>
          <div style={statLabel}>Reaction Types</div>
        </div>
        <div style={statCard("#ffc800")}>
          <div style={statNum("#ffc800")}>
            {experiments[0] ? formatDate(experiments[0].created_at).split(" ").slice(0, 2).join("/") : "-"}
          </div>
          <div style={statLabel}>Last Session</div>
        </div>
      </div>

      {/* Cards */}
      <div style={{ marginTop: "10px" }}>
        {experiments.length === 0 ? (
          <div style={{ color: "#88aacc", textAlign: "center", marginTop: "40px" }}>
            No experiments yet. Go do one! 🧪
          </div>
        ) : (
          experiments.map((exp) => (
            <div key={exp.id} className="hist-card">
              <div style={{ flex: 1 }}>
                <h3 style={{ color: "#fff", margin: "0 0 8px 0", fontSize: "1.2rem" }}>
                  {exp.reactants} Reaction
                </h3>
                <div style={infoGrid}>
                  <div style={infoItem}>
                    <span style={infoLabel}>Reactants</span>
                    <span style={infoValue}>{exp.reactants}</span>
                  </div>
                  <div style={infoItem}>
                    <span style={infoLabel}>Result</span>
                    <span style={infoValue}>{exp.result}</span>
                  </div>
                  <div style={infoItem}>
                    <span style={infoLabel}>Reaction Type</span>
                    <span style={infoValue}>{exp.reaction_type}</span>
                  </div>
                </div>
                <span className="badge badge-success">Successful ✓</span>
                <br />
                <button className="delete-btn" onClick={() => deleteExperiment(exp.id)}>
                  🗑 Delete
                </button>
              </div>

              <div style={{ textAlign: "right", minWidth: "130px", paddingLeft: "20px" }}>
                <div style={{ color: "#88aacc", fontSize: "12px" }}>📅 {formatDate(exp.created_at)}</div>
                <div style={{ color: "#88aacc", fontSize: "12px", marginTop: "4px" }}>🕐 {formatTime(exp.created_at)}</div>
                <div style={{ color: "#00ff88", fontWeight: "bold", marginTop: "12px", fontSize: "14px", background: "rgba(0,255,136,0.08)", padding: "6px 10px", borderRadius: "8px", border: "1px solid rgba(0,255,136,0.2)" }}>
                  Result: {exp.result} ✓
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const containerStyle = { minHeight: "100vh", background: "#060818", padding: "40px 8%", color: "#e0f4ff", fontFamily: "sans-serif" };
const headerStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "20px", marginBottom: "10px" };
const userBadgeStyle = { background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", borderRadius: "20px", padding: "6px 16px", fontSize: "13px", color: "#00d4ff" };
const statsGrid = { display: "flex", gap: "16px", margin: "24px 0" };
const statCard = (color) => ({ background: `rgba(${hexToRgb(color)},0.08)`, border: `1px solid rgba(${hexToRgb(color)},0.2)`, borderRadius: "12px", padding: "16px 24px", textAlign: "center", flex: 1 });
const statNum = (color) => ({ fontSize: "28px", fontWeight: "bold", color });
const statLabel = { fontSize: "12px", color: "#88aacc", marginTop: "4px" };
const infoGrid = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "8px" };
const infoItem = { display: "flex", flexDirection: "column", gap: "2px" };
const infoLabel = { fontSize: "11px", color: "#88aacc", textTransform: "uppercase", letterSpacing: "0.5px" };
const infoValue = { fontSize: "14px", color: "#e0f4ff", fontWeight: "500" };
const btnSecondary = { padding: "10px 20px", borderRadius: "10px", border: "1px solid #00d4ff", background: "transparent", color: "#00d4ff", cursor: "pointer", fontWeight: "bold" };

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

export default ExperimentsHistory;