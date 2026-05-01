import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginRegister.css";

function LoginRegister() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [accountType, setAccountType] = useState("user");

  const [form, setForm] = useState({
    fullName: "",
    pharmacyName: "",
    address: "",
    whatsapp: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fake Login مؤقت لحد ما نعمل Backend
    const fakeUser = {
      name: isLogin ? "Test User" : form.fullName,
      email: form.email,
      role: isLogin ? "user" : accountType,
      pharmacyName: form.pharmacyName,
      address: form.address,
      whatsapp: form.whatsapp,
    };

    localStorage.setItem("token", "fake-token");
    localStorage.setItem("user", JSON.stringify(fakeUser));
    localStorage.setItem("role", fakeUser.role);

    if (fakeUser.role === "pharmacy") {
      navigate("/pharmacy-dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <section className="auth-brand">
          <div className="brand-glow"></div>

          <span className="mini-badge">MediScan AI</span>

          <h1>Smart medical help, faster pharmacy access.</h1>

          <p>
            Upload prescriptions, understand medicines, and connect with nearby
            pharmacies in minutes.
          </p>
        </section>

        <form className="auth-panel" onSubmit={handleSubmit}>
          <div className="auth-tabs">
            <button
              type="button"
              className={isLogin ? "active" : ""}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>

            <button
              type="button"
              className={!isLogin ? "active" : ""}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          {!isLogin && (
            <div className="role-select">
              <button
                type="button"
                className={accountType === "user" ? "selected" : ""}
                onClick={() => setAccountType("user")}
              >
                User
              </button>

              <button
                type="button"
                className={accountType === "pharmacy" ? "selected" : ""}
                onClick={() => setAccountType("pharmacy")}
              >
                Pharmacy
              </button>
            </div>
          )}

          {!isLogin && (
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          )}

          {!isLogin && accountType === "pharmacy" && (
            <>
              <input
                name="pharmacyName"
                value={form.pharmacyName}
                onChange={handleChange}
                placeholder="Pharmacy Name"
                required
              />

              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Pharmacy Address"
                required
              />

              <input
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                placeholder="WhatsApp Number"
                required
              />
            </>
          )}

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Email Address"
            required
          />

          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            required
          />

          <button className="submit-btn" type="submit">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default LoginRegister;