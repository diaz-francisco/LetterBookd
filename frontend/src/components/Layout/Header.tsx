import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Signin from "../Auth/Signin";
import { useAuth } from "../../contexts/AuthContext";
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
          <div className={`burger-menu ${openMenu ? "open" : ""}`} onClick={resetUI(toggleMenu)}>
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
          >
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
                <li className="user-menu" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <span>{user.name || user.username || user.email}</span>
                  <button
                    onClick={async () => {
                      // optimistic UI update
                      signOut();
                      try {
                        const { logout } = await import("../../services/auth");
                        await logout();
                      } catch {
                        // ignore network errors on logout
                      }
                    }}
                  >
                    Sign Out
                  </button>
                </li>
              ) : (
                <li className="signin" style={{ backgroundColor: "var(--background)" }}>
                  <a
                    onClick={() => {
                      closeMenu();
                      toggleSignin();
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <span
                      style={{ backgroundColor: "var(--background)", borderRadius: "5px", marginTop: "3px" }}
                      className="material-symbols-outlined home"
                    >
                      person
                    </span>
                  </a>
                </li>
              )}
            </div>
          </ul>
        </nav>
      </header>
      {openSignin && <Signin onClose={closeSignin} />}
    </>
  );
};

export default Header;
