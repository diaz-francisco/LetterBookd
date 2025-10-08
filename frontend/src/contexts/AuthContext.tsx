import { useEffect, useState } from "react";
import { Ctx, type User } from "../services/auth";

const API_BASE_URL = import.meta.env.DEV ? "http://localhost:3001" : "https://letter-bookd.up.railway.app";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
          credentials: "include",
        });

        if (!res.ok) {
          setUser(null);
          return;
        }

        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data?.data?.user ?? null);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const signIn = (u: NonNullable<User>) => setUser(u);
  const signOut = () => setUser(null);

  return <Ctx.Provider value={{ user, loading, signIn, signOut }}>{children}</Ctx.Provider>;
};
