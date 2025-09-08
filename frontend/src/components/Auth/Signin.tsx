import { useState } from "react";

const Signin: React.FC = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <div>
      <div>
        <button aria-pressed={mode === "signin"} onClick={() => setMode("signin")}>
          Sign In
        </button>
        <button aria-pressed={mode === "signup"} onClick={() => setMode("signup")}>
          Sign Up
        </button>
      </div>
      {/* Mode Switch */}
      {mode === "signin" ? (
        <form>
          <input type="email" name="email" placeholder="Email" autoComplete="email" required />
          <input type="password" name="password" placeholder="Password" autoComplete="password" required />
          <button type="submit">Sign In</button>
          <div>
            <a href="/forgot-password">Forgot Password</a>
            <button type="button">Continue with google</button>
          </div>
        </form>
      ) : (
        <form></form>
      )}
    </div>
  );
};
export default Signin;
