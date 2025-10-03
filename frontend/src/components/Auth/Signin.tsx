import { useState, useEffect } from "react";
import { useAuth } from "../../services/auth";
import "./styles/Signin.css";

interface SigninProps {
  onClose: () => void;
}

const Signin: React.FC<SigninProps> = ({ onClose }) => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const { signIn } = useAuth();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      onClick={e => {
        if (e.target === e.currentTarget) {
          onClose();
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
          <form
            className="modal-content"
            onSubmit={async e => {
              e.preventDefault();
              const form = e.currentTarget as HTMLFormElement;
              const formData = new FormData(form);
              const email = String(formData.get("email") || "");
              const password = String(formData.get("password") || "");

              try {
                const { login } = await import("../../services/auth");
                const resp = await login(email, password);

                signIn(resp?.data?.user);
                onClose();
              } catch (err) {
                const message = err instanceof Error ? err.message : "Login failed";
                alert(message);
              }
            }}
          >
            <input type="email" name="email" placeholder="Email" autoComplete="email" required />
            <input type="password" name="password" placeholder="Password" autoComplete="current-password" required />
            <button type="submit">Submit</button>
            <div>
              <a href="/forgot-password">Forgot Password</a>
              <button type="button">Continue with google</button>
              <label>
                Remember me <input type="checkbox" name="remember" />
              </label>
            </div>
          </form>
        ) : (
          <form
            className="modal-content"
            onSubmit={async e => {
              e.preventDefault();
              const form = e.currentTarget as HTMLFormElement;
              const formData = new FormData(form);

              const name = String(formData.get("name") || "");
              const username = String(formData.get("username") || "");
              const email = String(formData.get("email") || "");
              const password = String(formData.get("password") || "");
              const passwordConfirm = String(formData.get("passwordConfirm") || "");

              try {
                const { signup } = await import("../../services/auth");
                const resp = await signup(name, username, email, password, passwordConfirm);

                signIn(resp?.data?.user);
                onClose();
              } catch (err) {
                const message = err instanceof Error ? err.message : "Signup failed";
                alert(message);
              }
            }}
          >
            <input type="text" name="name" placeholder="Full Name" autoComplete="name" required />
            <input type="text" name="username" placeholder="Username" autoComplete="new-username" required />
            <input type="email" name="email" placeholder="Email" autoComplete="email" required />
            <input type="password" name="password" placeholder="Password" autoComplete="new-password" required />
            <input
              type="password"
              name="passwordConfirm"
              placeholder="Re-enter Password"
              autoComplete="new-password"
              required
            />
            <button type="submit">Submit</button>
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
