import { useState, useRef } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";

export default function Login() {
  const { login } = useAuthContext();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isSubmitting = useRef(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading || isSubmitting.current) return;
    isSubmitting.current = true;
    setLoading(true);
    setError("");

    try {
      await login(formData.email, formData.password);
      addNotification("success", "Logged in successfully!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      addNotification("error", "Login failed!");
      setError(err.message || "Login failed");
    } finally {
      setTimeout(() => {
        setLoading(false);
        isSubmitting.current = false;
      }, 1000);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-80 flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white font-semibold py-2 rounded-md transition duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed pointer-events-none"
              : "bg-blue-600 hover:bg-blue-500"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
