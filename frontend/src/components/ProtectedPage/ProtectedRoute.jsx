import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/login" />;
  }

  const decodedToken = JSON.parse(atob(token.split(".")[1]));

  if (decodedToken.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
