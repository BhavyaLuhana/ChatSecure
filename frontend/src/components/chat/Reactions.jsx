import { FaRegSmile } from "react-icons/fa";

const quickReactions = ['👍', '❤️', '😂', '😮', '😢'];

export const Reactions = ({ 
  msg, 
  username,
  handleReactToMessage,
  handleRemoveReaction,
  showReactionPicker,
  setShowReactionPicker
}) => {
  return (
    <>
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
    </>
  );
};