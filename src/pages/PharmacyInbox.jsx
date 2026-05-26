import { useEffect, useState } from "react";
import api from "../api/api";

const PharmacyInbox = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    api.get("/pharmacy-conversations/")
    .then((res) => {
      setUsers(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  }, []);

  return (
    <div>
      <h2>Users Conversations</h2>
      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.username}</h3>
        </div>
      ))}
    </div>
  );
};

export default PharmacyInbox;
