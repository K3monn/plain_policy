
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, LogOut, Mail, Clock, Shield } from "lucide-react";
import { format } from "date-fns";

export default function ProfilePage() {
  const { data: user } = useQuery({
    queryKey: ['current-user'],
    queryFn: () => base44.auth.me(),
  });

  const { data: policies = [] } = useQuery({
    queryKey: ['user-policies'],
    queryFn: () => base44.entities.Policy.list('-created_date'),
    initialData: [],
  });

  const handleLogout = () => {
    base44.auth.logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-24">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#1E3A5F] to-[#152D4A] rounded-2xl flex items-center justify-center shadow-lg">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1E3A5F]">Profile</h1>
            <p className="text-sm text-slate-500">Manage your account</p>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 max-w-2xl mx-auto space-y-6">
        {/* User Info Card */}
        <Card className="p-6 bg-white shadow-sm border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#1E3A5F] to-[#152D4A] rounded-3xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {user?.full_name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{user?.full_name || 'User'}</h2>
              <p className="text-sm text-slate-500">{user?.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-5 h-5 text-slate-400" />
              <span className="text-slate-600">Email:</span>
              <span className="text-slate-900 font-medium">{user?.email}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Clock className="w-5 h-5 text-slate-400" />
              <span className="text-slate-600">Member since:</span>
              <span className="text-slate-900 font-medium">
                {user?.created_date ? format(new Date(user.created_date), 'MMM yyyy') : 'N/A'}
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Shield className="w-5 h-5 text-slate-400" />
              <span className="text-slate-600">Role:</span>
              <span className="text-slate-900 font-medium capitalize">{user?.role || 'User'}</span>
            </div>
          </div>
        </Card>

        {/* Stats Card */}
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-slate-50 border-blue-100">
          <h3 className="text-lg font-bold text-[#1E3A5F] mb-4">Your Activity</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-sm">
              <p className="text-2xl font-bold text-[#1E3A5F]">{policies.length}</p>
              <p className="text-sm text-slate-600 mt-1">Policies Analyzed</p>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-sm">
              <p className="text-2xl font-bold text-[#DC3545]">
                {policies.filter(p => p.is_bookmarked).length}
              </p>
              <p className="text-sm text-slate-600 mt-1">Saved Items</p>
            </div>
          </div>
        </Card>

        {/* About Card */}
        <Card className="p-6 bg-white shadow-sm border-gray-100">
          <h3 className="text-lg font-bold text-[#1E3A5F] mb-3">About Plain Policy</h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Plain Policy uses advanced AI to translate complex legislation, ballots, and propositions 
            into simple, easy-to-understand language. Our mission is to make civic engagement accessible to everyone.
          </p>
          <p className="text-xs text-slate-500">Version 1.0.0</p>
        </Card>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full rounded-2xl border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 py-6"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
