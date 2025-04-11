import React from "react";
import Navbar from "./Navbar";
import './Header.css'; // Optional if you need extra styling

const Header = ({ user, setUser }) => {
  return (
    <Navbar user={user} setUser={setUser} />
  );
};

export default Header;
