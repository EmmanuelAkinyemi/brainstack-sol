"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, DollarSign, Server } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen pt-24 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Platform Admin</h1>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
            <StatCard title="Total Volume" value="$42,300" icon={<DollarSign className="text-green-400"/>} />
            <StatCard title="Active Bounties" value="156" icon={<Activity className="text-purple-400"/>} />
            <StatCard title="Total Solvers" value="892" icon={<Users className="text-blue-400"/>} />
            <StatCard title="Uptime" value="99.9%" icon={<Server className="text-yellow-400"/>} />
        </div>

        {/* Recent Activity Table Mockup */}
        <Card className="bg-[#0F0F0F] border-white/10">
            <CardHeader>
                <CardTitle className="text-white">Recent System Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {[1,2,3,4,5].map((i) => (
                        <div key={i} className="flex justify-between items-center p-4 bg-black/40 rounded-lg border border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-sm text-gray-300">New Answer submitted for Bounty #88{i}</span>
                            </div>
                            <span className="text-xs text-gray-500 font-mono">2 mins ago</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
    return (
        <Card className="bg-[#0F0F0F] border-white/10">
            <CardContent className="p-6 flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-400 font-medium mb-1">{title}</p>
                    <h2 className="text-2xl font-bold text-white">{value}</h2>
                </div>
                <div className="p-3 bg-white/5 rounded-xl">{icon}</div>
            </CardContent>
        </Card>
    )
}