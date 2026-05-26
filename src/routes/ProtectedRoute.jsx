import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const token = localStorage.getItem("token");

  // لو مفيش توكن يرجعه لصفحة اللوجين فوراً
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  // لو فيه توكن يعرض الصفحة اللي داس عليها بسلاسة
  return <Outlet />;
}

export default ProtectedRoute;