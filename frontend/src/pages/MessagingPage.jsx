import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import {
  FaPaperPlane,
  FaBars,
  FaHome,
  FaUser,
  FaBell,
  FaCog,
  FaUsers,
  FaFacebookMessenger,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../styles/MessagingPage.css";

const MessagingPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [loggedInUsername, setLoggedInUsername] = useState("");
  const [userRole, setUserRole] = useState("");
  const [error, setError] = useState("");
  const socketRef = useRef(null);
  const messageListRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      const decoded = jwtDecode(token);
      axios
        .get(`http://localhost:5000/api/users/${decoded.id}`)
        .then((res) => {
          setLoggedInUsername(res.data.username);
          setUserRole(res.data.role);
        })
        .catch(() => navigate("/login"));
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    socketRef.current = io("http://localhost:5000");

    socketRef.current.on("receive_message", (msg) => {
      const convoId = [msg.sender, msg.receiver].sort().join("_");
      const activeConvoId = [loggedInUsername, selectedUser].sort().join("_");
      if (convoId === activeConvoId && msg.sender !== loggedInUsername) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => socketRef.current.disconnect();
  }, [loggedInUsername, selectedUser]);

  useEffect(() => {
    if (!loggedInUsername) return;

    axios
      .get("http://localhost:5000/api/users")
      .then((res) => {
        const contacts = res.data.filter((u) => u.username !== loggedInUsername);
        setUsers(contacts);
      })
      .catch((err) => console.error("Fetch users error:", err));
  }, [loggedInUsername]);

  useEffect(() => {
    if (!selectedUser || !loggedInUsername) return;

    axios
      .get(`http://localhost:5000/api/messages/messages/${loggedInUsername}/${selectedUser}`)
      .then((res) => {
        if (res.data && Array.isArray(res.data)) {
          const sorted = res.data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
          setMessages(sorted);
          setError("");
        } else {
          setMessages([]);
          setError("");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setMessages([]);
          setError("");
        } else {
          console.error("Fetch messages error:", err);
          setError("Failed to fetch messages.");
        }
      });
  }, [selectedUser, loggedInUsername]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      sender: loggedInUsername,
      receiver: selectedUser,
      text: messageInput,
      timestamp: new Date().toISOString(),
    };

    socketRef.current.emit("send_message", newMessage);

    axios
      .post("http://localhost:5000/api/messages/messages", newMessage)
      .then((res) => {
        setMessages((prev) => [...prev, res.data]);
        setMessageInput("");
      })
      .catch((err) => {
        console.error("Send error:", err);
        setError("Failed to send the message.");
      });
  };

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleUserSelect = (username) => {
    setSelectedUser(username);
    setMessages([]);
    setError("");
  };

  const handleHomeClick = () => {
    const routes = {
      Developer: "/developerhome",
      Innovator: "/innovatorhome",
      Investor: "/investorhome",
    };
    navigate(routes[userRole] || "/home");
  };

  return (
    <div className="messaging-container">
      <aside className="sidebar">
        <nav>
          <ul>
            <li className="icon-item"><FaBars size={24} /></li>
            <li className="icon-item" onClick={handleHomeClick}><FaHome size={24} /></li>
            <li className="icon-item" onClick={() => navigate("/profile")}><FaUser size={24} /></li>
            <li className="icon-item"><FaBell size={24} /></li>
            <li className="icon-item"><FaCog size={24} /></li>
            <li className="icon-item"><FaUsers size={24} /></li>
            <li className="icon-item" onClick={() => navigate("/messaging")}><FaFacebookMessenger size={24} /></li>
          </ul>
        </nav>
      </aside>

      <div className="user-list">
        <h3>Contacts</h3>
        <ul>
          {users.map((user) => (
            <li
              key={user.username}
              className={selectedUser === user.username ? "active" : ""}
              onClick={() => handleUserSelect(user.username)}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-section">
        {selectedUser ? (
          <>
            <h3>Chat with {selectedUser}</h3>
            <div className="message-list" ref={messageListRef}>
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`message ${msg.sender === loggedInUsername ? "sent" : "received"}`}
                  >
                    <p>{msg.text}</p>
                    <span className="timestamp">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                ))
              ) : (
                <p className="select-user-info">Start a chat with {selectedUser}</p>
              )}
            </div>

            <div className="message-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button onClick={handleSendMessage}><FaPaperPlane /></button>
            </div>
          </>
        ) : (
          <p className="select-user-info">Select a user to start chatting</p>
        )}

        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default MessagingPage;
