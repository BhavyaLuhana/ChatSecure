import { FaUserCircle, FaTrash, FaCheck, FaCheckDouble, FaRegSmile } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { formatTimestamp } from "../../utils/timeFormatter";
import { Reactions } from "./Reactions";

export const Message = ({ 
  msg, 
  username, 
  handleDeleteMessage, 
  handleReactToMessage, 
  handleRemoveReaction,
  showReactionPicker,
  setShowReactionPicker
}) => {
  return (
    <div 
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

        <Reactions 
          msg={msg} 
          username={username}
          handleReactToMessage={handleReactToMessage}
          handleRemoveReaction={handleRemoveReaction}
          showReactionPicker={showReactionPicker}
          setShowReactionPicker={setShowReactionPicker}
        />

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