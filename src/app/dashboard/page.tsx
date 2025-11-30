"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Loader2, ExternalLink, Clock, Wallet, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Dynamic wallet button to prevent hydration errors
const WalletMultiButton = dynamic(
  () => import("@solana/wallet-adapter-react-ui").then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

type Answer = {
  signature: string;
  student: string;
  answer: string;
  timestamp: number;
  bountyId: string;
};

export default function Dashboard() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAnswers = async () => {
    if (!publicKey) return;
    setLoading(true);
    try {
      // Fetch last 20 transactions for the connected wallet
      const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 20 });
      const txs = await connection.getParsedTransactions(
        signatures.map(s => s.signature),
        { maxSupportedTransactionVersion: 0 }
      );

      const parsed: Answer[] = [];
      
      txs.forEach((tx, i) => {
        if (!tx?.meta?.logMessages) return;
        // Look for the Memo
        const log = tx.meta.logMessages.find(l => l.includes("Program log: Memo"));
        if (log) {
           const match = log.match(/\{.*\}/);
           if (match) {
             try {
               const data = JSON.parse(match[0]);
               if (data.bountyId) {
                 parsed.push({
                   signature: signatures[i].signature,
                   student: tx.transaction.message.accountKeys.find(k => k.signer)?.pubkey.toString() || "Unknown",
                   answer: data.studentAnswer,
                   timestamp: data.timestamp,
                   bountyId: data.bountyId
                 });
               }
             } catch(e) {}
           }
        }
      });
      setAnswers(parsed);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (publicKey) fetchAnswers();
  }, [publicKey]);

  return (
    <div className="min-h-screen pt-24 px-6 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Bounties</h1>
            <p className="text-gray-400">Manage answers and payouts</p>
          </div>
          <Button 
            onClick={fetchAnswers} 
            disabled={loading || !publicKey}
            variant="outline"
            className="border-white/20 text-white"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2"/> : null}
            Refresh Data
          </Button>
        </div>

        {!publicKey ? (
           <div className="flex flex-col items-center justify-center p-12 border border-dashed border-white/10 rounded-xl bg-white/5">
              <Wallet className="w-12 h-12 text-gray-500 mb-4" />
              <h3 className="text-xl font-medium">Connect Wallet</h3>
              <p className="text-gray-400 mb-6">Please connect your wallet to view your bounty activity.</p>
              <WalletMultiButton />
           </div>
        ) : answers.length === 0 && !loading ? (
            <div className="text-center p-12 bg-[#0F0F0F] rounded-xl border border-white/10">
                <p className="text-gray-500">No answers found. Create a bounty to get started!</p>
            </div>
        ) : (
            <div className="grid gap-4">
                {answers.map((item) => (
                    <Card key={item.signature} className="bg-[#0F0F0F] border-white/10 hover:border-purple-500/30 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div className="flex items-center gap-3">
                                <Badge variant="outline" className="border-purple-500/50 text-purple-300">
                                    Bounty #{item.bountyId}
                                </Badge>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {new Date(item.timestamp).toLocaleString()}
                                </span>
                            </div>
                            <a 
                                href={`https://solscan.io/tx/${item.signature}?cluster=devnet`} 
                                target="_blank"
                                className="text-gray-500 hover:text-white"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-400 mb-1">Student Answer:</p>
                            <p className="text-lg font-medium text-white mb-4">{item.answer}</p>
                            
                            <div className="flex justify-between items-center pt-4 border-t border-white/5">
                                <div className="text-xs font-mono text-gray-500">
                                    From: {item.student.slice(0,4)}...{item.student.slice(-4)}
                                </div>
                                <Button size="sm" className="bg-green-600 hover:bg-green-500 text-white">
                                    <CheckCircle2 className="w-4 h-4 mr-2" />
                                    Accept & Pay
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )}
      </div>
    </div>
  );
}