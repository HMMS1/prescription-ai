import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { FaPaperPlane, FaUserAlt, FaArrowLeft } from "react-icons/fa";
import "./PharmacyChat.css";

const PharmacyChat = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatUser, setChatUser] = useState(null);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/pharmacies/chat-with-user/${id}/`);
      const data = res.data || [];
      setMessages(data);

      const userMsg = data.find(
        (msg) =>
          msg.sender_username !== currentUser?.username &&
          msg.sender_role !== "pharmacy"
      );
      if (userMsg) setChatUser(userMsg.sender_username);
    } catch (err) {
      console.log("LOAD ERROR", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) loadMessages();
  }, [id]);

  const sendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!message.trim()) return;
    try {
      const res = await api.post(`/pharmacies/chat-with-user/${id}/`, {
        message: message,
      });
      setMessages((prev) => [...prev, res.data]);
      setMessage("");
    } catch (err) {
      console.log("SEND ERROR", err.response?.data);
      alert("Failed to send message");
    }
  };

  return (
    <main className="pharmacy-chat-container">
      <div className="chat-wrapper">
        <header className="chat-main-header">
          <button className="back-btn" onClick={() => navigate("/conversations")}>
            <FaArrowLeft />
          </button>
          <div className="chat-avatar-icon">
            <FaUserAlt />
          </div>
          <div className="chat-header-text">
            <h2>{chatUser ? chatUser : `User #${id}`}</h2>
            <span className="chat-status-pill">
              <span className="status-dot" /> Online
            </span>
          </div>
        </header>

        <div className="chat-messages-box">
          {loading ? (
            <p style={{ textAlign: "center", padding: "2rem", opacity: 0.5 }}>
              Loading...
            </p>
          ) : messages.length === 0 ? (
            <p style={{ textAlign: "center", padding: "2rem", opacity: 0.5 }}>
              No messages yet
            </p>
          ) : (
            messages.map((msg, index) => {
              const isMe =
                msg.sender_username === currentUser?.username ||
                msg.sender_role === "pharmacy";
              return (
                <div
                  className={`msg-row ${isMe ? "user-side" : "pharmacy-side"}`}
                  key={msg.id || index}
                >
                  <span className="msg-sender">{msg.sender_username}</span>
                  <div className="msg-bubble">
                    <p>{msg.message}</p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={chatEndRef} />
        </div>

       <form onSubmit={sendMessage} className="chat-input-bar">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a reply..."
            /* مسحنا الـ onKeyDown من هنا خالص لأن الفورم قايمة بالواجب */
          />
          <button
            type="submit"
            className="chat-send-button"
            disabled={!message.trim() || loading}
          >
            <FaPaperPlane /> Send
          </button>
        </form>
      </div>
    </main>
  );
};

export default PharmacyChat;