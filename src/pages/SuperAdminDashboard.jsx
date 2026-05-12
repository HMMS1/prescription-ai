import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPlusCircle,
  FaClinicMedical,
  FaShieldAlt,
  FaComments,
  FaArrowRight,
  FaMapMarkerAlt,
  FaLock,
  FaUserShield,
} from "react-icons/fa";
import "./SuperAdminDashboard.css";

function DashboardLogin({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Temporary frontend-only login.
    // Any username/password will work until backend authentication is connected.
    localStorage.setItem("dashboardAuth", "true");
    localStorage.setItem(
      "dashboardUser",
      JSON.stringify({ username: form.username || "dashboard-admin", role: "superadmin" })
    );
    onLogin();
  };

  return (
    <main className="super-admin-page dashboard-login-page">
      <section className="dashboard-login-shell">
        <div className="dashboard-login-copy">
          <span className="super-admin-badge">
            <FaShieldAlt /> Dashboard Area
          </span>
          <h1>Dashboard Login</h1>
          <p>
            This login is separated from the normal user login. For now, write any
            username and password to enter. Backend will validate real credentials later.
          </p>
        </div>

        <form className="dashboard-login-card" onSubmit={handleSubmit}>
          <div className="dashboard-login-icon">
            <FaUserShield />
          </div>

          <h2>Super Admin Access</h2>

          <div className="input-group">
            <FaUserShield />
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Write any username"
              required
            />
          </div>

          <div className="input-group">
            <FaLock />
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="Write any password"
              required
            />
          </div>

          <button className="premium-btn" type="submit">
            Enter Dashboard
          </button>
        </form>
      </section>
    </main>
  );
}

function SuperAdminDashboard() {
  const [isDashboardLoggedIn, setIsDashboardLoggedIn] = useState(
    localStorage.getItem("dashboardAuth") === "true"
  );

  if (!isDashboardLoggedIn) {
    return <DashboardLogin onLogin={() => setIsDashboardLoggedIn(true)} />;
  }

  const pharmacies = JSON.parse(localStorage.getItem("contractedPharmacies") || "[]");
  const latest = pharmacies[0];

  return (
    <main className="super-admin-page dashboard-only-page">
      <section className="super-admin-hero">
        <div className="hero-orb one"></div>
        <div className="hero-orb two"></div>

        <div className="super-admin-copy">
          <span className="super-admin-badge">
            <FaShieldAlt /> Super Admin Control
          </span>

          <h1>Dashboard</h1>
          <p>
            The dashboard is separated from the normal Login/Register page. Add contracted
            pharmacies here, then view them directly from Contracted Pharmacies.
          </p>

          <div className="super-admin-actions">
            <Link to="/super-admin/add-pharmacy" className="add-pharmacy-main-btn">
              <FaPlusCircle /> Add Pharmacy
            </Link>

            <Link to="/contracted-pharmacies" className="ghost-admin-btn">
              <FaComments /> View Contracted Pharmacies
            </Link>
          </div>
        </div>

        <aside className="dashboard-side-card">
          <div className="side-card-header">
            <div>
              <span>Current Status</span>
              <h2>{pharmacies.length}</h2>
              <p>registered pharmacies</p>
            </div>
            <FaClinicMedical />
          </div>

          {latest ? (
            <div className="latest-pharmacy-mini">
              <span>Latest Added</span>
              <h3>{latest.pharmacyName}</h3>
              <p>Dr. {latest.doctorName}</p>
              <small><FaMapMarkerAlt /> {latest.address}</small>
            </div>
          ) : (
            <div className="latest-pharmacy-mini empty">
              <span>No data yet</span>
              <h3>Add your first pharmacy</h3>
              <p>The list will start appearing after adding pharmacy accounts.</p>
            </div>
          )}

          <Link to="/super-admin/add-pharmacy" className="mini-arrow-link">
            Start adding now <FaArrowRight />
          </Link>
        </aside>
      </section>
    </main>
  );
}

export default SuperAdminDashboard;
