import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, Shield, Zap, Globe, 
  Code2, Atom, PenTool, CheckCircle2, 
  Wallet, Cpu, LibraryBig, Sparkles
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020202] text-white selection:bg-amber-500/30 overflow-x-hidden">
      
      {/* === ANIMATED BACKGROUND === */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] animate-pulse duration-[10000ms]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[120px]" />
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#020202] opacity-80" />
      </div>

      {/* === HERO SECTION === */}
      <section className="relative z-10 pt-40 pb-32 px-6 max-w-7xl mx-auto text-center">
        
        {/* Protocol Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-mono text-gray-400 tracking-widest uppercase">Protocol Live on Devnet</span>
        </div>

        {/* Serif Headline */}
        <h1 className="text-6xl md:text-9xl font-serif font-medium tracking-tight text-white mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 leading-[0.9]">
          Knowledge is <br />
          <span className="italic bg-clip-text text-transparent bg-gradient-to-b from-amber-200 to-amber-600 pr-4">
            Liquid.
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000">
          The decentralized marketplace for intellect. 
          Post bounties on X. Settle answers on Solana.
        </p>

        {/* CTA Group */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-in fade-in slide-in-from-bottom-16 duration-1000">
          <Link href="/create">
            <Button className="h-16 px-10 rounded-full bg-white text-black hover:bg-gray-200 text-lg font-serif italic tracking-wide transition-transform hover:scale-105 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
              Start Bountying
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" className="h-16 px-8 rounded-full text-gray-400 hover:text-white hover:bg-white/5 text-lg group">
              Connect Wallet <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* === METRICS STRIP === */}
      <section className="border-y border-white/5 bg-white/[0.02] backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            <Metric label="Total Liquidity" value="$1.2M+" />
            <Metric label="Questions Solved" value="8,420" />
            <Metric label="Avg. Payout" value="~$45" />
            <Metric label="Block Time" value="400ms" />
        </div>
      </section>

      {/* === BENTO FEATURES === */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
                <h2 className="text-4xl md:text-5xl font-serif mb-4">A New Era of <span className="text-gray-500 italic">Learning.</span></h2>
                <p className="text-gray-400 max-w-md">We replaced the &ldquo;Like&rdquo; button with a USDC transaction. Incentives align, answers improve.</p>
            </div>
            <Link href="/create" className="text-amber-400 hover:text-amber-300 flex items-center gap-2 border-b border-amber-400/30 pb-1">
                View all capabilities <ArrowRight className="w-4 h-4" />
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-auto md:h-[600px]">
            {/* Main Feature */}
            <div className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-white/10 rounded-3xl p-10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5" />
                <div className="absolute top-0 right-0 p-10 opacity-30 group-hover:opacity-100 transition-opacity duration-700">
                    <Globe className="w-32 h-32 text-amber-500 blur-3xl" />
                    <Globe className="w-32 h-32 text-white/10 relative z-10" />
                </div>
                
                <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 mb-6">
                        <Zap className="w-6 h-6 text-amber-200" />
                    </div>
                    <div>
                        <h3 className="text-3xl font-serif mb-4">Twitter Integration</h3>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
                            Stop forcing users to sign up for new apps. BrainStack works where they already are. 
                            Paste a link on X, and it transforms into a fully functional crypto-payment interface.
                        </p>
                    </div>
                </div>
            </div>

            {/* Side Feature 1 */}
            <div className="bg-[#111] border border-white/10 rounded-3xl p-8 flex flex-col justify-between group hover:border-white/20 transition-colors">
                <Cpu className="w-8 h-8 text-gray-500 group-hover:text-white transition-colors" />
                <div>
                    <h3 className="text-xl font-serif mb-2">Automated Escrow</h3>
                    <p className="text-sm text-gray-500">Funds are locked on-chain until you select a winner.</p>
                </div>
            </div>

            {/* Side Feature 2 */}
            <div className="bg-[#111] border border-white/10 rounded-3xl p-8 flex flex-col justify-between group hover:border-white/20 transition-colors">
                <LibraryBig className="w-8 h-8 text-gray-500 group-hover:text-white transition-colors" />
                <div>
                    <h3 className="text-xl font-serif mb-2">Permanent Archive</h3>
                    <p className="text-sm text-gray-500">Every question and answer is indexed on Solana forever.</p>
                </div>
            </div>
        </div>
      </section>

      {/* === CTA SECTION === */}
      <section className="py-32 px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-[#111] to-black border border-white/10 rounded-[2rem] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
            
            <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-6xl font-serif mb-6">Ready to <span className="italic text-gray-500">Stack?</span></h2>
            <p className="text-gray-400 mb-10 text-lg">Join 10,000+ researchers, developers, and students earning crypto.</p>
            
            <Link href="/create">
                <Button className="h-14 px-10 rounded-full bg-white text-black hover:bg-gray-200 font-serif italic text-lg">
                    Launch App
                </Button>
            </Link>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="border-t border-white/5 bg-[#020202] pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-amber-500 rounded-sm rotate-45" />
                <span className="font-serif text-xl tracking-tight">BrainStack</span>
            </div>
            
            <div className="flex gap-8 text-sm text-gray-500 font-medium">
                <a href="#" className="hover:text-white transition-colors">Governance</a>
                <a href="#" className="hover:text-white transition-colors">Docs</a>
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
            </div>
        </div>
      </footer>

    </main>
  );
}

// === SUB COMPONENTS ===

function Metric({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex flex-col items-center justify-center space-y-2">
            <span className="text-3xl md:text-4xl font-serif text-white">{value}</span>
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">{label}</span>
        </div>
    )
}