import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import CryptoJS from "crypto-js";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import { FaPaperclip, FaRegSmile, FaUserCircle, FaTrash, FaCheck, FaCheckDouble } from "react-icons/fa";
import { FiSend, FiClock } from "react-icons/fi";


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

const formatTimestamp = (timestamp) => {
  if (!timestamp) return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  
  try {
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    return isNaN(date.getTime()) 
      ? new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
};

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const [room, setRoom] = useState("General");
  const [typing, setTyping] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState(null);
  const messagesEndRef = useRef(null);
  const quickReactions = ['👍', '❤️', '😂', '😮', '😢'];

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.emit("joinRoom", room);
    
    socket.on("chatHistory", (messages) => {
      setMessages(
        messages.map((msg) => ({
          _id: msg._id,
          sender: msg.sender,
          text: decryptMessage(msg.text),
          fileUrl: msg.fileUrl || null,
          isRead: msg.isRead || msg.sender === username,
          timestamp: msg.timestamp || Date.now(),
          reactions: msg.reactions || []
        }))
      );
    });

    socket.on("receiveMessage", (data) => {
      const newMessage = {
        _id: data.messageId,
        sender: data.sender,
        text: decryptMessage(data.text),
        fileUrl: data.fileUrl || null,
        isRead: data.sender === username,
        timestamp: data.timestamp || Date.now(),
        reactions: []
      };
      
      setMessages((prev) => [...prev, newMessage]);
      
      if (data.sender !== username) {
        socket.emit("messageRead", data.messageId);
      }
    });

    socket.on("messageRead", (messageId) => {
      setMessages(prev => prev.map(msg => 
        msg._id === messageId ? { ...msg, isRead: true } : msg
      ));
    });

    socket.on("messageReaction", ({ messageId, reaction, user }) => {
      setMessages(prev => prev.map(msg => 
        msg._id === messageId 
          ? { 
              ...msg, 
              reactions: [...(msg.reactions || []), { emoji: reaction, user }] 
            } 
          : msg
      ));
    });

    socket.on("reactionRemoved", ({ messageId, reaction, user }) => {
      setMessages(prev => prev.map(msg => 
        msg._id === messageId
          ? {
              ...msg,
              reactions: (msg.reactions || []).filter(r => !(r.emoji === reaction && r.user === user))
            }
          : msg
      ));
    });

    return () => {
      socket.off("chatHistory");
      socket.off("receiveMessage");
      socket.off("messageRead");
      socket.off("messageReaction");
      socket.off("reactionRemoved");
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
      socket.emit("deleteMessage", { messageId, room });
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

  const handleReactToMessage = (messageId, reaction) => {
    const message = messages.find(m => m._id === messageId);
    const alreadyReacted = message?.reactions?.some(r => r.emoji === reaction && r.user === username);

    if (alreadyReacted) {
      handleRemoveReaction(messageId, reaction);
      return;
    }

    setMessages(prev => prev.map(msg => 
      msg._id === messageId 
        ? { 
            ...msg, 
            reactions: [...(msg.reactions || []), { emoji: reaction, user: username }] 
          } 
        : msg
    ));

    socket.emit("reactToMessage", { 
      messageId, 
      reaction, 
      room,
      user: username 
    });

    setShowReactionPicker(null);
  };

  const handleRemoveReaction = (messageId, reaction) => {
    setMessages(prev => prev.map(msg => 
      msg._id === messageId
        ? {
            ...msg,
            reactions: (msg.reactions || []).filter(r => !(r.emoji === reaction && r.user === username))
          }
        : msg
    ));

    socket.emit("removeReaction", { 
      messageId, 
      reaction, 
      room,
      user: username 
    });
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    const encryptedText = encryptMessage(message);
    socket.emit("sendMessage", { 
      text: encryptedText, 
      sender: username, 
      room,
      timestamp: Date.now() 
    });
    setMessage("");
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4 border-r border-gray-700">
        <h2 className="text-lg font-bold mb-6 flex items-center">
          <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
          ChatSecure
        </h2>
        
        <div className="mb-8">
          <h3 className="text-xs uppercase text-gray-400 mb-2">Rooms</h3>
          {["General", "Tech", "Gaming"].map((roomName) => (
            <div
              key={roomName}
              className={`flex items-center p-2 rounded-lg cursor-pointer ${
                room === roomName ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
              onClick={() => setRoom(roomName)}
            >
              <span className="text-gray-400 mr-2">#</span>
              {roomName}
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-xs uppercase text-gray-400 mb-2">Online Now</h3>
          <div className="flex items-center p-2">
            <FaUserCircle className="text-gray-400 mr-2" />
            <span>{username}</span>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <header className="p-4 bg-gray-800 border-b border-gray-700 flex items-center">
          <span className="font-semibold">#{room}</span>
          {typing && (
            <span className="text-sm text-gray-400 ml-2">
              {typing} is typing...
            </span>
          )}
        </header>

        <div className="flex-1 overflow-auto p-4">
          {messages.map((msg) => (
            <div 
              key={msg._id} 
              className={`flex mb-4 ${
                msg.sender === username ? "justify-end" : ""
              }`}
            >
              {msg.sender !== username && (
                <FaUserCircle className="text-2xl text-gray-400 mt-1 mr-2" />
              )}
              
              <div className={`relative max-w-lg p-3 rounded-lg ${
                msg.sender === username ? "bg-blue-600" : "bg-gray-700"
              }`}>
                {msg.sender !== username && (
                  <div className="text-sm font-semibold text-blue-300">
                    {msg.sender}
                  </div>
                )}
                <div>{msg.text}</div>
                
                {msg.fileUrl && (
                  <a 
                    href={msg.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-300 text-sm underline mt-1 inline-block"
                  >
                    📎 Download File
                  </a>
                )}

                {/* Reactions display */}
                {msg.reactions?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {msg.reactions.map((reaction, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-1 rounded cursor-pointer ${
                          reaction.user === username ? 'bg-blue-400' : 'bg-gray-600'
                        }`}
                        onClick={() => {
                          if (reaction.user === username) {
                            handleRemoveReaction(msg._id, reaction.emoji);
                          }
                        }}
                      >
                        {reaction.emoji}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-end mt-1 space-x-2">
                  <span className="text-xs text-gray-300">
                    <FiClock className="inline mr-1" />
                    {formatTimestamp(msg.timestamp)}
                  </span>
                  
                  {msg.sender === username && (
                    <span 
                      className={`text-xs ${
                        msg.isRead ? "text-blue-300" : "text-gray-400"
                      }`}
                      title={msg.isRead ? "Read" : "Delivered"}
                    >
                      {msg.isRead ? <FaCheckDouble /> : <FaCheck />}
                    </span>
                  )}
                </div>

                {/* Reaction button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowReactionPicker(showReactionPicker === msg._id ? null : msg._id);
                  }}
                  className="absolute -bottom-2 -right-2 bg-gray-600 text-white p-1 rounded-full hover:bg-gray-500"
                >
                  <FaRegSmile size={12} />
                </button>

                {/* Reaction picker */}
                {showReactionPicker === msg._id && (
                  <div className="absolute bottom-8 right-0 bg-gray-800 rounded-lg p-2 shadow-xl flex gap-1 z-10">
                    {quickReactions.map(emoji => (
                      <button
                        key={emoji}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReactToMessage(msg._id, emoji);
                        }}
                        className="text-lg hover:scale-125 transition-transform"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}

                {msg.sender === username && (
                  <button
                    onClick={() => handleDeleteMessage(msg._id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                  >
                    <FaTrash size={10} />
                  </button>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-gray-800 relative">
          {showEmojiPicker && (
            <div className="absolute bottom-16 right-4">
              <EmojiPicker 
                onEmojiClick={handleEmojiClick}
                width={300}
                height={350}
                previewConfig={{ showPreview: false }}
              />
            </div>
          )}
          
          <div className="flex items-center bg-gray-700 rounded-lg px-4 py-2">
            <button className="text-gray-400 hover:text-white mr-2">
              <FaPaperclip />
            </button>
            
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleTyping}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            
            <button 
              className="text-gray-400 hover:text-white mx-2"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <FaRegSmile />
            </button>
            
            <button 
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              onClick={sendMessage}
              disabled={!message.trim()}
            >
              <FiSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;