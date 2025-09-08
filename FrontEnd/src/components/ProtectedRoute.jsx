import { Navigate } from "react-router-dom";
import useBlog from "../context/useBlog";

export default function ProtectedRoute({ children }) {
  const { isTokenValid } = useBlog();

  if (!isTokenValid()) {
    return <Navigate to="/" replace />;
  }

  return children;
}
