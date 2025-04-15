import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    if (openMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [openMenu]);

  return (
    <header className="header-container">
      <nav className="navbar">
        <div className={`burger-menu ${openMenu ? "open" : ""}`} onClick={toggleMenu}>
          <span className="menu"></span>
          <span className="menu"></span>
          <span className="menu"></span>
        </div>
        <Link to="/" className="title">
          LetterBookd
        </Link>
        <ul className={openMenu ? "open" : ""}>
          <li className="house">
            <Link
              style={{
                display: "flex",
                alignItems: "center",
              }}
              to="/home"
            >
              Home
              <span style={{ marginLeft: "5px" }} className="material-symbols-outlined">
                house
              </span>
            </Link>
          </li>
          <li className="monthly">
            <Link to="/monthly">Monthly Book</Link>
          </li>
          <li>
            <Link to={"books"}>Books</Link>
          </li>
          <li>
            <Link to="#monthly-book">Members</Link>
          </li>
          <div></div>
          <div className="right-item">
            <li className="signup">
              <Link to="signup">Sign Up</Link>
            </li>
            <li id="sign-in">
              <Link to="signin">Sign In</Link>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
