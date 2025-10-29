import React, { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Camera, FileText, Sparkles, Plus, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatBubble from "../components/chat/ChatBubble";
import WelcomeScreen from "../components/chat/WelcomeScreen";
import DocumentUploadDialog from "../components/chat/DocumentUploadDialog";
import LocationPrompt from "../components/chat/LocationPrompt";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef(null);
  const queryClient = useQueryClient();

  const { data: messages = [] } = useQuery({
    queryKey: ['chat-messages'],
    queryFn: () => base44.entities.ChatMessage.list('created_date'),
    initialData: [],
  });

  const { data: user } = useQuery({
    queryKey: ['current-user'],
    queryFn: () => base44.auth.me(),
  });

  const createMessageMutation = useMutation({
    mutationFn: (messageData) => base44.entities.ChatMessage.create(messageData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-messages'] });
    },
  });

  const deleteMessageMutation = useMutation({
    mutationFn: (id) => base44.entities.ChatMessage.delete(id),
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleClearChat = async () => {
    setShowClearDialog(false);
    for (const msg of messages) {
      await deleteMessageMutation.mutateAsync(msg.id);
    }
    queryClient.invalidateQueries({ queryKey: ['chat-messages'] });
  };

  const getLocationContext = () => {
    if (!user?.location_set) return "";
    
    const location = user.state ? `${user.state}, ${user.country}` : user.country;
    return `\n\nIMPORTANT: The user is located in ${location}. When discussing ballots, propositions, legislation, or any policy matters, prioritize information specific to ${location}. Mention relevant local laws, upcoming ballots, and regional policies that apply to this location.`;
  };

  const handleSendMessage = async () => {
    if (!message.trim() || isProcessing) return;

    const userMessage = message.trim();
    setMessage("");
    setIsProcessing(true);

    await createMessageMutation.mutateAsync({
      message: userMessage,
      sender: "user",
      timestamp: new Date().toISOString(),
    });

    try {
      const aiResponse = await base44.integrations.Core.InvokeLLM({
        prompt: `You are Plain Policy, an AI assistant that explains legislation, ballots, and propositions in simple terms. 
        The user asked: "${userMessage}"${getLocationContext()}
        
        Provide a clear, concise explanation that a regular person can understand. Break down complex legal language into everyday terms. 
        Be helpful, friendly, and accurate. Keep your response under 200 words.`,
      });

      await createMessageMutation.mutateAsync({
        message: aiResponse,
        sender: "ai",
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      await createMessageMutation.mutateAsync({
        message: "I'm having trouble processing that right now. Please try again in a moment.",
        sender: "ai",
        timestamp: new Date().toISOString(),
      });
    }

    setIsProcessing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Show location prompt if user hasn't set location
  const showLocationPrompt = user && !user.location_set;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1E3A5F] to-[#152D4A] rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1E3A5F]">Plain Policy</h1>
              <p className="text-xs text-slate-500">
                {user?.location_set && user.state 
                  ? `${user.state}, ${user.country}`
                  : user?.location_set && user.country
                  ? user.country
                  : "Simplifying legislation"
                }
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowClearDialog(true)}
                className="rounded-full hover:bg-blue-50"
                title="New Chat"
              >
                <RotateCcw className="w-5 h-5 text-[#1E3A5F]" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowUploadDialog(true)}
              className="rounded-full hover:bg-blue-50"
              title="Upload Document"
            >
              <Plus className="w-5 h-5 text-[#1E3A5F]" />
            </Button>
          </div>
        </div>
      </header>

      {/* Location Prompt Banner */}
      {showLocationPrompt && <LocationPrompt />}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.length === 0 ? (
          <WelcomeScreen onUploadClick={() => setShowUploadDialog(true)} />
        ) : (
          <AnimatePresence>
            {messages.map((msg, index) => (
              <ChatBubble key={msg.id || index} message={msg} />
            ))}
          </AnimatePresence>
        )}
        
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-slate-400 px-4"
          >
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-[#1E3A5F] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-[#1E3A5F] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-[#1E3A5F] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-sm">Thinking...</span>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-100 px-4 py-4 shadow-lg">
        <div className="flex items-end gap-3 max-w-2xl mx-auto">
          <div className="flex-1 relative">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about any policy or legislation..."
              className="resize-none rounded-3xl border-gray-200 pr-12 py-3 px-5 focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent min-h-[48px] max-h-[120px]"
              rows={1}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim() || isProcessing}
            className="bg-[#DC3545] hover:bg-[#C82333] rounded-full w-12 h-12 p-0 shadow-lg shadow-red-200 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:scale-100"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <DocumentUploadDialog
        open={showUploadDialog}
        onClose={() => setShowUploadDialog(false)}
      />

      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Start New Chat?</AlertDialogTitle>
            <AlertDialogDescription>
              This will clear your current conversation. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClearChat}
              className="bg-[#DC3545] hover:bg-[#C82333]"
            >
              Clear Chat
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
