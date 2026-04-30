import { Navigate, useLocation } from "react-router-dom";
import { getToken } from "../services/api";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = getToken();

  if (!token) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }

  return children;
}
