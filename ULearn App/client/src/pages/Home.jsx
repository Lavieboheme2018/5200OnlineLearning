import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-hero">
        <h1>Welcome to ULearn</h1>
        <p>Your journey to smarter learning starts here.</p>
        <div className="home-buttons">
          <Link to="/login" className="btn btn-login">Login</Link>
          <Link to="/register" className="btn btn-register">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
