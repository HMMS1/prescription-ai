import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaPhoneAlt, FaMapMarkerAlt, FaComments, FaUserMd } from "react-icons/fa";
import "./ContractedPharmacies.css";

function ContractedPharmacies() {
  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    setPharmacies(JSON.parse(localStorage.getItem("contractedPharmacies") || "[]"));
  }, []);

  return (
    <main className="contracted-page">
      <section className="contracted-header">
        <span>Trusted Partners</span>
        <h1>Contracted Pharmacies</h1>
        <p>
          These pharmacies are registered by MediScan AI. You can chat with them directly
          about your prescription availability before visiting.
        </p>
      </section>

      {pharmacies.length === 0 ? (
        <section className="contracted-empty">
          <FaMapMarkerAlt />
          <h3>No contracted pharmacies added yet</h3>
          <p>The Super Admin should add pharmacies first.</p>
        </section>
      ) : (
        <section className="contracted-grid">
          {pharmacies.map((pharmacy) => (
            <article className="contracted-card" key={pharmacy.id}>
              <div className="contracted-icon">
                <FaUserMd />
              </div>

              <h3>{pharmacy.pharmacyName}</h3>
              <p className="doctor-name">Dr. {pharmacy.doctorName}</p>
              <p className="address">
                <FaMapMarkerAlt /> {pharmacy.address}
              </p>

              <span className="phone-pill">{pharmacy.phone}</span>

              <div className="contracted-actions">
                <Link to={`/chat/${pharmacy.id}`} className="chat-action">
                  <FaComments /> Chat
                </Link>

                <a href={`tel:${pharmacy.phone}`} title="Call pharmacy">
                  <FaPhoneAlt />
                </a>

                <a
                  href={`https://wa.me/${pharmacy.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  title="Open WhatsApp"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default ContractedPharmacies;
