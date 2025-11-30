import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, Shield, Zap, Globe, 
  Code2, Atom, PenTool, CheckCircle2, 
  Wallet, ChevronDown, Trophy, Activity 
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 overflow-x-hidden">
      
      {/* === BACKGROUND AMBIENCE === */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]" />
        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      {/* === HERO SECTION === */}
      <section className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-300 text-sm font-medium mb-8 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Protocol V1 Live on Devnet
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 leading-[1.1]">
          Turn Knowledge into <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
            Instant Liquidity.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000">
          The first decentralized Q&A market. Post hard problems on X. 
          Crowdsource answers via Solana Blinks. 
          <span className="text-white font-medium"> Pay only for results.</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-16 duration-1000">
          <Link href="/create">
            <Button className="h-14 px-8 rounded-full bg-white text-black hover:bg-gray-200 text-lg font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105">
              Launch Bounty <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" className="h-14 px-8 rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 text-lg backdrop-blur-sm">
              Connect Wallet
            </Button>
          </Link>
        </div>

        {/* Tech Stack Strip */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="flex items-center gap-2 font-semibold text-lg"><Globe className="w-5 h-5"/> Solana</span>
            <span className="flex items-center gap-2 font-semibold text-lg"><Zap className="w-5 h-5"/> Blinks</span>
            <span className="flex items-center gap-2 font-semibold text-lg"><Wallet className="w-5 h-5"/> Phantom</span>
            <span className="flex items-center gap-2 font-semibold text-lg"><Shield className="w-5 h-5"/> USDC</span>
        </div>
      </section>

      {/* === HOW IT WORKS (3 STEPS) === */}
      <section className="relative z-10 py-24 bg-black/40 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">How BrainStack Works</h2>
                <p className="text-gray-400">Three simple steps to monetize your curiosity.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-12 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

                <StepCard 
                    number="01"
                    title="Post a Bounty"
                    desc="Describe your problem and set a USDC reward. We generate a Blink link for you."
                    icon={<PenTool className="w-6 h-6 text-purple-400" />}
                />
                <StepCard 
                    number="02"
                    title="Share on X"
                    desc="Paste the link in a tweet. It instantly turns into an interactive card in users' feeds."
                    icon={<Globe className="w-6 h-6 text-blue-400" />}
                />
                <StepCard 
                    number="03"
                    title="Accept & Pay"
                    desc="Review answers on your dashboard. One click to payout the winner instantly."
                    icon={<CheckCircle2 className="w-6 h-6 text-green-400" />}
                />
            </div>
        </div>
      </section>

      {/* === BENTO GRID (USE CASES) === */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Solve Anything.</h2>
            <p className="text-gray-400">From code debugging to physics homework, BrainStack handles it.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-auto md:h-[500px]">
            {/* Large Card */}
            <div className="md:col-span-2 md:row-span-2 bg-[#0F0F0F] border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-purple-500/30 transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                    <Code2 className="w-24 h-24 text-purple-500" />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-end">
                    <h3 className="text-2xl font-bold mb-2">Code Debugging</h3>
                    <p className="text-gray-400">&lsquo;Fix my Rust Smart Contract error.&rsquo; <br/> Offers usually range from $50 - $500.</p>
                </div>
            </div>

            {/* Medium Card */}
            <div className="md:col-span-2 bg-[#0F0F0F] border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400"><Atom /></div>
                    <h3 className="text-xl font-bold">STEM Homework</h3>
                 </div>
                 <p className="text-gray-400">Perfect for complex Physics or Calculus problems that AI can&apos;t solve reliably.</p>
            </div>

            {/* Small Card 1 */}
            <div className="bg-[#0F0F0F] border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center text-center hover:bg-white/5 transition-colors">
                <h4 className="text-3xl font-bold text-white mb-1">0%</h4>
                <p className="text-sm text-gray-500">Platform Fees</p>
            </div>

            {/* Small Card 2 */}
            <div className="bg-[#0F0F0F] border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center text-center hover:bg-white/5 transition-colors">
                <h4 className="text-3xl font-bold text-green-400 mb-1">~1s</h4>
                <p className="text-sm text-gray-500">Settlement Time</p>
            </div>
        </div>
      </section>

      {/* === STATS / TRUST === */}
      <section className="py-20 border-y border-white/5 bg-gradient-to-r from-purple-900/10 to-blue-900/10 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatBox label="Total Value Locked" value="$124,000+" />
            <StatBox label="Bounties Solved" value="8,230" />
            <StatBox label="Active Solvers" value="1,400+" />
            <StatBox label="Avg. Payout" value="$25 USDC" />
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="py-12 px-6 border-t border-white/10 bg-black text-center">
        <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            BrainStack
        </h2>
        <div className="flex justify-center gap-6 text-gray-500 text-sm mb-8">
            <Link href="#" className="hover:text-white transition">Twitter</Link>
            <Link href="#" className="hover:text-white transition">Discord</Link>
            <Link href="#" className="hover:text-white transition">Docs</Link>
        </div>
        <p className="text-gray-600 text-xs">
            © 2025 BrainStack. Built during the Solana Renaissance.
        </p>
      </footer>

    </main>
  );
}

// === SUB COMPONENTS ===

function StepCard({ number, title, desc, icon }: { number: string, title: string, desc: string, icon: React.ReactNode }) {
    return (
        <div className="relative z-10 bg-[#0F0F0F] p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 group">
            <div className="absolute -top-6 left-8 text-6xl font-bold text-white/5 group-hover:text-purple-500/10 transition-colors">
                {number}
            </div>
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-gray-400 leading-relaxed">{desc}</p>
        </div>
    )
}

function StatBox({ label, value }: { label: string, value: string }) {
    return (
        <div>
            <h4 className="text-3xl md:text-4xl font-bold text-white mb-2">{value}</h4>
            <p className="text-sm text-purple-300 font-medium uppercase tracking-wider">{label}</p>
        </div>
    )
}