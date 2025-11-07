import { createContext, useContext, useEffect, useState } from "react";
import { request } from "../api";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // on load, try to fetch current user (if cookie exists)
  useEffect(() => {
    (async () => {
      try {
        const res = await request("/api/auth/me");
        setUser(res.user);
      } catch {}
      setLoading(false);
    })();
  }, []);

  const login = async (email, password) => {
    const res = await request("/api/auth/login", { method: "POST", body: { email, password } });
    setUser(res.user);
  };

  const logout = async () => {
    try { await request("/api/auth/logout", { method: "POST" }); } catch {}
    setUser(null);
  };

  return (
    <AuthCtx.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
