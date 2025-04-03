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

// This would typically come from an API or backend service
const fetchChatHistory = async (): Promise<MessageData[]> => {
  // Simulate API call with a delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // This would normally be fetched from your backend
  return [
    {
      id: '1',
      text: "👋 Welcome to Snapbot!",
      isSender: false,
      timestamp: new Date()
    }
  ];
};

// This would send a message to your backend and get a response
const sendMessageToAPI = async (message: string): Promise<MessageData> => {
  console.log("Sending message to API:", message);
  
  // Simulate API call with a delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // This is where you would normally send the message to an AI service
  // like OpenAI, Perplexity, or your own backend
  
  // For demo purposes, we'll return a simulated response
  const responses = [
    "That's interesting! Tell me more about it.",
    "I understand. What else would you like to talk about?",
    "Cool! Have you tried the new Snapchat features?",
    "I see what you mean. How does that make you feel?",
    "Thanks for sharing that with me!",
    "I'm still learning, but that sounds fascinating!",
  ];
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  return {
    id: Date.now().toString(),
    text: randomResponse,
    isSender: false,
    timestamp: new Date()
  };
};

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Load initial chat history on component mount
  useEffect(() => {
    const loadChatHistory = async () => {
      setIsLoading(true);
      try {
        const history = await fetchChatHistory();
        setMessages(history);
      } catch (error) {
        console.error("Failed to load chat history:", error);
        toast("Failed to load chat history");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadChatHistory();
  }, []);
  
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

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;
    
    // Create the user message
    const userMessage: MessageData = {
      id: Date.now().toString(),
      text: inputMessage,
      isSender: true,
      timestamp: new Date()
    };
    
    // Add user message to state immediately
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input
    setInputMessage('');
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // Send message to API and get response
      const botResponse = await sendMessageToAPI(inputMessage);
      
      // Add bot response to messages
      setMessages(prev => [...prev, botResponse]);
      
      // Show a notification
      toast("New message received!");
    } catch (error) {
      console.error("Error sending message:", error);
      toast("Failed to get response");
    } finally {
      setIsLoading(false);
    }
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
        ? "bg-[#2A2A2A] border-[#444444] text-[#E8E8E8]" 
        : "bg-white border-snapchat-gray text-snapchat-black"}`}>
      {/* Header */}
      <div className={`${darkMode ? "bg-[#333333]" : "bg-snapchat-yellow"} p-4 flex items-center justify-between`}>
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg 
            ${darkMode 
              ? "bg-[#444444] text-snapchat-yellow" 
              : "bg-white text-snapchat-yellow"}`}>
            S
          </div>
          <span className={`ml-3 font-bold text-xl ${darkMode ? "text-[#E8E8E8]" : "text-snapchat-black"}`}>
            Snapbot
          </span>
        </div>
        <div className="flex items-center gap-2">
          {darkMode ? <Moon size={18} className="text-[#E8E8E8]" /> : <Sun size={18} />}
          <Switch 
            checked={darkMode} 
            onCheckedChange={toggleDarkMode}
            className={darkMode ? "bg-snapchat-blue" : "bg-snapchat-gray"}
          />
        </div>
      </div>
      
      {/* Chat Area */}
      <div className={`flex-1 p-4 overflow-y-auto ${darkMode ? "bg-[#2A2A2A]" : "bg-white"}`}>
        {isLoading && messages.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-pulse text-gray-400">Loading messages...</div>
          </div>
        ) : (
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
        )}
      </div>
      
      {/* Message Input */}
      <div className={`p-4 flex items-center gap-3 ${darkMode ? "bg-[#333333]" : "bg-snapchat-gray"}`}>
        <Input
          placeholder="Message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`flex-1 rounded-full border-0 focus-visible:ring-1 focus-visible:ring-snapchat-blue py-6 px-4 text-lg
            ${darkMode 
              ? "bg-[#444444] text-[#E8E8E8] placeholder:text-[#8A898C]" 
              : "bg-white text-snapchat-black"}`}
          disabled={isLoading}
        />
        <Button 
          onClick={handleSendMessage}
          className="rounded-full h-12 w-12 p-0 bg-snapchat-yellow hover:bg-snapchat-yellow/90"
          disabled={isLoading || inputMessage.trim() === ''}
        >
          <Send size={20} className="text-snapchat-black" />
        </Button>
      </div>
    </div>
  );
};

export default ChatBox;
