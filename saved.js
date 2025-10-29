
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Bookmark, FileText, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import PolicyCard from "../components/saved/PolicyCard";
import EmptyState from "../components/saved/EmptyState";

export default function SavedPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const queryClient = useQueryClient();

  const { data: policies = [], isLoading } = useQuery({
    queryKey: ['saved-policies'],
    queryFn: () => base44.entities.Policy.filter({ is_bookmarked: true }, '-created_date'),
    initialData: [],
  });

  const updatePolicyMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Policy.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-policies'] });
    },
  });

  const categories = ["all", "ballot", "legislation", "proposition", "ordinance"];

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.simplified_summary?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || policy.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-24">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-6 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-[#DC3545] to-[#C82333] rounded-2xl flex items-center justify-center shadow-lg">
            <Bookmark className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1E3A5F]">Saved Policies</h1>
            <p className="text-sm text-slate-500">{policies.length} saved</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search saved policies..."
            className="pl-12 rounded-2xl border-gray-200 focus:ring-2 focus:ring-[#1E3A5F]"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              className={`cursor-pointer whitespace-nowrap rounded-full px-4 py-1.5 transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-[#1E3A5F] text-white shadow-md shadow-blue-900/20'
                  : 'border-gray-200 text-slate-600 hover:border-[#1E3A5F]'
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Badge>
          ))}
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-6">
        {filteredPolicies.length === 0 ? (
          <EmptyState searchTerm={searchTerm} />
        ) : (
          <div className="space-y-4 max-w-2xl mx-auto">
            {filteredPolicies.map((policy, index) => (
              <PolicyCard
                key={policy.id}
                policy={policy}
                index={index}
                onUpdate={(data) => updatePolicyMutation.mutate({ id: policy.id, data })}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
