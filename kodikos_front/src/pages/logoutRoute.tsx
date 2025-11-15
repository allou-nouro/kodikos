import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/userContext";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(AppContext);

  if (!token || token === "") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
