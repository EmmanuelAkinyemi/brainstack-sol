"use client";

import { useEffect, useState, use } from "react"; // 'use' is needed for Next.js 15 params
import { useSearchParams } from "next/navigation";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Transaction, VersionedTransaction } from "@solana/web3.js";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Send, Wallet, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner"; // If you don't have sonner, use alert() or install it

// Wallet Button (No SSR)
const WalletMultiButton = dynamic(
  () => import("@solana/wallet-adapter-react-ui").then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

export default function BountyPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. Unwrap Params (Next.js 15)
  const { id } = use(params);
  
  // 2. Get Query Params (Title/Reward)
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || `Bounty #${id}`;
  const desc = searchParams.get("desc") || "Solve this challenge to earn the reward.";
  const reward = searchParams.get("reward") || "0";

  // 3. State
  const { publicKey, signTransaction, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [answer, setAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // 4. Submit Logic
  const handleSubmit = async () => {
    if (!publicKey) return;
    setSubmitting(true);

    try {
      // A. Call OUR OWN API to generate the transaction
      // This ensures consistency with the Twitter Blink
      const baseUrl = window.location.origin; // e.g., localhost:3000
      const apiUrl = `${baseUrl}/api/actions/bounty/${id}?answer=${encodeURIComponent(answer)}`;
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ account: publicKey.toBase58() }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to build transaction");

      // B. Deserialize the Transaction
      // The API returns a base64 encoded transaction
      const transactionBuffer = Buffer.from(data.transaction, "base64");
      const transaction = Transaction.from(transactionBuffer);

      // C. Sign & Send
      const signature = await sendTransaction(transaction, connection);
      
      // D. Confirm
      await connection.confirmTransaction(signature, "confirmed");

      setSuccess(true);
      // alert("Answer Submitted! Signature: " + signature);

    } catch (err) {
      console.error(err);
      alert("Error submitting answer. Check console.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="z-10 w-full max-w-lg space-y-6">
        <Link href="/" className="flex items-center text-gray-400 hover:text-white transition text-sm mb-4">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
        </Link>

        <Card className="bg-[#0F0F0F] border-white/10 shadow-2xl">
          <CardHeader>
            <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className="border-purple-500/50 text-purple-300">
                    Bounty #{id}
                </Badge>
                <div className="flex items-center gap-1 text-green-400 font-bold bg-green-900/20 px-3 py-1 rounded-full text-sm border border-green-500/20">
                    <span>${reward} USDC</span>
                </div>
            </div>
            <CardTitle className="text-2xl text-white leading-tight">{title}</CardTitle>
            <CardDescription className="text-gray-400 text-base mt-2">
                {desc}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {success ? (
                <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6 text-center animate-in fade-in zoom-in">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Send className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">Answer Submitted!</h3>
                    <p className="text-gray-400 text-sm">The creator will review your answer shortly.</p>
                    <Button className="mt-4" variant="outline" onClick={() => setSuccess(false)}>
                        Submit Another
                    </Button>
                </div>
            ) : (
                <>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Your Solution</label>
                        <Input 
                            placeholder="Type your answer (e.g., 50 Newtons)..." 
                            className="bg-black border-white/10 h-12 text-white focus:border-purple-500"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                    </div>

                    {!publicKey ? (
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center gap-3">
                            <p className="text-sm text-gray-400">Connect wallet to submit answer</p>
                            <WalletMultiButton />
                        </div>
                    ) : (
                        <Button 
                            className="w-full h-12 bg-white text-black hover:bg-gray-200 font-bold text-lg"
                            onClick={handleSubmit}
                            disabled={!answer || submitting}
                        >
                            {submitting ? (
                                <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Processing...</>
                            ) : (
                                "Submit to Blockchain"
                            )}
                        </Button>
                    )}
                </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}