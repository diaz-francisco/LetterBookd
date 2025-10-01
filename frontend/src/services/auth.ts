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

export async function login(email: string, password: string) {
  const res = await fetch("http://localhost:3001/api/v1/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  let data = null;
  try {
    data = await res.json();
  } catch (err) {
    console.error(err);
  }

  if (!res.ok) {
    const message = data?.message || "Login failed";
    throw new Error(message);
  }
  return data;
}

export async function logout() {
  const res = await fetch("http://localhost:3001/api/v1/users/logout", {
    method: "POST",
    credentials: "include",
  });
  return res.ok;
}
