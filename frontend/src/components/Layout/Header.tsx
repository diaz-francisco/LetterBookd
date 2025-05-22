import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/Header.css";

const Header: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const closeMenu = () => {
    setOpenMenu(false);
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
        <Link to="/" className="title" onClick={closeMenu}>
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
              onClick={closeMenu}
            >
              Home
              <span style={{ marginLeft: "5px" }} className="material-symbols-outlined home">
                house
              </span>
            </Link>
          </li>
          <li className="monthly">
            <Link to="/monthly" onClick={closeMenu}>
              Monthly Book
            </Link>
          </li>
          <li>
            <Link to={"books"} onClick={closeMenu}>
              Books
            </Link>
          </li>
          <li>
            <Link to="#monthly-book" onClick={closeMenu}>
              Members
            </Link>
          </li>
          <div></div>
          <div className="right-item">
            <li className="signin" style={{ backgroundColor: "var(--background)" }}>
              <Link to="signin" onClick={closeMenu}>
                <span
                  style={{ backgroundColor: "var(--background)", borderRadius: "5px", marginTop: "3px" }}
                  className="material-symbols-outlined home"
                >
                  person{" "}
                </span>
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
