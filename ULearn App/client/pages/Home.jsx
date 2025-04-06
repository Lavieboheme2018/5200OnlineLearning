import React from "react";
import { Link } from "react-router-dom";
import CourseList from "..components/CourseList"; 
import "./Home.css";

const Home = () => {
  return (
    <main className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h2>Welcome to Learnify </h2>
        <p>Learn from expert instructors, anytime, anywhere.</p>
        <Link to="/signup" className="cta-button">
          Get Started for Free
        </Link>
      </section>

      {/* Courses Section */}
      <CourseList />
    </main>
  );
};

export default Home;
