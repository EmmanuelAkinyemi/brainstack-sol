import {
  ActionPostResponse,
  createPostResponse,
  ActionGetResponse,
  ACTIONS_CORS_HEADERS,
  ActionPostRequest,
} from "@solana/actions";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

// Standard Memo Program ID
const MEMO_PROGRAM_ID = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcQb");

// Custom Headers to ensure the validator accepts the response
const CUSTOM_HEADERS = {
  ...ACTIONS_CORS_HEADERS,
  "X-Action-Version": "1",
  "X-Blockchain-Ids": "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1", // Devnet Chain ID
};

// Next.js 15 Type Definition for Dynamic Routes
type Props = {
  params: Promise<{ id: string }>;
};

// ==========================================
// 1. GET REQUEST (Serves the UI Card)
// ==========================================
export async function GET(req: Request, props: Props) {
  try {
    const requestUrl = new URL(req.url);
    
    // Await params for Next.js 15 compatibility
    const { id } = await props.params;

    // Read query params for dynamic customization (defaults provided)
    const title = requestUrl.searchParams.get("title") || `Physics Challenge #${id}`;
    const reward = requestUrl.searchParams.get("reward") || "10";
    const description = requestUrl.searchParams.get("desc") || "Solve this problem to earn USDC.";
    
    // Ensure we use the correct base URL (Ngrok or Localhost)
    // const baseUrl = process.env.NEXT_PUBLIC_URL || requestUrl.origin;
    const baseUrl = "https://angelic-paltry-emmalee.ngrok-free.dev";


    const payload: ActionGetResponse = {
      type: "action",
      title: title,
      // We use the Solana logo to pass validation (replace with your own square image later)
      icon: "https://solana.com/src/img/branding/solanaLogoMark.png",
      description: `${description} \n\n💰 Reward: $${reward} USDC`,
      label: "Submit Solution",
      links: {
        actions: [
          {
            type: "transaction",
            label: "Submit Answer",
            // This href tells the client where to send the POST request
            // We append the answer input variable
            href: `${baseUrl}/api/actions/bounty/${id}?answer={answerInput}`,
            parameters: [
              {
                name: "answerInput",
                label: "Type your answer here...",
                required: true,
              },
            ],
          },
        ],
      },
    };

    return Response.json(payload, { headers: CUSTOM_HEADERS });
  } catch (err) {
    console.error("GET Error:", err);
    return Response.json(
      { error: "Failed to load bounty data" }, 
      { status: 500, headers: CUSTOM_HEADERS }
    );
  }
}

// ==========================================
// 2. OPTIONS REQUEST (Handles CORS pre-flight)
// ==========================================
export async function OPTIONS(req: Request) {
  return new Response(null, { headers: CUSTOM_HEADERS });
}

// ==========================================
// 3. POST REQUEST (Builds the Transaction)
// ==========================================
// ==========================================
// 3. POST REQUEST (Builds the Transaction)
// ==========================================
export async function POST(req: Request, props: Props) {
  try {
    const requestUrl = new URL(req.url);
    const { id } = await props.params;
    
    // 1. Get the user's answer from the URL
    const answer = requestUrl.searchParams.get("answer");
    
    // 2. Get the user's wallet address from the body
    const body: ActionPostRequest = await req.json();

    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch (err) {
      return new Response('Invalid wallet account provided', { 
        status: 400, 
        headers: CUSTOM_HEADERS 
      });
    }

    // 3. Connect to Solana (Devnet)
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    
    // 4. Create the Transaction Container
    const transaction = new Transaction();

    // 5. Add the "Memo" Instruction (This saves the answer on-chain)
    const memoData = JSON.stringify({
      bountyId: id,
      studentAnswer: answer || "No Answer Provided",
      timestamp: Date.now()
    });

    transaction.add(
      new TransactionInstruction({
        keys: [{ pubkey: account, isSigner: true, isWritable: true }],
        data: Buffer.from(memoData, "utf-8"),
        programId: MEMO_PROGRAM_ID,
      })
    );

    // 6. Set Fee Payer & Recent Blockhash
    transaction.feePayer = account;
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;

    // 7. Serialize and return the transaction
    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        type: 'transaction',  // <--- FIXED: Added this required property
        transaction,
        message: `Answer Submitted!`, // This appears as a toast message in the wallet
      },
    });

    return Response.json(payload, { headers: CUSTOM_HEADERS });

  } catch (err) {
    console.error("POST Error:", err);
    // Return a JSON error so the client doesn't hang
    return Response.json(
      { error: "Transaction generation failed", details: String(err) }, 
      { status: 400, headers: CUSTOM_HEADERS }
    );
  }
}