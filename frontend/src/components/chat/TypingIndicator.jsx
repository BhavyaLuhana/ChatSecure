export const TypingIndicator = ({ typing }) => {
  if (!typing) return null;
  
  return (
    <span className="text-sm text-gray-400 ml-2">
      {typing} is typing...
    </span>
  );
};