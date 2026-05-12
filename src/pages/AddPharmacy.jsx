import { useEffect, useState } from "react";
import {
  FaClinicMedical,
  FaUserMd,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaLock,
  FaTrash,
  FaPlusCircle,
  FaEnvelope,
} from "react-icons/fa";
import "./SuperAdminDashboard.css";

function AddPharmacy() {
  const [pharmacies, setPharmacies] = useState([]);
  const [form, setForm] = useState({
    doctorName: "",
    pharmacyName: "",
    address: "",
    phone: "",
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setPharmacies(JSON.parse(localStorage.getItem("contractedPharmacies") || "[]"));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      doctorName: "",
      pharmacyName: "",
      address: "",
      phone: "",
      username: "",
      email: "",
      password: "",
    });
  };

  const savePharmacies = (items) => {
    localStorage.setItem("contractedPharmacies", JSON.stringify(items));
    setPharmacies(items);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const exists = pharmacies.some(
      (pharmacy) =>
        pharmacy.username === form.username ||
        (form.email && pharmacy.email === form.email) ||
        pharmacy.phone === form.phone
    );

    if (exists) {
      alert("This pharmacy username/email/phone already exists");
      return;
    }

    const newPharmacy = {
      id: Date.now(),
      doctorName: form.doctorName,
      pharmacyName: form.pharmacyName,
      address: form.address,
      phone: form.phone,
      whatsapp: form.phone,
      username: form.username,
      email: form.email,
      password: form.password,
      role: "pharmacy",
      createdAt: new Date().toISOString(),
    };

    savePharmacies([newPharmacy, ...pharmacies]);
    resetForm();
  };

  const deletePharmacy = (id) => {
    const updated = pharmacies.filter((pharmacy) => pharmacy.id !== id);
    savePharmacies(updated);
  };

  return (
    <main className="super-admin-page">
      <section className="super-admin-header centered-admin-header">
        <span>
          <FaPlusCircle /> Add Pharmacy
        </span>
        <h1>Add Contracted Pharmacy</h1>
        <p>
          Create pharmacy login credentials and keep the registered pharmacies visible
          beside the form so you always know what has already been added.
        </p>
      </section>

      <section className="admin-grid">
        <form className="add-pharmacy-card" onSubmit={handleSubmit}>
          <h2>Pharmacy Data</h2>

          <div className="input-group">
            <FaUserMd />
            <input
              name="doctorName"
              value={form.doctorName}
              onChange={handleChange}
              placeholder="Doctor Name"
              required
            />
          </div>

          <div className="input-group">
            <FaClinicMedical />
            <input
              name="pharmacyName"
              value={form.pharmacyName}
              onChange={handleChange}
              placeholder="Pharmacy Name"
              required
            />
          </div>

          <div className="input-group">
            <FaMapMarkerAlt />
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              required
            />
          </div>

          <div className="input-group">
            <FaPhoneAlt />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone / WhatsApp Number"
              required
            />
          </div>

          <div className="input-group">
            <FaLock />
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Pharmacy Username"
              required
            />
          </div>

          <div className="input-group">
            <FaEnvelope />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="Pharmacy Email (optional but recommended)"
            />
          </div>

          <div className="input-group">
            <FaLock />
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="Pharmacy Password"
              required
            />
          </div>

          <button className="premium-btn" type="submit">
            <FaPlusCircle /> Add Pharmacy Account
          </button>
        </form>

        <div className="pharmacies-admin-card">
          <div className="admin-card-title">
            <h2>Registered Pharmacies</h2>
            <span>{pharmacies.length} pharmacies</span>
          </div>

          {pharmacies.length === 0 ? (
            <div className="empty-admin-state">
              <FaClinicMedical />
              <h3>No pharmacies yet</h3>
              <p>Add your first contracted pharmacy from the form.</p>
            </div>
          ) : (
            <div className="admin-pharmacy-list">
              {pharmacies.map((pharmacy) => (
                <div className="admin-pharmacy-row" key={pharmacy.id}>
                  <div>
                    <h3>{pharmacy.pharmacyName}</h3>
                    <p>Dr. {pharmacy.doctorName}</p>
                    <p>{pharmacy.address}</p>
                    <span>{pharmacy.phone}</span>
                    <small>Login: {pharmacy.username}</small>
                  </div>

                  <button
                    type="button"
                    className="delete-pharmacy-btn"
                    onClick={() => deletePharmacy(pharmacy.id)}
                    title="Delete pharmacy"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default AddPharmacy;
