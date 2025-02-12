import React, { useState } from "react";
import "./Header.css";

const Header: React.FC = () => {
  const [burgerClass, setBurgerClass] = useState(
    "burger unclicked"
  );

  const [menuClass, setMenuClass] = useState(
    "menu hidden"
  );

  const [isClicked, setIsClicked] =
    useState(false);

  const updateMenu = () => {
    if (!isClicked) {
      setBurgerClass("burger clicked");
      setMenuClass("menu shown");
    } else {
      setBurgerClass("burger unclicked");
      setMenuClass("menu hidden");
    }
  };

  return (
    <header>
      <nav>
        <ul className="navbar">
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
          <div className="right-item">
            <li>
              <a href="#sign-up">Sign Up</a>
            </li>
            <li>
              <a href="#login">Login</a>
            </li>
          </div>
        </ul>
        <div className="burger">
          <div
            className={burgerClass}
            onClick={updateMenu}
          ></div>
          <div
            className={burgerClass}
            onClick={updateMenu}
          ></div>
          <div
            className={burgerClass}
            onClick={updateMenu}
          ></div>
        </div>
      </nav>
      <div className={menuClass}></div>
    </header>
  );
};

export default Header;
