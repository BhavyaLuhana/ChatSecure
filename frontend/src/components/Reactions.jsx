const Reactions = ({ messageId, handleReactToMessage, onClose }) => {
  const quickReactions = ['👍', '❤️', '😂', '😮', '😢'];

  return (
    <div className="absolute bottom-8 right-0 bg-gray-800 rounded-lg p-2 shadow-xl flex gap-1 z-10">
      {quickReactions.map(emoji => (
        <button
          key={emoji}
          onClick={(e) => {
            e.stopPropagation();
            handleReactToMessage(messageId, emoji);
            onClose();
          }}
          className="text-lg hover:scale-125 transition-transform"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default Reactions;