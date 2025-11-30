"use client";
import Link from "next/link";
import { BrainCircuit } from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";

// Client-side only wallet button
const WalletMultiButton = dynamic(
  () => import("@solana/wallet-adapter-react-ui").then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-purple-600/20 rounded-lg group-hover:bg-purple-600/40 transition">
            <BrainCircuit className="w-6 h-6 text-purple-400" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">BrainStack</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <Link href="/create" className="hover:text-white transition-colors">Post Bounty</Link>
          <Link href="/dashboard" className="hover:text-white transition-colors">My Dashboard</Link>
          <Link href="/admin" className="hover:text-purple-400 transition-colors">Admin</Link>
        </div>

        <div className="flex items-center gap-4">
           {/* Custom styling for the wallet button via a wrapper */}
           <div className="[&>.wallet-adapter-button]:h-9 [&>.wallet-adapter-button]:px-4 [&>.wallet-adapter-button]:bg-white [&>.wallet-adapter-button]:text-black [&>.wallet-adapter-button]:hover:bg-gray-200 [&>.wallet-adapter-button]:font-semibold [&>.wallet-adapter-button]:rounded-full">
              <WalletMultiButton />
           </div>
        </div>
      </div>
    </nav>
  );
}