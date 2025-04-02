import { useRef, useEffect } from "react";
import { Message } from "./Message";

export const MessageList = ({ 
  messages, 
  username, 
  handleDeleteMessage, 
  handleReactToMessage, 
  handleRemoveReaction,
  showReactionPicker,
  setShowReactionPicker
}) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-auto p-4">
      {messages.map((msg) => (
        <Message
          key={msg._id}
          msg={msg}
          username={username}
          handleDeleteMessage={handleDeleteMessage}
          handleReactToMessage={handleReactToMessage}
          handleRemoveReaction={handleRemoveReaction}
          showReactionPicker={showReactionPicker}
          setShowReactionPicker={setShowReactionPicker}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};