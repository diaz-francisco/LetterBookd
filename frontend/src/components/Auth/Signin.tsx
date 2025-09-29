import { useState, useEffect } from "react";
import "./styles/Signin.css";
import { useNavigate } from "react-router-dom";

const Signin: React.FC = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const navigate = useNavigate();

  const closeSignin = () => {
    navigate(-1); // or navigate("/") if you prefer a fixed destination
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeSignin();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      onClick={e => {
        if (e.target === e.currentTarget) {
          closeSignin();
        }
      }}
    >
      <div
        className="modal-container"
        onClick={e => {
          e.stopPropagation();
        }}
      >
        {/* Mode Switch */}
        {mode === "signin" ? (
          <form className="modal-content">
            <input type="email" name="email" placeholder="Email" autoComplete="email" required />
            <input type="password" name="password" placeholder="Password" autoComplete="password" required />
            <button type="submit">Submit</button>
            <div>
              <a href="/forgot-password">Forgot Password</a>
              <button type="button">Continue with google</button>
              <a>Remember me</a>
              <input type="checkbox"></input>
            </div>
          </form>
        ) : (
          <form className="modal-content">
            <input type="email" name="email" placeholder="Email" autoComplete="email" required />
            <input type="password" name="password" placeholder="Password" autoComplete="password" required />
            <input type="password" name="password" placeholder="Re-enter Password" autoComplete="password" required />
            <button type="button">Submit</button>
          </form>
        )}
        <div className="buttons">
          <button aria-pressed={mode === "signin"} onClick={() => setMode("signin")}>
            Sign In
          </button>
          <button aria-pressed={mode === "signup"} onClick={() => setMode("signup")}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};
export default Signin;
