import { useState } from "react";
import "./styles/Signin.css";

const Signin: React.FC = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <div className="modal">
      <div className="buttons">
        <button aria-pressed={mode === "signin"} onClick={() => setMode("signin")}>
          Sign In
        </button>
        <button aria-pressed={mode === "signup"} onClick={() => setMode("signup")}>
          Sign Up
        </button>
      </div>
      {/* Mode Switch */}
      {mode === "signin" ? (
        <form className="modal-content">
          <input type="email" name="email" placeholder="Email" autoComplete="email" required />
          <input type="password" name="password" placeholder="Password" autoComplete="password" required />
          <button type="submit">Submit</button>
          <div>
            <a href="/forgot-password">Forgot Password</a>
            <button type="button">Continue with google</button>
            <input type="checkbox"></input>
            <p>Remember me</p>
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
    </div>
  );
};
export default Signin;
