import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";


const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <p className="mt-10 text-center">Checking session...</p>;
  if (!user) return <Navigate to="/signin" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <p className="mt-10 text-center text-red-500">
        Forbidden. Requires role: {allowedRoles.join(" or ")}. Your role: {user.role}
      </p>
    );
  }

  return children;
};

export default ProtectedRoute;