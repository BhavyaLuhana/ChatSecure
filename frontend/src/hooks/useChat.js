import { useEffect } from "react";
import { socket } from "../utils/socket";
import { decryptMessage } from "../utils/encryption";

export const useChat = (room, setMessages) => {
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
  }, [room, setMessages]);
};