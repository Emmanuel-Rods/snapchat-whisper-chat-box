
import React from "react";
import ChatBox from "@/components/ChatBox";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-snapchat-gray to-white dark:from-snapchat-dark dark:to-snapchat-black p-4 transition-colors duration-300">
      <ChatBox />
    </div>
  );
};

export default Index;
