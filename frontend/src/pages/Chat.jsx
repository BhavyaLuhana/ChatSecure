import { useEffect, useState } from "react";
import io from "socket.io-client";
import CryptoJS from "crypto-js";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import { FaPaperclip, FaRegSmile, FaUserCircle } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

const socket = io("http://localhost:5000", { transports: ["websocket", "polling"] });

const username = localStorage.getItem("username") || "Guest";
const SECRET_KEY = "15841cf7acfc11c56adba5f20b102b458dd704911c9110fe88c445e268957580";

const encryptMessage = (message) => CryptoJS.AES.encrypt(message, SECRET_KEY).toString();

const decryptMessage = (cipherText) => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8) || "[Decryption Failed]";
  } catch (error) {
    console.error("Decryption error:", error);
    return "[Decryption Error]";
  }
};

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const [room, setRoom] = useState("General");
  const [typing, setTyping] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    socket.emit("joinRoom", room);
    
    socket.on("chatHistory", (messages) => {
      setMessages(
        messages.map((msg) => ({
          _id: msg._id,
          sender: msg.sender,
          text: decryptMessage(msg.text),
          fileUrl: msg.fileUrl || null,
        }))
      );
    });

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [
        ...prev,
        { _id: data.messageId, sender: data.sender, text: decryptMessage(data.text), fileUrl: data.fileUrl || null },
      ]);
      socket.emit("messageRead", data.messageId);
    });

    return () => {
      socket.off("chatHistory");
      socket.off("receiveMessage");
    };
  }, [room]);

  useEffect(() => {
    socket.on("userTyping", (message) => setTyping(message));
    socket.on("userStoppedTyping", () => setTyping(""));

    return () => {
      socket.off("userTyping");
      socket.off("userStoppedTyping");
    };
  }, []);

  const handleTyping = () => {
    socket.emit("typing", room);
    setTimeout(() => socket.emit("stopTyping", room), 1500);
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await axios.delete(`http://localhost:5000/api/messages/${messageId}`);
      console.log("Message deleted:", messageId);
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("Failed to delete message!");
    }
  };

  useEffect(() => {
    socket.on("deleteMessage", (messageId) => {
      setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
    });

    return () => {
      socket.off("deleteMessage");
    };
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    const encryptedText = encryptMessage(message);
    socket.emit("sendMessage", { text: encryptedText, sender: username, room });
    setMessage("");
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <aside className="w-64 bg-gray-800 p-4">
        <h2 className="text-lg font-bold mb-4">Rooms</h2>
        <ul className="space-y-2">
          {["General", "Tech", "Gaming"].map((roomName) => (
            <li
              key={roomName}
              className={`cursor-pointer p-2 rounded-lg ${
                room === roomName ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
              onClick={() => setRoom(roomName)}
            >
              #{roomName}
            </li>
          ))}
        </ul>
      </aside>

      {/* Chat Area */}
      <div className="flex flex-col flex-1">
        {/* Chat Header */}
        <header className="p-4 bg-gray-800 shadow-lg text-center text-xl font-semibold">
          #{room}
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg._id} className="flex items-start gap-2">
              <FaUserCircle className="text-3xl text-gray-400" />
              <div className="flex flex-col bg-gray-700 p-3 rounded-lg max-w-lg">
                <div className="font-semibold text-blue-400">{msg.sender}</div>
                <div className="break-words">{msg.text}</div>

                {msg.fileUrl && (
                  <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-300 underline mt-1">
                    Download File
                  </a>
                )}

                {/* Timestamp */}
                <span className="text-xs text-gray-400 mt-1 self-end">
                  {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>

              {/* Delete Button */}
              {msg.sender === username && (
                <button
                  onClick={() => handleDeleteMessage(msg._id)}
                  className="ml-2 text-red-400 hover:text-red-500"
                >
                  ✖
                </button>
              )}
            </div>
          ))}

          {typing && <p className="text-gray-400 italic">{typing}</p>}
        </div>

        <div className="p-4 bg-gray-800 flex items-center gap-2 relative">
          <button className="text-gray-400 hover:text-gray-300">
            <FaPaperclip />
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-3 rounded-full bg-gray-700 text-white outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleTyping}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          
          {/* Emoji Button */}
          <button className="text-gray-400 hover:text-gray-300 relative" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            <FaRegSmile />
          </button>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-16 right-10 bg-gray-800 p-2 rounded-lg shadow-lg">
              <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
            </div>
          )}

          <button className="p-3 bg-green-500 rounded-full text-white font-bold hover:bg-green-600 transition" onClick={sendMessage}>
            <FiSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;