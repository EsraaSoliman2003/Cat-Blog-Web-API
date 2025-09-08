// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import useBlog from "../context/useBlog";

export default function ProtectedRoute({ children }) {
  const { token } = useBlog();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
