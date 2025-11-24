import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuthContext();

  // Show loading screen until the auth check is done
  if (loading) return <h2>Checking authentication...</h2>;

  // Only redirect if auth check is done AND no user
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}
