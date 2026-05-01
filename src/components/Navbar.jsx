import { Link } from "react-router-dom";
import { FaCapsules, FaUser, FaClinicMedical } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <FaCapsules />
        <span>MediScan AI</span>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/upload">Scan Prescription</Link>
        <Link to="/pharmacies">Pharmacies</Link>
        <Link to="/pharmacy-dashboard">
          <FaClinicMedical /> Pharmacy
        </Link>
        <Link to="/auth" className="login-btn">
          <FaUser /> Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;