
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { format } from "date-fns";

export default function PolicyCard({ policy, index, onUpdate }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const categoryColors = {
    ballot: "bg-blue-100 text-blue-700 border-blue-200",
    legislation: "bg-[#1E3A5F]/10 text-[#1E3A5F] border-[#1E3A5F]/20",
    proposition: "bg-green-100 text-green-700 border-green-200",
    ordinance: "bg-orange-100 text-orange-700 border-orange-200",
    regulation: "bg-[#DC3545]/10 text-[#DC3545] border-[#DC3545]/20",
    other: "bg-gray-100 text-gray-700 border-gray-200",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="p-5 bg-white shadow-sm border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={`${categoryColors[policy.category || 'other']} border rounded-full px-3 py-0.5 text-xs`}>
                {policy.category || 'other'}
              </Badge>
              <span className="text-xs text-slate-400">
                {policy.created_date && format(new Date(policy.created_date), 'MMM d, yyyy')}
              </span>
            </div>
            <h3 className="font-bold text-[#1E3A5F] text-lg leading-snug">
              {policy.title}
            </h3>
          </div>
 
