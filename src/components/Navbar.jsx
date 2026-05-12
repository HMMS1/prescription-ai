import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  FaCapsules,
  FaUser,
  FaShieldAlt,
  FaComments,
  FaSignOutAlt,
  FaHome,
  FaCamera,
  FaMapMarkerAlt,
  FaPlusCircle,
} from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dashboardAuth = localStorage.getItem("dashboardAuth");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("dashboardAuth");
    localStorage.removeItem("dashboardUser");
    navigate("/auth");
  };

  const linkClass = ({ isActive }) => (isActive ? "nav-item active" : "nav-item");
  const isLoggedIn = token || dashboardAuth;

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
          <FaComments /> Contracted Pharmacies
        </NavLink>

        <NavLink to="/super-admin" className={linkClass}>
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
