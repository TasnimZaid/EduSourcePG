// components/VerifyOtp.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VerifyOtp() {
  const [formData, setFormData] = useState({ email: "", otp: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/verify-otp", formData);
      
      const { token, teacher } = response.data;

      // Store the JWT token and user data in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("teacherId", teacher.id);
      localStorage.setItem("teacherName", teacher.name);
      localStorage.setItem("teacherEmail", teacher.email);
      localStorage.setItem("universityName", teacher.university_name);
      alert("OTP Verified! You can now set your password.");
      navigate("/setup-password");
    } catch (error) {
      setError(error.response.data.message || "OTP verification failed");
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="otp" type="text" placeholder="OTP" onChange={handleChange} required />
        <button type="submit">Verify OTP</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default VerifyOtp;
