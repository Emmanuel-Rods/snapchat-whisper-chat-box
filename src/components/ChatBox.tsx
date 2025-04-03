
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Message from './Message';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

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
      text: "👋 Welcome to Snapchat Messenger!",
      isSender: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

  return (
    <div className="flex flex-col h-[600px] max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden border border-snapchat-gray">
      {/* Header */}
      <div className="bg-snapchat-yellow p-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-snapchat-yellow font-bold">
            S
          </div>
          <span className="ml-2 font-bold text-snapchat-black">Snapchat Chat</span>
        </div>
        <div className="text-xs text-snapchat-dark">Tap to view</div>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 p-3 overflow-y-auto bg-white">
        <div className="flex flex-col">
          {messages.map((message) => (
            <Message
              key={message.id}
              text={message.text}
              isSender={message.isSender}
              timestamp={message.timestamp}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Message Input */}
      <div className="bg-snapchat-gray p-3 flex items-center gap-2">
        <Input
          placeholder="Message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 rounded-full bg-white border-0 focus-visible:ring-1 focus-visible:ring-snapchat-blue"
        />
        <Button 
          onClick={handleSendMessage}
          className="rounded-full h-10 w-10 p-0 bg-snapchat-yellow hover:bg-snapchat-yellow/90"
        >
          <Send size={18} className="text-snapchat-black" />
        </Button>
      </div>
    </div>
  );
};

export default ChatBox;
