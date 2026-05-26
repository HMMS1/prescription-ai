import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  FaWhatsapp,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaUserMd,
  FaComments,
  FaUser
} from "react-icons/fa";

import api from "../api/api";

import "./ContractedPharmacies.css";

function ContractedPharmacies() {

  const [items, setItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const navigate = useNavigate();

  const role =
    localStorage.getItem("role");

  useEffect(() => {

    // لو Pharmacy
    if (role === "pharmacy") {

      api
        .get(
          "/pharmacies/pharmacy-conversations/"
        )
        .then((res) => {

          setItems(res.data);

        })
        .catch((err) => {

          console.log(err);

        })
        .finally(() => {

          setLoading(false);

        });

    }

    // لو User
    else {

      api
        .get(
          "/pharmacies/contracted/"
        )
        .then((res) => {

          setItems(
            res.data.results || res.data
          );

        })
        .catch((err) => {

          console.log(err);

        })
        .finally(() => {

          setLoading(false);

        });

    }

  }, [role]);

  return (

    <main className="contracted-page">

      <section className="contracted-header">

        <span>

          {role === "pharmacy"
            ? "Users"
            : "Trusted Partners"}

        </span>

        <h1>

          {role === "pharmacy"
            ? "Users Conversations"
            : "Contracted Pharmacies"}

        </h1>

      </section>

      {loading ? (

        <section className="contracted-empty">
          <p>Loading...</p>
        </section>

      ) : items.length === 0 ? (

        <section className="contracted-empty">
          <h3>No Data</h3>
        </section>

      ) : (

        <section className="contracted-grid">

          {role === "pharmacy"

            ? items.map((user) => (

                <article
                  className="contracted-card"
                  key={user.user_id}
                >

                  <div className="contracted-icon">
                    <FaUser />
                  </div>

                  <h3>
                    {user.username}
                  </h3>

                  <p className="doctor-name">
                    User Account
                  </p>

                  <div
                    className="contracted-actions"
                  >

                    <button
                      onClick={() =>
                        navigate(
                          `/pharmacy-chat/${user.user_id}`
                        )
                      }
                    >
                      <FaComments />
                    </button>

                  </div>

                </article>

              ))

            : items.map((pharmacy) => (

                <article
                  className="contracted-card"
                  key={pharmacy.id}
                >

                  <div className="contracted-icon">
                    <FaUserMd />
                  </div>

                  <h3>
                    {pharmacy.name}
                  </h3>

                  <p className="doctor-name">
                    {pharmacy.owner_name}
                  </p>

                  <p className="address">
                    <FaMapMarkerAlt />

                    {pharmacy.address}
                  </p>

                  <span className="phone-pill">
                    {pharmacy.phone}
                  </span>

                  <div className="contracted-actions">

                    <a
                      href={`tel:${pharmacy.phone}`}
                    >
                      <FaPhoneAlt />
                    </a>

                    <a
                      href={`https://wa.me/${pharmacy.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaWhatsapp />
                    </a>

                    <button
                      onClick={() =>
                        navigate(
                          `/chat/${pharmacy.id}`
                        )
                      }
                    >
                      <FaComments />
                    </button>

                  </div>

                </article>

              ))}

        </section>

      )}

    </main>
  );
}

export default ContractedPharmacies;