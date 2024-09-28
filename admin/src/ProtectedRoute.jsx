import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/authContext";

const ProtectedRoute = ({ roles, children }) => {
  const { token, userRole } = useContext(AuthContext);

  if (!token || !roles.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
