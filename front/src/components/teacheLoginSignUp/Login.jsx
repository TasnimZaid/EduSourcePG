import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/login", { email, password });
      const { token, teacher } = response.data;

      // Store the JWT token and user data in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("teacherId", teacher.id);
      localStorage.setItem("teacherName", teacher.name);
      localStorage.setItem("teacherEmail", teacher.email);
      localStorage.setItem("universityName", teacher.university_name);
      
      alert(response.data.message);
      // Store the JWT token (if needed) in localStorage or state for authentication
      localStorage.setItem("token", response.data.token);

      navigate("/dashboard"); // Redirect to the dashboard or home page
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login;
