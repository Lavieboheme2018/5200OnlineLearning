import React, { useState } from "react";
import axios from "axios";
import './Auth.css';

axios.defaults.baseURL = "http://localhost:3000";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", role: "student",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/signup", formData);
      setMessage(res.data.message);
    } catch (err) {
      // ✅ check backend
      console.log("Registration error:", err.response?.data);
  
      // ✅ show detailed error
      setMessage(err.response?.data?.message || err.response?.data?.error || "Registration failed");
    }
  };  

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create a ULearn Account</h2>
        {message && <p className="auth-message">{message}</p>}
        <form onSubmit={handleSubmit} className="auth-form">
          <input name="name" type="text" placeholder="Name" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <select name="role" onChange={handleChange}>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
