import { useState } from "react";
import { FaPaperclip, FaRegSmile } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import EmojiPicker from "emoji-picker-react";
import { encryptMessage } from "../../utils/encryption";
import { socket } from "../../utils/socket";

export const MessageInput = ({ room, setMessages }) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleTyping = () => {
    socket.emit("typing", room);
    setTimeout(() => socket.emit("stopTyping", room), 1500);
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
  );
};