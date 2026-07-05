import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import SkeletonCard from "@/shared/components/SkeletonCard";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <h1>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </h1>
    );

  if (!user) return <Navigate to="/" replace />;

  return children;
}

export default ProtectedRoute;
