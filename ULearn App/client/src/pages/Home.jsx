import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <h1 className="home-title">Welcome to ULearn</h1>
        <p className="home-subtitle">Your journey to smarter learning starts here.</p>
        <div className="home-actions">
          <Link to="/login" className="btn btn-login">Login</Link>
          <Link to="/register" className="btn btn-register">Register</Link>
        </div>
      </section>

      <section className="home-courses">
        <Link to="/courses" className="btn btn-view-all">View All Courses</Link>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
