import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaPaperPlane, FaClinicMedical, FaArrowLeft } from "react-icons/fa";
import "./ChatPage.css";

function ChatPage() {
  const { pharmacyId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const pharmacies = JSON.parse(localStorage.getItem("contractedPharmacies") || "[]");
  const pharmacy = pharmacies.find((item) => String(item.id) === String(pharmacyId));

  const chatKey = useMemo(() => `chat_${pharmacyId}_${user.email || user.username || "guest"}`, [pharmacyId, user.email, user.username]);

  useEffect(() => {
    setMessages(JSON.parse(localStorage.getItem(chatKey) || "[]"));
  }, [chatKey]);

  const saveMessages = (nextMessages) => {
    localStorage.setItem(chatKey, JSON.stringify(nextMessages));
    setMessages(nextMessages);
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: message.trim(),
      sender: user.role === "pharmacy" ? "pharmacy" : "user",
      senderName: user.pharmacyName || user.name || "User",
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    saveMessages([...messages, newMessage]);
    setMessage("");
  };

  if (!pharmacy) {
    return (
      <main className="chat-page">
        <section className="chat-missing">
          <FaClinicMedical />
          <h2>Pharmacy not found</h2>
          <p>Go back and choose one of the contracted pharmacies.</p>
          <Link to="/contracted-pharmacies" className="premium-btn">Back to Pharmacies</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="chat-page">
      <section className="chat-shell">
        <header className="chat-header">
          <Link to="/contracted-pharmacies" className="back-chat">
            <FaArrowLeft />
          </Link>

          <div className="chat-avatar">
            <FaClinicMedical />
          </div>

          <div>
            <h1>{pharmacy.pharmacyName}</h1>
            <p>Dr. {pharmacy.doctorName} • {pharmacy.phone}</p>
          </div>
        </header>

        <div className="chat-body">
          {messages.length === 0 ? (
            <div className="empty-chat">
              <h3>Start the conversation</h3>
              <p>Ask about medicine availability, price, or when to visit.</p>
            </div>
          ) : (
            messages.map((item) => (
              <div
                className={`message-bubble ${item.sender === "user" ? "from-user" : "from-pharmacy"}`}
                key={item.id}
              >
                <p>{item.text}</p>
                <span>{item.senderName} • {item.createdAt}</span>
              </div>
            ))
          )}
        </div>

        <form className="chat-form" onSubmit={sendMessage}>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message..."
          />
          <button type="submit">
            <FaPaperPlane />
          </button>
        </form>
      </section>
    </main>
  );
}

export default ChatPage;
