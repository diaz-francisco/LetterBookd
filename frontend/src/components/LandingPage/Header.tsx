import React, { useState } from "react";
import "./Header.css";

const Header: React.FC = () => {
  // const [burgerClass, setBurgerClass] = useState(
  //   "burger unclicked"
  // );

  // const [menuClass, setMenuClass] = useState(
  //   "menu hidden"
  // );

  // const [isClicked, setIsClicked] =
  //   useState(false);

  // const updateMenu = () => {
  //   if (!isClicked) {
  //     setBurgerClass("burger clicked");
  //     setMenuClass("menu shown");
  //   } else {
  //     setBurgerClass("burger unclicked");
  //     setMenuClass("menu hidden");
  //   }
  // };

  return (
    <header>
      <nav className="navbar">
        <a href="/" className="title">
          Filler Title
        </a>
        <ul>
          <li className="house">
            <a
              style={{
                display: "flex",
                alignItems: "center",
              }}
              href="/home"
            >
              Home
              <span
                style={{ marginLeft: "5px" }}
                className="material-symbols-outlined"
              >
                house
              </span>
            </a>
          </li>
          <li className="monthly">
            <a href="/monthly">Monthly Book</a>
          </li>
          <li>
            <a href="/monthly">Events</a>
          </li>
          <li>
            <a href="#monthly-book">Members</a>
          </li>
          <div></div>
          <div className="right-item">
            <li className="signup">
              <a href="#sign-up">Sign Up</a>
            </li>
            <li>
              <a href="#login">Login</a>
            </li>
          </div>
        </ul>

        {/* <div className="burger">
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
        </div> */}
      </nav>
      {/* <div className={menuClass}></div> */}
    </header>
  );
};

export default Header;
