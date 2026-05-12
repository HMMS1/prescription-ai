import { Navigate } from "react-router-dom";

function AdminDashboardRoute({ children }) {
  const dashboardAuth = localStorage.getItem("dashboardAuth");

  if (dashboardAuth !== "true") {
    return <Navigate to="/super-admin" replace />;
  }

  return children;
}

export default AdminDashboardRoute;
