import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://nadamomen26-users.hf.space";

// مكون النجوم المتحركة
function StarsBackground() {
  const starsRef = useRef(null);
  useEffect(() => {
    const container = starsRef.current;
    if (!container) return;
    const count = 220;
    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      star.className = "star";
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
  return <div ref={starsRef} className="hist-stars" />;
}

const ExperimentsHistory = () => {
  const navigate = useNavigate();
  const [experiments, setExperiments] = useState([]);
  const [userName, setUserName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserName(payload.sub || "");
    } catch (e) {
      console.error("Invalid token");
    }

    fetch(`${BASE_URL}/history/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(async res => {
        if (res.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          throw new Error("Session expired, please login again.");
        }
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setExperiments(Array.isArray(data) ? data : []);
        setErrorMsg("");
      })
      .catch(err => {
        console.error("Error fetching history:", err);
        setErrorMsg(err.message);
        setExperiments([]);
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const deleteExperiment = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch(`${BASE_URL}/history/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setExperiments(prev => prev.filter(e => e.id !== id));
      } else {
        console.warn("Delete failed:", res.status);
      }
    } catch (err) {
      console.error(err);
    }
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
      <StarsBackground />
      <style>{`
        .hist-stars {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: -5;
          overflow: hidden;
          background: transparent;
        }
        .hist-stars .star {
          position: absolute;
          background: radial-gradient(circle, #ffffff, #aaddff);
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(255,255,200,0.6);
          animation: starTwinkleHist 6s infinite alternate;
        }
        @keyframes starTwinkleHist {
          0% { opacity: 0.2; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.3); }
        }
        .hist-card {
          background: rgba(10, 25, 45, 0.55);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0,212,255,0.25);
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 18px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          transition: 0.3s;
        }
        .hist-card:hover {
          background: rgba(0,212,255,0.12);
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
        .error-message {
          background: rgba(255,77,109,0.15);
          border: 1px solid #ff4d6d;
          border-radius: 12px;
          padding: 16px;
          margin: 20px 0;
          text-align: center;
          color: #ff9eae;
        }
        .loading-spinner {
          text-align: center;
          color: #88aacc;
          margin-top: 40px;
        }
      `}</style>

      <div style={headerStyle}>
        <h2 style={{ color: "#00d4ff", margin: 0, fontSize: "22px" }}>🧪 Experiment History</h2>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div style={userBadgeStyle}>👤 {userName || "User"}</div>
          <button onClick={() => navigate("/LabScene")} style={btnSecondary}>Back to Lab</button>
        </div>
      </div>

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

      {loading && <div className="loading-spinner">⏳ Loading experiments...</div>}
      {errorMsg && (
        <div className="error-message">
          ⚠️ {errorMsg}<br />
          <button onClick={() => window.location.reload()} style={{ marginTop: "8px", background: "#00d4ff", border: "none", borderRadius: "8px", padding: "4px 12px", cursor: "pointer" }}>🔄 Retry</button>
        </div>
      )}

      {!loading && !errorMsg && (
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
      )}
    </div>
  );
};

// تنسيقات شفافة مع خلفية شفافة (النجوم تظهر من خلالها)
const containerStyle = { 
  minHeight: "100vh", 
  background: "transparent", 
  padding: "40px 8%", 
  color: "#e0f4ff", 
  fontFamily: "sans-serif" 
};
const headerStyle = { 
  display: "flex", 
  justifyContent: "space-between", 
  alignItems: "center", 
  borderBottom: "1px solid rgba(0,212,255,0.2)", 
  paddingBottom: "20px", 
  marginBottom: "10px" 
};
const userBadgeStyle = { 
  background: "rgba(0,212,255,0.1)", 
  border: "1px solid rgba(0,212,255,0.3)", 
  borderRadius: "20px", 
  padding: "6px 16px", 
  fontSize: "13px", 
  color: "#00d4ff" 
};
const statsGrid = { 
  display: "flex", 
  gap: "16px", 
  margin: "24px 0", 
  flexWrap: "wrap" 
};
const statCard = (color) => ({ 
  background: `rgba(10, 25, 45, 0.55)`,
  backdropFilter: "blur(8px)",
  border: `1px solid rgba(${hexToRgb(color)},0.3)`, 
  borderRadius: "16px", 
  padding: "16px 24px", 
  textAlign: "center", 
  flex: "1 1 180px" 
});
const statNum = (color) => ({ 
  fontSize: "28px", 
  fontWeight: "bold", 
  color 
});
const statLabel = { 
  fontSize: "12px", 
  color: "#88aacc", 
  marginTop: "4px" 
};
const infoGrid = { 
  display: "grid", 
  gridTemplateColumns: "1fr 1fr", 
  gap: "10px", 
  marginBottom: "8px" 
};
const infoItem = { 
  display: "flex", 
  flexDirection: "column", 
  gap: "2px" 
};
const infoLabel = { 
  fontSize: "11px", 
  color: "#b8d0ff", 
  textTransform: "uppercase", 
  letterSpacing: "0.5px" 
};
const infoValue = { 
  fontSize: "14px", 
  color: "#eef4ff", 
  fontWeight: "500" 
};
const btnSecondary = { 
  padding: "10px 20px", 
  borderRadius: "10px", 
  border: "1px solid #00d4ff", 
  background: "rgba(0,212,255,0.1)", 
  color: "#00d4ff", 
  cursor: "pointer", 
  fontWeight: "bold",
  transition: "0.2s",
  backdropFilter: "blur(4px)"
};

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

export default ExperimentsHistory;