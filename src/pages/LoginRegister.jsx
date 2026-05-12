import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginRegister.css";

function LoginRegister() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const getStoredUsers = () =>
    JSON.parse(localStorage.getItem("users") || "[]");

  const registerUser = () => {
    const users = getStoredUsers();
    const alreadyExists = users.some((user) => user.email === form.email);

    if (alreadyExists) {
      alert("This email is already registered");
      return;
    }

    const newUser = {
      id: Date.now(),
      fullName: form.fullName,
      email: form.email,
      password: form.password,
      role: "user",
    };

    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    localStorage.setItem("token", "fake-token");
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: newUser.id,
        name: newUser.fullName,
        email: newUser.email,
        role: "user",
      })
    );
    localStorage.setItem("role", "user");

    navigate("/");
  };

  const loginUser = () => {
    /*
      Temporary fake login:
      أي Email / Username + أي Password هيدخل عادي دلوقتي كـ user.
      لما نربط بالباك هنرجع نتحقق من البيانات الحقيقية.
    */

    const loginId = form.email.trim();

    const fakeLoggedUser = {
      id: Date.now(),
      name: loginId || "Test User",
      email: loginId,
      username: loginId,
      role: "user",
    };

    localStorage.setItem("token", "fake-token");
    localStorage.setItem("user", JSON.stringify(fakeLoggedUser));
    localStorage.setItem("role", "user");

    navigate("/");
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

          <span className="mini-badge">MediScan AI</span>

          <h1>Smart medical help, faster pharmacy access.</h1>

          <p>
            Users create normal accounts here. Contracted pharmacies can also
            login here after the dashboard creates their username and password.
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
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          )}

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type={isLogin ? "text" : "email"}
            placeholder={isLogin ? "Email or Pharmacy Username" : "Email Address"}
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
            {isLogin ? "Login" : "Create User Account"}
          </button>

          <p className="auth-hint">
            Dashboard admin login is separated from this page. Open Dashboard
            from the navbar.
          </p>
        </form>
      </div>
    </main>
  );
}

export default LoginRegister;