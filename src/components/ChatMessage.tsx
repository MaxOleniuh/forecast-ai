import React from "react";

interface ChatMessageProps {
  message: string;
  isUser?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} my-2`}>
      <div
        className={`max-w-xs p-3 rounded-lg shadow ${
          isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;
