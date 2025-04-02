export const formatTimestamp = (timestamp) => {
  if (!timestamp) return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  
  try {
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    return isNaN(date.getTime()) 
      ? new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
};