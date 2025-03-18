import React, {
  useState,
  useEffect,
} from "react";
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
        <div
          className={`burger-menu ${
            openMenu ? "open" : ""
          }`}
          onClick={toggleMenu}
        >
          <span className="menu"></span>
          <span className="menu"></span>
          <span className="menu"></span>
        </div>
        <a href="/" className="title">
          Filler Title
        </a>
        <ul className={openMenu ? "open" : ""}>
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
            <li id="sign-in">
              <a href="#sign-in">Sign in</a>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
