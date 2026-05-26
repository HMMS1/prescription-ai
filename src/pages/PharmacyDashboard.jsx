import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import api from "../api/api";

import "./PharmacyDashboard.css";

function PharmacyDashboard() {

  const [conversations, setConversations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const role =
    localStorage.getItem("role");

  useEffect(() => {

    api
      .get(
        "/pharmacies/pharmacy-conversations/"
      )
      .then((res) => {

        setConversations(res.data);

      })
      .catch((err) => {

        console.log(err);

      })
      .finally(() => {

        setLoading(false);

      });

  }, []);

  return (

    <div className="pharmacy-dashboard-page">

      <div className="pharmacy-dashboard-card">

        <h1>
          Conversations
        </h1>

        {loading ? (

          <p>
            Loading...
          </p>

        ) : conversations.length === 0 ? (

          <p>
            No conversations yet
          </p>

        ) : (

          <div className="conversation-list">

            {conversations.map(
              (conversation, index) => (

                <Link
                  key={index}

                  className="conversation-item"

                  to={
                    role === "pharmacy"

                      ? `/pharmacy-chat/${conversation.user_id}`

                      : `/chat/${conversation.pharmacy_id}`
                  }
                >

                  <div>

                    <h3>

                      {role === "pharmacy"

                        ? conversation.username

                        : conversation.pharmacy_name}

                    </h3>

                    <span>

                      {role === "pharmacy"

                        ? "User Account"

                        : "Pharmacy"}

                    </span>

                  </div>

                </Link>

              )
            )}

          </div>

        )}

      </div>

    </div>
  );
}

export default PharmacyDashboard;