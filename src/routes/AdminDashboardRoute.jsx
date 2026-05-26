import {
  Navigate,
  Outlet,
} from "react-router-dom";

function AdminDashboardRoute() {

  const adminToken =
    localStorage.getItem(
      "admin_token"
    );

  const dashboardAuth =
    localStorage.getItem(
      "dashboardAuth"
    );

  if (
    !adminToken ||
    dashboardAuth !== "true"
  ) {

    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return <Outlet />;
}

export default AdminDashboardRoute;