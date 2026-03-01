import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Review() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // نستقبل اسم التجربة من الصفحة السابقة عن طريق state
  const { experimentName } = location.state || { experimentName: "Experiment" };

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      experimentName,
      rating,
      comment,
      date: new Date().toLocaleString(),
    };

    // حفظ مؤقت في localStorage
    const existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    localStorage.setItem("reviews", JSON.stringify([...existingReviews, reviewData]));

    setSubmitted(true);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      <h1 className="re">Review for {experimentName}</h1>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div style={{ margin: "20px 0" }}>
            <label style={{ display: "block", marginBottom: "10px" }}>Your Rating:</label>
            {[1,2,3,4,5].map((star) => (
              <span
                key={star}
                style={{
                  fontSize: "30px",
                  cursor: "pointer",
                  color: star <= rating ? "#FFD700" : "#ccc"
                }}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>

          <div style={{ margin: "20px 0" }}>
            <label style={{ display: "block", marginBottom: "10px" }}>Your Comments:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="5"
              style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
              placeholder="Write your review..."
              required
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#0a6ebd",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Submit Review
          </button>
        </form>
      ) : (
        <div>
          <h2>Thank you for your review!</h2>
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#0a6ebd",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "20px"
            }}
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
}