
import React from 'react';
import { cn } from "@/lib/utils";

interface MessageProps {
  text: string;
  isSender: boolean;
  timestamp: Date;
  darkMode?: boolean;
}

const Message: React.FC<MessageProps> = ({ text, isSender, timestamp, darkMode = false }) => {
  return (
    <div 
      className={cn(
        "flex mb-3 animate-message-pop",
        isSender ? "justify-end" : "justify-start"
      )}
    >
      <div 
        className={cn(
          "px-4 py-2 rounded-2xl max-w-[80%] shadow-sm",
          isSender 
            ? "bg-snapchat-blue text-white rounded-br-sm" 
            : darkMode 
              ? "bg-gray-800 text-white rounded-bl-sm"
              : "bg-snapchat-gray text-snapchat-dark rounded-bl-sm"
        )}
      >
        <p className="text-sm break-words">{text}</p>
        <p className={`text-[10px] mt-1 ${darkMode && !isSender ? "opacity-50" : "opacity-70"}`}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};

export default Message;
