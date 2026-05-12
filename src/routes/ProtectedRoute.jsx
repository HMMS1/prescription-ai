import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowDashboard = false }) {
  const token = localStorage.getItem("token");
  const dashboardAuth = localStorage.getItem("dashboardAuth");

  if (!token && !(allowDashboard && dashboardAuth === "true")) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

export default ProtectedRoute;
