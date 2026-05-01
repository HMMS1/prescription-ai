import { Link } from "react-router-dom";
import { FaCamera, FaBrain, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import "./Home.css";

function Home() {
  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-content">
          <span className="badge">AI Prescription Reader</span>

          <h1>
            Understand your prescription and find the nearest pharmacy instantly.
          </h1>

          <p>
            Upload a prescription image, let AI extract and translate the medicines,
            then connect with the closest pharmacy through chat, phone, or WhatsApp.
          </p>

          <div className="hero-actions">
            <Link to="/upload" className="primary-btn">Scan Prescription</Link>
            <Link to="/pharmacies" className="secondary-btn">Find Pharmacies</Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="scan-box">
            <FaCamera />
            <h3>Prescription Uploaded</h3>
            <p>AI is reading medicine names...</p>
            <div className="progress">
              <span></span>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <FaBrain />
          <h3>AI Translation</h3>
          <p>Extracts medicine names and explains the prescription in simple language.</p>
        </div>

        <div className="feature-card">
          <FaMapMarkerAlt />
          <h3>Nearest Pharmacy</h3>
          <p>Uses your location to suggest the closest available pharmacy.</p>
        </div>

        <div className="feature-card">
          <FaWhatsapp />
          <h3>Fast Contact</h3>
          <p>Contact the pharmacy through website chat, phone call, or WhatsApp.</p>
        </div>
      </section>
    </main>
  );
}

export default Home;