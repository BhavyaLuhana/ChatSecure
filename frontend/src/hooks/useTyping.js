import { useEffect } from "react";
import { socket } from "../utils/socket";

export const useTyping = (setTyping) => {
  useEffect(() => {
    socket.on("userTyping", (message) => setTyping(message));
    socket.on("userStoppedTyping", () => setTyping(""));

    return () => {
      socket.off("userTyping");
      socket.off("userStoppedTyping");
    };
  }, [setTyping]);
};