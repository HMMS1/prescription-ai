import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaCapsules,
  FaUser,
  FaShieldAlt,
  FaSignOutAlt,
  FaHome,
  FaCamera,
  FaMapMarkerAlt,
  FaPlusCircle,
  FaClinicMedical,
} from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // السطر ده بيجبر الناف بار يتحدث ويقرا التوكن الجديد مع كل تغيير مسار
  const token = localStorage.getItem("token");
  const dashboardAuth = localStorage.getItem("dashboardAuth");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("dashboardAuth");
    localStorage.removeItem("dashboardUser");
    navigate("/auth");
  };

  const linkClass = ({ isActive }) => (isActive ? "nav-item active" : "nav-item");
  const isLoggedIn = !!token;

  return (
    <nav className="navbar">
      <Link to="/" className="logo" aria-label="MediScan AI Home">
        <span className="logo-icon"><FaCapsules /></span>
        <span>MediScan AI</span>
      </Link>

      <div className="nav-links">
        <NavLink to="/" className={linkClass} end>
          <FaHome /> Home
        </NavLink>

        <NavLink to="/upload" className={linkClass}>
          <FaCamera /> Scan Prescription
        </NavLink>

        <NavLink to="/pharmacies" className={linkClass}>
          <FaMapMarkerAlt /> Nearest Pharmacies
        </NavLink>

        <NavLink to="/contracted-pharmacies" className={linkClass}>
          <FaClinicMedical /> Contracted Pharmacies
        </NavLink>

        <NavLink to="/dashboard" className={linkClass}>
          <FaShieldAlt /> Dashboard
        </NavLink>

        {dashboardAuth && (
          <NavLink to="/super-admin/add-pharmacy" className="nav-item nav-add">
            <FaPlusCircle /> Add Pharmacy
          </NavLink>
        )}

        {!isLoggedIn ? (
          <Link to="/auth" className="login-btn">
            <FaUser /> Login
          </Link>
        ) : (
          <button className="logout-btn" onClick={handleLogout} type="button">
            <FaSignOutAlt /> Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;