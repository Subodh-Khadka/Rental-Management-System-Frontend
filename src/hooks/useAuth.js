import { useState, useEffect } from "react";
import { loginUser, registerUser, getCurrentUser } from "../api/auth";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Load current user if token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const currentUser = await getCurrentUser(token);
        setUser(currentUser);
      } catch (err) {
        console.error("Error loading user:", err);
        logout(); // token might be invalid
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  // 🔹 Login
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      });
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Register
  const register = async (firstName, lastName, email, password, address) => {
    setLoading(true);
    setError(null);
    try {
      await registerUser(firstName, lastName, email, password, address);
      // After successful registration, you can auto-login if desired:
      //   await login(email, password);
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  };
}
