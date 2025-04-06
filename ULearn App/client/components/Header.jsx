import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">Learnify</h1>
      <nav className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">
          Home
        </Link>
        <Link to="/courses" className="text-gray-700 hover:text-blue-600">
          Courses
        </Link>
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
          Dashboard
        </Link>
        <Link to="/login" className="text-gray-700 hover:text-blue-600">
          Login
        </Link>
      </nav>
    </header>
  );
};

export default Header;
