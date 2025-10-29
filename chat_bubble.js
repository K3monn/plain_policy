import React from "react";
import { motion } from "framer-motion";
import { Sparkles, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function ChatBubble({ message }) {
  const isAI = message.sender === "ai";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex gap-3 ${isAI ? 'justify-start' : 'justify-end'}`}
    >
      {isAI && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#152D4A] flex items-center justify-center flex-shrink-0 shadow-lg">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      )}

      <div className={`max-w-[80%] rounded-3xl px-5 py-3 ${
        isAI 
          ? 'bg-white border border-gray-100 shadow-sm' 
          : 'bg-gradient-to-br from-[#1E3A5F] to-[#152D4A] text-white shadow-lg shadow-blue-900/20'
      }`}>
        <div className={`text-sm leading-relaxed ${isAI ? 'text-slate-700 prose prose-sm' : 'text-white'}`}>
          {isAI ? (
            <ReactMarkdown>{message.message}</ReactMarkdown>
          ) : (
            <p>{message.message}</p>
          )}
        </div>
      </div>

      {!isAI && (
        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-slate-600" />
        </div>
      )}
    </motion.div>
  );
}
