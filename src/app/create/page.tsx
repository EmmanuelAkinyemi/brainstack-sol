"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Copy, Share2, Wallet } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";

export default function CreatePage() {
  const { connected } = useWallet();
  const [link, setLink] = useState("");

  // State variables you need to add at the top:
const [formData, setFormData] = useState({ title: "", desc: "", reward: "" });

const handleCreate = () => {
  const id = Math.floor(Math.random() * 99999);
  const baseUrl = process.env.NEXT_PUBLIC_URL || window.location.origin;

  // We construct the URL with query parameters
  const params = new URLSearchParams({
    title: formData.title || "Physics Question",
    desc: formData.desc || "Solve this...",
    reward: formData.reward || "10"
  });

  setLink(`${baseUrl}/api/actions/bounty/${id}?${params.toString()}`);
};

  return (
    <div className="min-h-screen pt-24 px-6 bg-black flex items-center justify-center">
      <Card className="w-full max-w-xl bg-[#0F0F0F] border-white/10 p-8 shadow-2xl shadow-purple-900/10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Bounty</h1>
          <p className="text-gray-400">Generate a Solana Blink link for your question.</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Title</label>
            <Input onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="e.g. Debug my Rust Smart Contract" className="bg-black border-white/10 h-12" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Details</label>
            <Textarea onChange={(e) => setFormData({...formData, desc: e.target.value})} placeholder="Paste code snippets or context..." className="bg-black border-white/10 min-h-[100px]" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Bounty (USDC)</label>
            <Input type="number" onChange={(e) => setFormData({...formData, reward: e.target.value})} placeholder="20" className="bg-black border-white/10 h-12" />
          </div>

          {connected ? (
            !link ? (
                <Button onClick={handleCreate} className="w-full h-12 bg-white text-black hover:bg-gray-200 font-bold">
                    Generate Blink Link
                </Button>
            ) : (
                <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg animate-in fade-in">
                    <p className="text-purple-300 text-sm mb-2 font-semibold">Your Link is Ready:</p>
                    <div className="flex gap-2">
                        <code className="flex-1 bg-black p-2 rounded text-xs text-gray-300 font-mono truncate border border-white/10">
                            {link}
                        </code>
                        <Button size="icon" className="bg-purple-600" onClick={() => navigator.clipboard.writeText(link)}>
                            <Copy className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )
          ) : (
            <div className="p-4 bg-yellow-900/20 border border-yellow-500/20 rounded-lg flex items-center gap-3 text-yellow-200">
                <Wallet className="w-5 h-5" />
                <span>Connect wallet to create bounties</span>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}