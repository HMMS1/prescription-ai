import { FaPrescriptionBottleAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "./PharmacyDashboard.css";

function PharmacyDashboard() {
  const requests = [
    {
      user: "Ahmed Mohamed",
      medicine: "Augmentin 1g",
      status: "Pending",
    },
    {
      user: "Sara Ali",
      medicine: "Panadol Extra",
      status: "Available",
    },
    {
      user: "Omar Hassan",
      medicine: "Vitamin C",
      status: "Not Available",
    },
  ];

  return (
    <main className="dashboard-page">
      <section className="dashboard-header">
        <h1>Pharmacy Dashboard</h1>
        <p>Manage medicine availability and user prescription requests.</p>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <h3>24</h3>
          <p>Today Requests</p>
        </div>

        <div className="stat-card">
          <h3>18</h3>
          <p>Available Medicines</p>
        </div>

        <div className="stat-card">
          <h3>6</h3>
          <p>Pending Replies</p>
        </div>
      </section>

      <section className="requests-box">
        <h2>Prescription Requests</h2>

        {requests.map((req, index) => (
          <div className="request-row" key={index}>
            <FaPrescriptionBottleAlt />
            <div>
              <h4>{req.user}</h4>
              <p>{req.medicine}</p>
            </div>

            <span className="request-status">{req.status}</span>

            <div className="request-actions">
              <button className="accept">
                <FaCheckCircle />
              </button>
              <button className="reject">
                <FaTimesCircle />
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default PharmacyDashboard;