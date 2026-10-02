import { createContext, useContext, useEffect, useState } from "react";
import { api } from "./api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api("/api/users/me").then(({ ok, data }) => {
      setUser(ok ? data.user : null);
      setLoading(false);
    });
  }, []);

  const login = async (email, password) => {
    const res = await api("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) setUser(res.data.user);
    return res;
  };

  const signup = async (fullName, email, password) => {
    const res = await api("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ fullName, email, password }),
    });
    if (res.ok) setUser(res.data.user);
    return res;
  };

  const logout = async () => {
    await api("/api/users/logout", { method: "POST" });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);