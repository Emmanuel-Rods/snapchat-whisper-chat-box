
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Message from './Message';
import { Send, Moon, Sun } from 'lucide-react';
import { toast } from 'sonner';
import { Switch } from "@/components/ui/switch";

interface MessageData {
  id: string;
  text: string;
  isSender: boolean;
  timestamp: Date;
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<MessageData[]>([
    {
      id: '1',
      text: "👋 Welcome to Snapbot!",
      isSender: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    const newMessage: MessageData = {
      id: Date.now().toString(),
      text: inputMessage,
      isSender: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    
    // Add a fake reply after a short delay
    setTimeout(() => {
      const replies = [
        "That's awesome! 😁",
        "Tell me more!",
        "Cool! What else is new?",
        "Interesting, I'd love to hear more about that!",
        "Nice! Have you tried the new Snapchat filters?",
        "Haha, that's funny! 😂"
      ];
      
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      
      const replyMessage: MessageData = {
        id: Date.now().toString(),
        text: randomReply,
        isSender: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, replyMessage]);
      
      // Show a notification
      toast("New message received!");
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast(`${darkMode ? "Light" : "Dark"} mode activated!`);
  };

  return (
    <div className={`flex flex-col h-[80vh] w-[90%] max-w-3xl rounded-xl shadow-lg overflow-hidden border 
      ${darkMode 
        ? "bg-snapchat-dark border-snapchat-black text-white" 
        : "bg-white border-snapchat-gray text-snapchat-black"}`}>
      {/* Header */}
      <div className={`${darkMode ? "bg-snapchat-black" : "bg-snapchat-yellow"} p-4 flex items-center justify-between`}>
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg 
            ${darkMode 
              ? "bg-snapchat-dark text-snapchat-yellow" 
              : "bg-white text-snapchat-yellow"}`}>
            S
          </div>
          <span className={`ml-3 font-bold text-xl ${darkMode ? "text-white" : "text-snapchat-black"}`}>
            Snapbot
          </span>
        </div>
        <div className="flex items-center gap-2">
          {darkMode ? <Moon size={18} /> : <Sun size={18} />}
          <Switch 
            checked={darkMode} 
            onCheckedChange={toggleDarkMode}
            className={darkMode ? "bg-snapchat-blue" : "bg-snapchat-gray"}
          />
        </div>
      </div>
      
      {/* Chat Area */}
      <div className={`flex-1 p-4 overflow-y-auto ${darkMode ? "bg-snapchat-dark" : "bg-white"}`}>
        <div className="flex flex-col">
          {messages.map((message) => (
            <Message
              key={message.id}
              text={message.text}
              isSender={message.isSender}
              timestamp={message.timestamp}
              darkMode={darkMode}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Message Input */}
      <div className={`p-4 flex items-center gap-3 ${darkMode ? "bg-snapchat-black" : "bg-snapchat-gray"}`}>
        <Input
          placeholder="Message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`flex-1 rounded-full border-0 focus-visible:ring-1 focus-visible:ring-snapchat-blue py-6 px-4 text-lg
            ${darkMode 
              ? "bg-snapchat-dark text-white placeholder:text-gray-400" 
              : "bg-white text-snapchat-black"}`}
        />
        <Button 
          onClick={handleSendMessage}
          className="rounded-full h-12 w-12 p-0 bg-snapchat-yellow hover:bg-snapchat-yellow/90"
        >
          <Send size={20} className="text-snapchat-black" />
        </Button>
      </div>
    </div>
  );
};

export default ChatBox;
