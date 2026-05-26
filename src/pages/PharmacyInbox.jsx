import { useEffect, useState } from "react";
import axios from "axios";

const PharmacyInbox = () => {

  const [users, setUsers] =
    useState([]);

  const token =
    localStorage.getItem("token");

  useEffect(() => {

    axios.get(
      "http://127.0.0.1:8000/api/v1/pharmacy-conversations/",
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    )
    .then((res) => {

      setUsers(res.data);

    })
    .catch((err) => {

      console.log(err);
    });

  }, []);

  return (

    <div>

      <h2>
        Users Conversations
      </h2>

      {
        users.map((user) => (

          <div key={user.id}>

            <h3>
              {user.username}
            </h3>

          </div>
        ))
      }

    </div>
  );
};

export default PharmacyInbox;