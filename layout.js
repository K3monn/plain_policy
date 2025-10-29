import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { MessageCircle, Bookmark, User, Settings } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  const navItems = [
    { name: "Chat", icon: MessageCircle, url: createPageUrl("Chat") },
    { name: "Saved", icon: Bookmark, url: createPageUrl("Saved") },
    { name: "Settings", icon: Settings, url: createPageUrl("Settings") },
    { name: "Profile", icon: User, url: createPageUrl("Profile") },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <style>
        {`
          :root {
            --primary: #1E3A5F;
            --primary-dark: #152D4A;
            --accent: #DC3545;
            --text-primary: #0F172A;
            --text-secondary: #64748B;
            --border: #E2E8F0;
          }
        `}
      </style>

 
