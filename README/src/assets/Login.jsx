import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      const token = data.access_token;
      localStorage.setItem("token", token);

      // Extract user name (adjust according to your API response)
      let userName = "";
      if (data.user) {
        userName = data.user.full_name || data.user.name || email.split('@')[0];
      } else {
        userName = email.split('@')[0];
      }
      const userData = {
        name: userName,
        email: email
      };
      localStorage.setItem("user", JSON.stringify(userData));

      navigate("/");
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="submit-btn">Login</button>
        </form>
      </div>
    </div>
  );
}