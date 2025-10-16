import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuthContext();

  if (loading) return <h2>Loading...</h2>; // while checking token

  if (!user) return <Navigate to="/login" />;

  return <Outlet />;
}
