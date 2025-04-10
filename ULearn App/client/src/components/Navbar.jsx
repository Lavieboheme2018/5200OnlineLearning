import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('ulearn_user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">ULearn</Link>

      <div className="navbar-links">
        {user ? (
          <>
            <span className="navbar-user">👤 {user.name} ({user.role})</span>
            {user.role === 'student' && <Link to="/student/dashboard">Dashboard</Link>}
            {user.role === 'instructor' && <Link to="/instructor/dashboard">Dashboard</Link>}
            {user.role === 'admin' && <Link to="/admin/dashboard">Admin</Link>}
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
