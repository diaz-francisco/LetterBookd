import { createContext, useContext } from "react";

export type User = { _id: string; email: string; name?: string; username?: string } | null;

export type AuthCtx = {
  user: User;
  loading: boolean;
  signIn: (user: NonNullable<User>) => void;
  signOut: () => void;
};

export const Ctx = createContext<AuthCtx>({ user: null, loading: true, signIn: () => {}, signOut: () => {} });

export const useAuth = () => useContext(Ctx);

const API_BASE_URL = import.meta.env.DEV
  ? "http://localhost:3001" // Development
  : "https://letter-bookd.up.railway.app";

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/api/v1/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  let data = null;
  try {
    data = await res.json();
  } catch (err) {
    if (import.meta.env.DEV) {
      console.error(err);
    }
  }

  if (!res.ok) {
    const message = data?.message || "Login failed";
    throw new Error(message);
  }
  return data;
}

export async function signup(name: string, username: string, email: string, password: string, passwordConfirm: string) {
  const API_BASE_URL = import.meta.env.DEV ? "http://localhost:3001" : "https://letter-bookd.up.railway.app";

  const res = await fetch(`${API_BASE_URL}/api/v1/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      name,
      username,
      email,
      password,
      passwordConfirm,
    }),
  });

  let data = null;
  try {
    data = await res.json();
  } catch (err) {
    if (import.meta.env.DEV) {
      console.error(err);
    }
  }

  if (!res.ok) {
    const message = data?.message || "Signup failed";
    throw new Error(message);
  }

  return data;
}

export async function logout() {
  const res = await fetch(`${API_BASE_URL}/api/v1/users/logout`, {
    method: "POST",
    credentials: "include",
  });
  return res.ok;
}
