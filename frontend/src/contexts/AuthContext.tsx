// frontend/src/contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";

type User = { _id: string; email: string; name?: string; username?: string } | null;

type AuthCtx = {
  user: User;
  loading: boolean;
  signIn: (user: NonNullable<User>) => void;
  signOut: () => void;
};

const Ctx = createContext<AuthCtx>({ user: null, loading: true, signIn: () => {}, signOut: () => {} });
export const useAuth = () => useContext(Ctx);

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
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const signIn = (u: NonNullable<User>) => setUser(u);
  const signOut = () => setUser(null);

  return <Ctx.Provider value={{ user, loading, signIn, signOut }}>{children}</Ctx.Provider>;
};
