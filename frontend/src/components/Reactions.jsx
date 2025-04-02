import { useState } from "react";
import { FaSmile, FaThumbsUp, FaHeart, FaLaughSquint, FaSurprise } from "react-icons/fa";

const reactionsList = [
  { emoji: "👍", label: "Like" },
  { emoji: "❤️", label: "Love" },
  { emoji: "😂", label: "Haha" },
  { emoji: "😮", label: "Wow" },
  { emoji: "😊", label: "Smile" }
];

const Reactions = ({ msg, socket }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleReaction = (emoji) => {
    socket.emit("addReaction", { messageId: msg._id, emoji });
    setShowPicker(false);
  };

  return (
    <div className="relative mt-2">
      <button 
        className="text-gray-400 text-sm hover:text-white" 
        onClick={() => setShowPicker(!showPicker)}
      >
        😀 React
      </button>

      {showPicker && (
        <div className="absolute bottom-8 left-0 bg-gray-800 p-2 rounded-lg shadow-lg flex space-x-2">
          {reactionsList.map((reaction) => (
            <button 
              key={reaction.emoji} 
              className="text-lg hover:scale-125 transition-transform"
              onClick={() => handleReaction(reaction.emoji)}
            >
              {reaction.emoji}
            </button>
          ))}
        </div>
      )}

      {msg.reactions && msg.reactions.length > 0 && (
        <div className="mt-1 flex space-x-1">
          {msg.reactions.map((reaction, index) => (
            <span key={index} className="text-sm bg-gray-700 px-2 py-1 rounded-lg">
              {reaction.emoji} {reaction.count}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reactions;
