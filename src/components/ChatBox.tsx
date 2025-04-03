
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
    <div className="flex flex-col h-[80vh] w-[90%] max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden border border-snapchat-gray">
      {/* Header */}
      <div className="bg-snapchat-yellow p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-snapchat-yellow font-bold text-lg">
            S
          </div>
          <span className="ml-3 font-bold text-snapchat-black text-xl">Snapchat Chat</span>
        </div>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-white">
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
      <div className="bg-snapchat-gray p-4 flex items-center gap-3">
        <Input
          placeholder="Message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 rounded-full bg-white border-0 focus-visible:ring-1 focus-visible:ring-snapchat-blue py-6 px-4 text-lg"
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
