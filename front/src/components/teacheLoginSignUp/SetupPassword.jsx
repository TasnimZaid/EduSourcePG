// components/SetupPassword.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SetupPassword() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/setup-password", formData);
      alert("Password set successfully.");
      navigate("/dashboard");
    } catch (error) {
      setError(error.response.data.message || "Password setup failed");
    }
  };

  return (
    <div>
      <h2>Set Password</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="New Password" onChange={handleChange} required />
        <button type="submit">Set Password</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default SetupPassword;
