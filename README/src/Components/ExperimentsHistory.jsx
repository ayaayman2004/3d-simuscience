import React from "react";
import { useNavigate } from "react-router-dom";

const ExperimentsHistory = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2> التجارب اللي الطالب جربها</h2>

      {/* بعدين هنا هنربطها بالداتا */}
      
      <button onClick={() => navigate("/")}>
        Back To Lab
      </button>
    </div>
  );
};

export default ExperimentsHistory;
