import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="profile-page" style={{ padding: "40px", color: "white", minHeight: "100vh", background: "#060818" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", background: "#0f1528", padding: "30px", borderRadius: "20px" }}>
        <h2 style={{ color: "#00d4ff" }}>👤 الملف الشخصي</h2>
        {user ? (
          <>
            <p><strong>الاسم:</strong> {user.name}</p>
            <p><strong>البريد الإلكتروني:</strong> {user.email}</p>
          </>
        ) : (
          <p>لم يتم تسجيل الدخول. <Link to="/login" style={{ color: "#00d4ff" }}>تسجيل الدخول</Link></p>
        )}
        <Link to="/" style={{ color: "#00d4ff", display: "inline-block", marginTop: "20px" }}>← العودة للرئيسية</Link>
      </div>
    </div>
  );
}