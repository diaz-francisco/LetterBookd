import { useEffect, useState } from "react";
import { Ctx, type User } from "../services/auth";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:3001/api/v1/users/me", { credentials: "include" });

        if (res.ok) {
          const data = await res.json();
          setUser(data?.data?.user ?? null);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error in /me request:", error);
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
