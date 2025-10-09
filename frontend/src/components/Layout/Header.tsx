import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Signin from "../Auth/Signin";
import { useAuth } from "../../services/auth";
import "./styles/Header.css";

const Header: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSignin, setOpenSignin] = useState(false);
  const { user, loading, signOut } = useAuth();

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const closeMenu = () => {
    setOpenMenu(false);
  };

  const toggleSignin = () => {
    setOpenSignin(!openSignin);
  };

  const closeSignin = () => {
    setOpenSignin(false);
  };

  const resetUI =
    (after?: () => void): React.MouseEventHandler =>
    () => {
      setOpenMenu(false);
      setOpenSignin(false);
      after?.();
    };

  useEffect(() => {
    if (openMenu) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("menu-open");
    } else {
      document.body.style.overflow = "auto";
      document.body.classList.remove("menu-open");
    }
    return () => document.body.classList.remove("menu-open");
  }, [openMenu]);

  return (
    <>
      <header className="header-container">
        <nav className="navbar">
          <div
            className={`burger-menu ${openMenu ? "open" : ""}`}
            style={{ backgroundColor: "var(--gray)" }}
            onClick={resetUI(toggleMenu)}
          >
            <span className="menu"></span>
            <span className="menu"></span>
            <span className="menu"></span>
          </div>
          <Link
            to="/"
            className="title"
            onClick={() => {
              closeMenu();
              closeSignin();
            }}
            style={{ backgroundColor: "var(--gray)" }}
          >
            LetterBookd
          </Link>
          {!user && !openMenu && (
            <button
              className="signin"
              onClick={() => {
                closeMenu();
                toggleSignin();
              }}
              style={{
                backgroundColor: "var(--background)",
                cursor: "pointer",
                background: "none",
                border: "none",
              }}
            >
              <span
                style={{
                  backgroundColor: "var(--gray)",
                  borderRadius: "5px",
                  marginRight: "5vw",
                }}
                className="material-symbols-outlined home"
              >
                person
              </span>
            </button>
          )}
          <ul className={openMenu ? "open" : ""}>
            <li className="house">
              <Link
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
                to="/home"
                onClick={() => {
                  closeMenu();
                  closeSignin();
                }}
              >
                Home
                <span style={{ marginLeft: "5px" }} className="material-symbols-outlined home">
                  house
                </span>
              </Link>
            </li>
            <li className="monthly">
              <Link
                to="/monthly"
                onClick={() => {
                  closeMenu();
                  closeSignin();
                }}
              >
                Monthly Book
              </Link>
            </li>
            <li>
              <Link
                to={"books"}
                onClick={() => {
                  closeMenu();
                  closeSignin();
                }}
              >
                Books
              </Link>
            </li>
            <li>
              <Link
                to="#monthly-book"
                onClick={() => {
                  closeMenu();
                  closeSignin();
                }}
              >
                Members
              </Link>
            </li>
            <div></div>
            <div className="right-item">
              {loading ? (
                <li>Loading...</li>
              ) : user ? (
                <li className="signout">
                  <span>{user.username}</span>
                  <button
                    onClick={async () => {
                      signOut();
                      try {
                        const { logout } = await import("../../services/auth");
                        await logout();
                      } catch (err: any) {
                        throw new Error(err);
                      }
                    }}
                  >
                    Sign Out
                  </button>
                </li>
              ) : null}{" "}
            </div>
          </ul>
        </nav>
      </header>
      {openSignin && <Signin onClose={closeSignin} />}
    </>
  );
};

export default Header;
