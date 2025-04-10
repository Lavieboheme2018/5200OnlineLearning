import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  
import { jwtDecode } from "jwt-decode"; 

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", formData);
      const { token } = res.data;
  
      // Ensure we have the token
      if (!token) {
        setMessage("No token received");
        return;
      }
  
      // Store the token
      localStorage.setItem("token", token);
  
      // Decode the JWT token
      const decodedToken = jwtDecode(token); // or `jwtDecode(token)` if using wildcard import
      console.log(decodedToken); // Check decoded token structure
  
      setMessage("Login successful");
  
      // Optional: Set user info globally if needed (via setUser)
      setUser(decodedToken);
  
      // Redirect based on the role in the decoded token
      if (decodedToken.role === "admin") {
        navigate("/admin/dashboard");
      } else if (decodedToken.role === "instructor") {
        navigate("/instructor/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (err) {
      console.log("Login error: ", err);
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
