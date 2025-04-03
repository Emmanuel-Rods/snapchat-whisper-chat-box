
import React from "react";
import ChatBox from "@/components/ChatBox";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-snapchat-gray to-white p-4">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-snapchat-black mb-2">Snapchat Messenger</h1>
        <p className="text-snapchat-dark">Send messages that look like they're from Snapchat!</p>
      </div>
      
      <ChatBox />
      
      <div className="mt-8 text-snapchat-dark text-sm text-center">
        <p>Messages in this demo don't disappear like in real Snapchat.</p>
        <p>Try typing a message and pressing Enter or clicking the send button!</p>
      </div>
    </div>
  );
};

export default Index;
