import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function LocationPrompt() {
  const [dismissed, setDismissed] = React.useState(false);

  if (dismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 px-4 py-3"
    >
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#1E3A5F] rounded-full flex items-center justify-center flex-shrink-0">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-[#1E3A5F]">
              Get personalized policy information
            </p>
            <p className="text-xs text-slate-600">
              Set your location for local ballots and legislation
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link to={createPageUrl("Settings")}>
            <Button
              size="sm"
              className="bg-[#DC3545] hover:bg-[#C82333] text-white rounded-full px-4 text-xs"
            >
              Set Location
            </Button>
          </Link>
          <Button
 
