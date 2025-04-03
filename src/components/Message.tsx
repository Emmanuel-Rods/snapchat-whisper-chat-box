
import React from 'react';
import { cn } from "@/lib/utils";

interface MessageProps {
  text: string;
  isSender: boolean;
  timestamp: Date;
}

const Message: React.FC<MessageProps> = ({ text, isSender, timestamp }) => {
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
            : "bg-snapchat-gray text-snapchat-dark rounded-bl-sm"
        )}
      >
        <p className="text-sm break-words">{text}</p>
        <p className="text-[10px] mt-1 opacity-70">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};

export default Message;
