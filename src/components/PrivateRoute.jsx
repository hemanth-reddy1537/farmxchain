import { Navigate } from "react-router-dom";
import { getRolesFromToken } from "../utils/jwt";

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0) {
    const roles = getRolesFromToken(token).map(r => r.toLowerCase());
    const allowed = allowedRoles.map(r => r.toLowerCase());

    const match = roles.some(role => allowed.includes(role));
    if (!match) return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
