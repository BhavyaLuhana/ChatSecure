import { FaUserCircle, FaTrash, FaRegSmile, FaCheck, FaCheckDouble } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import Reactions from "./Reactions";

const Message = ({ 
  msg, 
  username, 
  handleDeleteMessage, 
  handleReactToMessage,
  showReactionPicker,
  setShowReactionPicker
}) => {
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const date = new Date(timestamp);
    return isNaN(date.getTime()) 
      ? new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className={`flex mb-4 ${msg.sender === username ? "justify-end" : ""}`}>
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

        <button 
          onClick={(e) => {
            e.stopPropagation();
            setShowReactionPicker(showReactionPicker === msg._id ? null : msg._id);
          }}
          className="absolute -bottom-2 -right-2 bg-gray-600 text-white p-1 rounded-full hover:bg-gray-500"
        >
          <FaRegSmile size={12} />
        </button>

        {showReactionPicker === msg._id && (
          <Reactions 
            messageId={msg._id}
            handleReactToMessage={handleReactToMessage}
            onClose={() => setShowReactionPicker(null)}
          />
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
  );
};

export default Message;