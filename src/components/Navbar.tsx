"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { BrainCircuit, Menu, X } from "lucide-react";
import dynamic from "next/dynamic";

// Client-side only wallet button to prevent hydration errors
const WalletMultiButton = dynamic(
  () => import("@solana/wallet-adapter-react-ui").then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add glass effect only when scrolled
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
            scrolled || isOpen 
                ? "bg-black/80 backdrop-blur-xl border-white/10" 
                : "bg-transparent border-transparent"
        }`}
    >
      {/* Added relative z-50 to ensure logo and toggle stay ABOVE the mobile menu */}
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative z-50">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-amber-500/10 rounded-xl group-hover:bg-amber-500/20 transition-colors duration-300 border border-amber-500/20">
            <BrainCircuit className="w-6 h-6 text-amber-400" />
          </div>
          <span className="font-serif text-xl tracking-tight text-white font-medium">BrainStack</span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <NavLink href="/create">Post Bounty</NavLink>
          <NavLink href="/dashboard">My Dashboard</NavLink>
          <NavLink href="/admin">Admin</NavLink>
        </div>

        {/* ACTIONS & MOBILE TOGGLE */}
        <div className="flex items-center gap-4">
           {/* Wallet Button (Desktop Only) */}
           <div className="hidden md:block [&>.wallet-adapter-button]:h-10 [&>.wallet-adapter-button]:px-5 [&>.wallet-adapter-button]:bg-white [&>.wallet-adapter-button]:text-black [&>.wallet-adapter-button]:hover:bg-gray-200 [&>.wallet-adapter-button]:font-serif [&>.wallet-adapter-button]:italic [&>.wallet-adapter-button]:rounded-full [&>.wallet-adapter-button]:transition-transform [&>.wallet-adapter-button]:hover:scale-105">
              <WalletMultiButton />
           </div>

           {/* Hamburger Toggle */}
           <button 
             onClick={() => setIsOpen(!isOpen)}
             className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
             aria-label="Toggle Menu"
           >
             {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
           </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center space-y-8 animate-in fade-in slide-in-from-top-5 duration-300 md:hidden">
            {/* Background Texture */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />
            
            <div className="flex flex-col items-center gap-8 text-center p-6 w-full">
                <MobileNavLink href="/create" onClick={() => setIsOpen(false)}>Post Bounty</MobileNavLink>
                <MobileNavLink href="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</MobileNavLink>
                <MobileNavLink href="/admin" onClick={() => setIsOpen(false)}>Admin</MobileNavLink>
            </div>
            
            <div className="pt-4 [&>.wallet-adapter-button]:h-12 [&>.wallet-adapter-button]:px-8 [&>.wallet-adapter-button]:bg-amber-500 [&>.wallet-adapter-button]:text-black [&>.wallet-adapter-button]:hover:bg-amber-400 [&>.wallet-adapter-button]:font-serif [&>.wallet-adapter-button]:rounded-full">
                <WalletMultiButton />
            </div>
        </div>
      )}
    </nav>
  );
}

// === SUB-COMPONENTS ===

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="hover:text-amber-400 transition-colors duration-300 relative group">
            {children}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-400 transition-all duration-300 group-hover:w-full" />
        </Link>
    )
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
    return (
        <Link 
            href={href} 
            onClick={onClick}
            className="text-4xl font-serif text-white/80 hover:text-amber-400 transition-colors tracking-tight"
        >
            {children}
        </Link>
    )
}