import { useState, useEffect } from "react";
import { socket } from "../utils/socket";
import { decryptMessage } from "../utils/encryption";
import axios from "axios";

export const useMessages = (room) => {
  const [messages, setMessages] = useState([]);
  const [showReactionPicker, setShowReactionPicker] = useState(null);

  // Initialize chat and handle all message-related socket events
  useEffect(() => {
    socket.emit("joinRoom", room);
    
    const handleChatHistory = (messages) => {
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
    };

    const handleReceiveMessage = (data) => {
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
    };

    const handleMessageRead = (messageId) => {
      setMessages(prev => prev.map(msg => 
        msg._id === messageId ? { ...msg, isRead: true } : msg
      ));
    };

    const handleMessageReaction = ({ messageId, reaction, user }) => {
      setMessages(prev => prev.map(msg => 
        msg._id === messageId 
          ? { 
              ...msg, 
              reactions: [...(msg.reactions || []), { emoji: reaction, user }] 
            } 
          : msg
      ));
    };

    const handleReactionRemoved = ({ messageId, reaction, user }) => {
      setMessages(prev => prev.map(msg => 
        msg._id === messageId
          ? {
              ...msg,
              reactions: (msg.reactions || []).filter(r => !(r.emoji === reaction && r.user === user))
            }
          : msg
      ));
    };

    const handleDeleteMessage = (messageId) => {
      setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
    };

    socket.on("chatHistory", handleChatHistory);
    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("messageRead", handleMessageRead);
    socket.on("messageReaction", handleMessageReaction);
    socket.on("reactionRemoved", handleReactionRemoved);
    socket.on("deleteMessage", handleDeleteMessage);

    return () => {
      socket.off("chatHistory", handleChatHistory);
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("messageRead", handleMessageRead);
      socket.off("messageReaction", handleMessageReaction);
      socket.off("reactionRemoved", handleReactionRemoved);
      socket.off("deleteMessage", handleDeleteMessage);
    };
  }, [room]);

  const deleteMessage = async (messageId) => {
    try {
      await axios.delete(`http://localhost:5000/api/messages/${messageId}`);
      socket.emit("deleteMessage", { messageId, room });
    } catch (error) {
      console.error("Error deleting message:", error);
      throw error; // Let the component handle the error
    }
  };

  const reactToMessage = (messageId, reaction) => {
    const message = messages.find(m => m._id === messageId);
    const alreadyReacted = message?.reactions?.some(r => r.emoji === reaction && r.user === username);

    if (alreadyReacted) {
      removeReaction(messageId, reaction);
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

  const removeReaction = (messageId, reaction) => {
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

  return {
    messages,
    setMessages,
    showReactionPicker,
    setShowReactionPicker,
    deleteMessage,
    reactToMessage,
    removeReaction
  };
};