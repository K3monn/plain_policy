import React from "react";
import { motion } from "framer-motion";
import { Bookmark, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";

export default function EmptyState({ searchTerm }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center min-h-[50vh] px-6 text-center"
    >
      <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center mb-4">
        {searchTerm ? (
          <Search className="w-8 h-8 text-slate-400" />
        ) : (
          <Bookmark className="w-8 h-8 text-slate-400" />
        )}
      </div>

      <h3 className="text-xl font-bold text-[#1E3A5F] mb-2">
        {searchTerm ? 'No Results Found' : 'No Saved Policies'}
      </h3>
      <p className="text-slate-500 mb-6 max-w-sm">
        {searchTerm 
          ? `We couldn't find any policies matching "${searchTerm}"`
          : 'Start analyzing policies and save them here for quick access'
        }
      </p>

      {!searchTerm && (
        <Link to={createPageUrl("Chat")}>
          <Button className="bg-[#DC3545] hover:bg-[#C82333] rounded-full px-6">
            Start Analyzing
          </Button>
        </Link>
      )}
    </motion.div>
  );
}
