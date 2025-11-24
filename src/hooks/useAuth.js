import { useState, useEffect } from "react";
import { loginUser, registerUser, getCurrentUser } from "../api/auth";
import { useNotification } from "../context/NotificationContext";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load current user if token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const currentUser = await getCurrentUser(token);
        setUser(currentUser);
      } catch (err) {
        console.error("Error loading user:", err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  // Login
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
      console.log(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register
  const register = async (firstName, lastName, email, password, address) => {
    setLoading(true);
    setError(null);
    try {
      await registerUser(firstName, lastName, email, password, address);
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

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
