import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

import Header from '../components/Header';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="home-page">
      <Header />

      <div className="home-hero">
        <h1>Welcome to ULearn</h1>
        <p>Your journey to smarter learning starts here.</p>
        <div className="home-buttons">
          <Link to="/login" className="btn btn-login">Login</Link>
          <Link to="/register" className="btn btn-register">Register</Link>
        </div>
      </div>

      <div className="home-courses-section">
        <Link to="/courses" className="btn btn-view-all">View All Courses</Link>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
