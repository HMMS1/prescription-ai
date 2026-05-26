import { useEffect, useState } from "react";

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

import api from "../api/api";

import "./SuperAdminDashboard.css";


// ======================================================
// DASHBOARD LOGIN
// ======================================================

function DashboardLogin({ onLogin }) {

  const [form, setForm] =
    useState({
      username: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await api.post(
        "/auth/login/",
        {
          username: form.username,
          password: form.password,
        }
      );

      const access =
        res.data.access;

      const refresh =
        res.data.refresh;

      let payload = {};

      try {

        payload = JSON.parse(
          atob(
            access.split(".")[1]
          )
        );

      } catch (err) {}

      if (
        payload.role !== "admin"
      ) {

        setError(
          "Admin accounts only"
        );

        setLoading(false);

        return;
      }

      // save admin token
      localStorage.setItem(
        "admin_token",
        access
      );

      localStorage.setItem(
        "admin_refresh",
        refresh || ""
      );

      localStorage.setItem(
        "dashboardAuth",
        "true"
      );

      localStorage.setItem(
        "dashboardUser",
        JSON.stringify({
          username:
            form.username,

          role: "admin",
        })
      );

      // remove user auth
      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "refresh"
      );

      localStorage.removeItem(
        "user"
      );

      localStorage.removeItem(
        "role"
      );

      onLogin();

    } catch (err) {

      console.log(err);

      setError(
        "Invalid username or password"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <main className="super-admin-page dashboard-login-page">

      <section className="dashboard-login-shell">

        <div className="dashboard-login-copy">

          <span className="super-admin-badge">
            <FaShieldAlt />
            Dashboard Area
          </span>

          <h1>
            Dashboard Login
          </h1>

          <p>
            Admin accounts only.
          </p>

        </div>

        <form
          className="dashboard-login-card"
          onSubmit={handleSubmit}
        >

          <div className="dashboard-login-icon">
            <FaUserShield />
          </div>

          <h2>
            Admin Access
          </h2>

          <div className="input-group">

            <FaUserShield />

            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Admin Username"
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
              placeholder="Admin Password"
              required
            />

          </div>

          {error && (

            <p
              style={{
                color: "#ff6b6b",
                marginTop: "10px",
              }}
            >
              {error}
            </p>

          )}

          <button
            className="premium-btn"
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Logging..."
              : "Enter Dashboard"}

          </button>

        </form>

      </section>

    </main>
  );
}


// ======================================================
// MAIN DASHBOARD
// ======================================================

function SuperAdminDashboard() {

  const [isDashboardLoggedIn,
    setIsDashboardLoggedIn] =
    useState(
      localStorage.getItem(
        "dashboardAuth"
      ) === "true"
    );

  const [stats, setStats] =
    useState(null);

  const [latestPharmacy,
    setLatestPharmacy] =
    useState(null);

  useEffect(() => {

    if (!isDashboardLoggedIn)
      return;

    api.get(
      "/auth/dashboard-stats/"
    )
    .then((res) => {

      setStats(res.data);

    });

    api.get(
      "/pharmacies/?ordering=-created_at"
    )
    .then((res) => {

      const results =
        res.data.results ||
        res.data;

      if (results.length > 0) {

        setLatestPharmacy(
          results[0]
        );
      }

    });

  }, [isDashboardLoggedIn]);

  const handleLogout = () => {

    localStorage.removeItem(
      "admin_token"
    );

    localStorage.removeItem(
      "admin_refresh"
    );

    localStorage.removeItem(
      "dashboardAuth"
    );

    localStorage.removeItem(
      "dashboardUser"
    );

    window.location.reload();
  };

  if (!isDashboardLoggedIn) {

    return (
      <DashboardLogin
        onLogin={() =>
          setIsDashboardLoggedIn(true)
        }
      />
    );
  }

  return (

    <main className="super-admin-page dashboard-only-page">

      <section className="super-admin-hero">

        <div className="hero-orb one"></div>

        <div className="hero-orb two"></div>

        <div className="super-admin-copy">

          <span className="super-admin-badge">

            <FaShieldAlt />

            Super Admin Control

          </span>

          <h1>
            Dashboard
          </h1>

          <p>
            Manage pharmacies.
          </p>

          <div className="super-admin-actions">

            <Link
              to="/super-admin/add-pharmacy"
              className="add-pharmacy-main-btn"
            >

              <FaPlusCircle />

              Add Pharmacy

            </Link>

            <Link
              to="/contracted-pharmacies"
              className="ghost-admin-btn"
            >

              <FaComments />

              Pharmacies

            </Link>

            <button
              className="ghost-admin-btn"
              onClick={handleLogout}
            >

              Logout

            </button>

          </div>

        </div>

        <aside className="dashboard-side-card">

          <div className="side-card-header">

            <div>

              <span>
                Current Status
              </span>

              <h2>
                {stats
                  ? stats.pharmacies_count
                  : "..."}
              </h2>

              <p>
                pharmacies
              </p>

            </div>

            <FaClinicMedical />

          </div>

          {latestPharmacy ? (

            <div className="latest-pharmacy-mini">

              <span>
                Latest Added
              </span>

              <h3>
                {latestPharmacy.name}
              </h3>

              <p>
                {latestPharmacy.owner_name}
              </p>

              <small>

                <FaMapMarkerAlt />

                {" "}

                {latestPharmacy.address}

              </small>

            </div>

          ) : (

            <div className="latest-pharmacy-mini empty">

              <span>
                No data yet
              </span>

            </div>

          )}

          <Link
            to="/super-admin/add-pharmacy"
            className="mini-arrow-link"
          >

            Start adding now

            <FaArrowRight />

          </Link>

        </aside>

      </section>

    </main>
  );
}

export default SuperAdminDashboard;