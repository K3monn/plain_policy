import React from "react";
import { Button } from "@/components/ui/button";
import { Camera, FileText, MessageSquare, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function WelcomeScreen({ onUploadClick }) {
  const features = [
    {
      icon: MessageSquare,
      title: "Ask Questions",
      description: "Ask about any policy in plain language"
    },
    {
      icon: Camera,
      title: "Scan Documents",
      description: "Take a photo of ballots or legislation"
    },
    {
      icon: FileText,
      title: "Upload Files",
      description: "Upload PDFs or images to analyze"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="w-20 h-20 bg-gradient-to-br from-[#1E3A5F] to-[#152D4A] rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-900/30 mb-6"
      >
        <Sparkles className="w-10 h-10 text-white" />
      </motion.div>

      <h1 className="text-3xl font-bold text-[#1E3A5F] mb-3">
        Welcome to Plain Policy
      </h1>
 
