// import React from "react";

// const RightSidebar = () => {
//   return (
//     <div className="right-sidebar">
//       <button style={{ padding: "10px" }}>Reset Scene</button>
//       <button style={{ padding: "10px" }}>Add Light</button>
//       <button style={{ padding: "10px" }}>Remove Light</button>
       

//     </div>
    
//   );
// };

// export default RightSidebar;
import React from "react";
import { useNavigate } from "react-router-dom";

const RightSidebar = ({
  reactions,
  selectedReaction,
  reactionStarted,
  onReactionChange,
  onStartReaction,
  onReset,
}) => {
  const navigate = useNavigate();

  return (
    <div className="right-sidebar">
      <h3>Reaction Conditions</h3>

      <select
        style={{ width: "100%", padding: "8px" }}
        value={selectedReaction ? reactions.indexOf(selectedReaction) : ""}
        onChange={(e) => onReactionChange(reactions[e.target.value])}
      >
        <option value="" disabled>
          Select condition
        </option>

        {reactions.map((r, index) => (
          <option key={index} value={index}>
            {r.conditions}
          </option>
        ))}
      </select>

      {reactionStarted && selectedReaction && (
        <div style={{ marginTop: "15px" }}>
          <h4> Reaction Result</h4>

          <p>
            <strong>Equation:</strong><br />
            {selectedReaction.reactants} → {selectedReaction.products}
          </p>

          <p>
            <strong>Product:</strong><br />
            {selectedReaction.products}
          </p>

          <p>
            <strong>Observation:</strong><br />
            {selectedReaction.observation || "No visible change"}
          </p>
        </div>
      )}

      <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }} >
        <button onClick={onStartReaction} disabled={!selectedReaction}  style={{backgroundColor:"lightblue" , border:"none", height:"30px"}}>
          Start Reaction
        </button>

        <button onClick={onReset} style={{backgroundColor:"lightblue" , border:"none", height:"30px"}}>Reset Lab</button>

        <button onClick={() => navigate("/history")} style={{backgroundColor:"lightblue" , border:"none", height:"30px"}}>Experiment History</button>
      </div>
    </div>
  );
};

export default RightSidebar;
