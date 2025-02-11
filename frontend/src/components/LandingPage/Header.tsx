import React, { useState } from "react";
import "./Header.css";

const Header: React.FC = () => {
  // const [search, setSearch] = useState("");

  return (
    <header className="header-container">
      <nav className="navbar">
        <ul className="nav-menu">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#monthly-book">
              Monthly Book
            </a>
          </li>
          <li>
            <a href="#monthly-book">Events</a>
          </li>
          <li>
            <a href="#monthly-book">Members</a>
          </li>
          <li>
            <a href="#sign-up">Sign Up</a>
          </li>
          <li>
            <a href="#login">Login</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
