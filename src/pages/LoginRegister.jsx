import { useState } from "react";

import api from "../api/api";

import "./LoginRegister.css";

function LoginRegister() {

  const [isLogin, setIsLogin] =
    useState(true);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [form, setForm] =
    useState({
      username: "",
      email: "",
      password: "",
    });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  // ======================
  // REGISTER
  // ======================

  const registerUser = async () => {

    try {

      setLoading(true);

      await api.post(
        "/auth/register/",
        {
          username: form.username,
          email: form.email,
          password: form.password,
          role: "user",
        }
      );

      await loginUser(
        form.username,
        form.password
      );

    } catch (err) {

      console.log(err);

      setError(
        err.response?.data?.detail ||
        "Registration failed"
      );

      setLoading(false);
    }
  };

  // ======================
  // LOGIN
  // ======================

  const loginUser = async (
    usernameOverride,
    passwordOverride
  ) => {

    try {

      setLoading(true);

      const res = await api.post(
        "/auth/login/",
        {
          username:
            usernameOverride ||
            form.username,

          password:
            passwordOverride ||
            form.password,
        }
      );

      console.log(
        "LOGIN:",
        res.data
      );

      const access =
        res.data.access;

      const refresh =
        res.data.refresh;

      if (!access) {

        setError(
          "No access token returned"
        );

        setLoading(false);

        return;
      }

      // decode jwt
      let payload = {};

      try {

        payload = JSON.parse(
          atob(
            access.split(".")[1]
          )
        );

      } catch (err) {

        console.log(err);
      }

      // لو أدمن امنعه يدخل من هنا
      if (
        payload.role === "admin"
      ) {

        setError(
          "Admins must login from Dashboard page"
        );

        setLoading(false);

        return;
      }

      // save user token
      localStorage.setItem(
        "token",
        access
      );

      localStorage.setItem(
        "refresh",
        refresh || ""
      );

      // save user info
      localStorage.setItem(
        "user",
        JSON.stringify({
          id:
            payload.user_id || 1,

          username:
            usernameOverride ||
            form.username,

          role:
            payload.role ||
            "user",
        })
      );

      localStorage.setItem(
        "role",
        payload.role || "user"
      );

      // remove dashboard auth
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

      window.location.href = "/";

    } catch (err) {

      console.log(err);

      setError(
        "Invalid username or password"
      );

    } finally {

      setLoading(false);
    }
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (isLogin) {

      loginUser();

    } else {

      registerUser();
    }
  };

  return (

    <main className="auth-page">

      <div className="auth-shell">

        <section className="auth-brand">

          <div className="brand-glow"></div>

          <span className="mini-badge">
            MediScan AI
          </span>

          <h1>
            Smart medical help,
            faster pharmacy access.
          </h1>

          <p>
            Users and pharmacies login here.
          </p>

        </section>

        <form
          className="auth-panel"
          onSubmit={handleSubmit}
        >

          <div className="auth-tabs">

            <button
              type="button"
              className={
                isLogin
                  ? "active"
                  : ""
              }
              onClick={() => {
                setIsLogin(true);
                setError("");
              }}
            >
              Login
            </button>

            <button
              type="button"
              className={
                !isLogin
                  ? "active"
                  : ""
              }
              onClick={() => {
                setIsLogin(false);
                setError("");
              }}
            >
              Register
            </button>

          </div>

          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />

          {!isLogin && (

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />

          )}

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />

          {error && (

            <p
              className="auth-error"
              style={{
                color: "#ff4d4d",
                fontWeight: "bold",
              }}
            >
              {error}
            </p>

          )}

          <button
            className="submit-btn"
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Please wait..."
              : isLogin
              ? "Login"
              : "Create Account"}

          </button>

          <p className="auth-hint">
            Admin login is separated
            from dashboard page.
          </p>

        </form>

      </div>

    </main>
  );
}

export default LoginRegister;