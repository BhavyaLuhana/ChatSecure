import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { TypingIndicator } from "./TypingIndicator";
import { useMessages } from "../../hooks/useMessages";
import { useTyping } from "../../hooks/useTyping";
import { socket } from "../../utils/socket";

export const Chat = () => {
  const [room, setRoom] = useState("General");
  const [typing, setTyping] = useState("");
  
  const {
    messages,
    setMessages,
    showReactionPicker,
    setShowReactionPicker,
    deleteMessage,
    reactToMessage,
    removeReaction
  } = useMessages(room);

  useTyping(setTyping);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar room={room} setRoom={setRoom} />
      
      <div className="flex-1 flex flex-col">
        <header className="p-4 bg-gray-800 border-b border-gray-700 flex items-center">
          <span className="font-semibold">#{room}</span>
          <TypingIndicator typing={typing} />
        </header>

        <MessageList 
          messages={messages} 
          username={username}
          handleDeleteMessage={deleteMessage}
          handleReactToMessage={reactToMessage}
          handleRemoveReaction={removeReaction}
          showReactionPicker={showReactionPicker}
          setShowReactionPicker={setShowReactionPicker}
        />

        <MessageInput room={room} setMessages={setMessages} />
      </div>
    </div>
  );
};