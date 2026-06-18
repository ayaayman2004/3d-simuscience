import React, { useEffect, useState } from "react";

export default function PageLoader({ children, accent = "#00d4ff", label = "" }) {
  const [stage, setStage] = useState("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setStage("show"),  600);
    const t2 = setTimeout(() => setStage("done"), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      <div
        style={{
          opacity:    stage === "done" ? 1 : 0,
          transform:  stage === "done" ? "translateY(0)" : "translateY(18px)",
          transition: "opacity 0.55s ease 0.1s, transform 0.55s ease 0.1s",
          minHeight:  "100%",
        }}
      >
        {children}
      </div>

      {stage !== "done" && (
        <div className="pl-overlay" style={{ opacity: stage === "show" ? 0 : 1, pointerEvents: stage === "show" ? "none" : "auto" }}>

          {/* ── Spinner ── */}
          <div className="pl-spinner">
            <div className="pl-ring pl-ring-outer" style={{ borderTopColor: accent }} />
            <div className="pl-ring pl-ring-inner" style={{ borderBottomColor: `${accent}88` }} />
            <div className="pl-dot" style={{ background: accent, boxShadow: `0 0 14px ${accent}` }} />
          </div>

          {/* ── Logo ── */}
          <div className="pl-logo">
            <div
              className="pl-logo-text"
              style={{
                background: `linear-gradient(135deg, #fff, ${accent})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ⚗️ Simuscience
            </div>
            {label && <div className="pl-label">{label}</div>}
          </div>

          {/* ── Progress bar ── */}
          <div className="pl-bar-track">
            <div className="pl-bar-fill" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
          </div>

        </div>
      )}

      <style>{`
        /* ── Overlay ── */
        .pl-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: clamp(14px, 3vw, 24px);
          background: #060818;
          transition: opacity 0.5s ease;
        }

        /* ── Spinner ── */
        .pl-spinner {
          position: relative;
          width: clamp(52px, 12vw, 80px);
          height: clamp(52px, 12vw, 80px);
          flex-shrink: 0;
        }
        .pl-ring {
          position: absolute;
          border-radius: 50%;
          border: 2px solid transparent;
        }
        .pl-ring-outer {
          inset: 0;
          border-color: rgba(0,212,255,0.2);
          animation: loaderSpin 1s linear infinite;
        }
        .pl-ring-inner {
          inset: 16%;
          border-color: rgba(0,212,255,0.13);
          animation: loaderSpin 0.7s linear infinite reverse;
        }
        .pl-dot {
          position: absolute;
          width: clamp(8px, 2vw, 12px);
          height: clamp(8px, 2vw, 12px);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          animation: loaderPulse 1s ease-in-out infinite;
        }

        /* ── Logo ── */
        .pl-logo { text-align: center; }
        .pl-logo-text {
          font-size: clamp(16px, 4.5vw, 24px);
          font-weight: 800;
          letter-spacing: 0.06em;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }
        .pl-label {
          font-size: clamp(10px, 2.5vw, 13px);
          color: #88aacc;
          margin-top: 5px;
          letter-spacing: 0.08em;
        }

        /* ── Progress bar ── */
        .pl-bar-track {
          width: clamp(100px, 35vw, 180px);
          height: 3px;
          background: rgba(255,255,255,0.08);
          border-radius: 3px;
          overflow: hidden;
        }
        .pl-bar-fill {
          height: 100%;
          animation: loaderBar 1.2s ease-in-out infinite;
        }

        /* ── Keyframes ── */
        @keyframes loaderSpin  { to { transform: rotate(360deg); } }
        @keyframes loaderPulse {
          0%,100% { opacity:1; transform:translate(-50%,-50%) scale(1); }
          50%      { opacity:0.5; transform:translate(-50%,-50%) scale(1.35); }
        }
        @keyframes loaderBar   {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }

        /* ── Small phones ── */
        @media (max-width: 360px) {
          .pl-ring-inner { inset: 18%; }
          .pl-logo-text { letter-spacing: 0.03em; }
        }

        /* ── Landscape mobile ── */
        @media (max-height: 500px) and (orientation: landscape) {
          .pl-overlay { gap: 10px; }
          .pl-spinner {
            width: clamp(38px, 10vh, 56px);
            height: clamp(38px, 10vh, 56px);
          }
          .pl-logo-text { font-size: clamp(14px, 4vh, 20px); }
          .pl-bar-track { width: clamp(80px, 25vw, 140px); height: 2px; }
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .pl-ring-outer, .pl-ring-inner { animation-duration: 2s; }
          .pl-dot { animation: none; opacity: 1; }
          .pl-bar-fill { animation-duration: 2s; }
        }
      `}</style>
    </>
  );
}
