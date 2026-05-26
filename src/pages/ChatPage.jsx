import React, {
  useState,
  useEffect,
  useRef
} from 'react';

import {
  useParams,
  useNavigate
} from 'react-router-dom';

import {
  FaPaperPlane,
  FaArrowLeft,
  FaClinicMedical
} from 'react-icons/fa';

import api from '../api/api';

import './ChatPage.css';

const ChatPage = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [messages, setMessages] =
    useState([]);

  const [newMessage, setNewMessage] =
    useState('');

  const [pharmacyName, setPharmacyName] =
    useState('Pharmacy Chat');

  const [loading, setLoading] =
    useState(true);

  const chatEndRef = useRef(null);

  const currentUser =
    JSON.parse(
      localStorage.getItem("user")
    );

  const scrollToBottom = () => {

    chatEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  // تحميل البيانات
  useEffect(() => {

    if (!id) return;

    loadMessages();

    loadPharmacy();

  }, [id]);

  const loadPharmacy = async () => {

    try {

      const res = await api.get(
        `/pharmacies/contracted/`
      );

      const list =
        res.data.results || res.data;

      const currentPharmacy =
        list.find(
          p => String(p.id) === String(id)
        );

      if (currentPharmacy) {

        setPharmacyName(
          currentPharmacy.name
        );
      }

    } catch (err) {

      console.log(err);
    }
  };

  const loadMessages = async () => {

    try {

      const res = await api.get(
        `/pharmacies/${id}/messages/`
      );

      setMessages(
        res.data || []
      );

    } catch (err) {

      console.log(
        "LOAD MESSAGES ERROR",
        err.response?.data
      );

    } finally {

      setLoading(false);

      setTimeout(
        scrollToBottom,
        100
      );
    }
  };

  useEffect(() => {

    scrollToBottom();

  }, [messages]);

  // ارسال رسالة
  const sendMessage = async (e) => {

    e.preventDefault();

    if (!newMessage.trim()) return;

    try {

      const response =
        await api.post(
          `/pharmacies/${id}/send-message/`,
          {
            message: newMessage
          }
        );

      setMessages((prev) => [
        ...prev,
        response.data
      ]);

      setNewMessage('');

    } catch (error) {

      console.log(
        "SEND ERROR",
        error.response?.data
      );

      alert(
        error.response?.data?.error ||
        "Failed to send message"
      );
    }
  };

  return (

    <div className="chat-page">

      <div className="chat-shell">

        {/* Header */}

        <div className="chat-header">

          <button
            className="back-btn"
            onClick={() =>
              navigate(
                '/contracted-pharmacies'
              )
            }
          >

            <FaArrowLeft />

          </button>

          <div className="chat-header-info">

            <div className="pharmacy-avatar">

              <FaClinicMedical />

            </div>

            <div>

              <h2>
                {pharmacyName}
              </h2>

              <span>
                Online Support
              </span>

            </div>

          </div>

        </div>

        {/* Messages */}

        <div className="chat-body">

          {loading ? (

            <div className="chat-status">
              Loading...
            </div>

          ) : messages.length === 0 ? (

            <div className="chat-status">
              Start conversation
            </div>

          ) : (

            messages.map((msg, index) => {

              const isMine =
                msg.sender_username ===
                currentUser?.username;

              return (

                <div
                  key={msg.id || index}
                  className={
                    `message-bubble ${
                      isMine
                        ? 'from-user'
                        : 'from-pharmacy'
                    }`
                  }
                >

                  <p>
                    {msg.message}
                  </p>

                  <span>

                    {
                      msg.sender_username
                    }

                  </span>

                </div>
              );
            })
          )}

          <div ref={chatEndRef} />

        </div>

        {/* Send Form */}

        <form
          onSubmit={sendMessage}
          className="chat-form"
        >

          <input
            type="text"
            value={newMessage}
            onChange={(e) =>
              setNewMessage(
                e.target.value
              )
            }
            placeholder="Write message..."
          />

          <button
            type="submit"
            className="send-btn"
          >

            <FaPaperPlane />

          </button>

        </form>

      </div>

    </div>
  );
};

export default ChatPage;