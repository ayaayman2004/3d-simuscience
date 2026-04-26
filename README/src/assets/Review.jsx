import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Review() {
  const navigate = useNavigate();
  const location = useLocation();

  const { experimentName } = location.state || { experimentName: "Scientific Experiment" };

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
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
    const existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    localStorage.setItem("reviews", JSON.stringify([...existingReviews, reviewData]));
    setSubmitted(true);
  };

  return (
    <div className="review-page-container">
      <style>{`
        *,
        *::before,
        *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html, body, #root {
          overflow-x: hidden;
        }

        .review-page-container {
          min-height: 100svh;
          background: radial-gradient(circle at top, #0d1b3e, #04060f);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(16px, 4vw, 32px);
          font-family: 'Segoe UI', sans-serif;
          color: #f0f6ff;
          overflow: hidden;
        }

        .review-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 212, 255, 0.2);
          border-radius: clamp(18px, 4vw, 30px);
          padding: clamp(24px, 5vw, 48px) clamp(20px, 5vw, 44px);
          width: 100%;
          max-width: 560px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
          text-align: center;
        }

        .review-card h1 {
          font-size: clamp(1.4rem, 5vw, 2.1rem);
          background: linear-gradient(135deg, #00d4ff, #7b61ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0 0 10px;
          line-height: 1.2;
        }

        .review-card h2 {
          font-size: clamp(1.2rem, 4vw, 1.7rem);
          background: linear-gradient(135deg, #00d4ff, #7b61ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0 0 12px;
        }

        .experiment-badge {
          display: inline-block;
          padding: 5px clamp(10px, 3vw, 18px);
          background: rgba(0, 212, 255, 0.1);
          border: 1px solid rgba(0, 212, 255, 0.3);
          border-radius: 20px;
          color: #00d4ff;
          font-size: clamp(0.75rem, 2.5vw, 0.95rem);
          margin-bottom: clamp(20px, 4vw, 32px);
          max-width: 100%;
          word-break: break-word;
        }

        .stars-container {
          margin: clamp(16px, 3vw, 28px) 0;
          display: flex;
          justify-content: center;
          gap: clamp(6px, 2vw, 12px);
        }

        .star {
          font-size: clamp(28px, 8vw, 44px);
          cursor: pointer;
          transition: all 0.2s ease;
          color: rgba(255, 255, 255, 0.1);
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
          user-select: none;
        }

        .star.active {
          color: #ffcc00;
          text-shadow: 0 0 15px rgba(255, 204, 0, 0.6);
        }

        .comment-area {
          width: 100%;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: clamp(10px, 2.5vw, 16px);
          padding: clamp(12px, 3vw, 18px);
          color: #fff;
          font-size: clamp(0.875rem, 2.5vw, 1rem);
          resize: none;
          margin-bottom: clamp(18px, 4vw, 28px);
          outline: none;
          transition: border 0.3s ease;
          font-family: inherit;
        }

        .comment-area::placeholder { color: #6a8099; }

        .comment-area:focus {
          border-color: #00d4ff;
          box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.08);
        }

        .rate-label {
          color: #a8c0d8;
          font-size: clamp(0.8rem, 2.5vw, 0.95rem);
          display: block;
          margin-bottom: 4px;
        }

        .submit-btn {
          width: 100%;
          padding: clamp(12px, 3vw, 16px);
          border-radius: clamp(10px, 2.5vw, 16px);
          border: none;
          background: linear-gradient(135deg, #00d4ff, #7b61ff);
          color: white;
          font-weight: 700;
          font-size: clamp(0.95rem, 2.8vw, 1.1rem);
          cursor: pointer;
          box-shadow: 0 10px 20px rgba(0, 212, 255, 0.2);
          font-family: inherit;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }

        .success-icon {
          font-size: clamp(44px, 12vw, 68px);
          color: #00ffaa;
          margin-bottom: clamp(12px, 3vw, 22px);
          line-height: 1;
        }

        .success-text {
          color: #a8c0d8;
          font-size: clamp(0.85rem, 2.5vw, 1rem);
          margin-bottom: clamp(20px, 4vw, 32px);
          line-height: 1.6;
        }

        /* ── Landscape mobile ── */
        @media (max-height: 520px) and (orientation: landscape) {
          .review-page-container { align-items: flex-start; padding-top: 16px; }
          .stars-container { margin: 10px 0; }
          .star { font-size: clamp(22px, 6vw, 32px); }
          .comment-area { margin-bottom: 14px; }
        }

        /* ── Very small phones ── */
        @media (max-width: 360px) {
          .stars-container { gap: 4px; }
          .star { font-size: 26px; }
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .star { transition: none; }
          .comment-area { transition: none; }
        }
      `}</style>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            className="review-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <h1>Share Your Feedback</h1>
            <div className="experiment-badge">{experimentName}</div>

            <form onSubmit={handleSubmit}>
              <label className="rate-label">Rate your experience:</label>
              <div className="stars-container">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.span
                    key={star}
                    className={`star ${(hover || rating) >= star ? "active" : ""}`}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(star)}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ★
                  </motion.span>
                ))}
              </div>

              <textarea
                className="comment-area"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="4"
                placeholder="What did you think of the reaction simulation?"
                required
              />

              <motion.button
                type="submit"
                className="submit-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Review
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            className="review-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="success-icon">✓</div>
            <h2>Thank You!</h2>
            <p className="success-text">
              Your feedback helps us improve the 3D Simuscience experience.
            </p>
            <motion.button
              className="submit-btn"
              onClick={() => navigate("/")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Return to Lab
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
