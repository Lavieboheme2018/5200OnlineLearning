// Header.jsx
import React from "react";
import Navbar from "./Navbar";

const Header = ({ user, setUser }) => {
  return (
    <header className="header-container">
      <Navbar user={user} setUser={setUser} />
    </header>
  );
};

export default Header;
