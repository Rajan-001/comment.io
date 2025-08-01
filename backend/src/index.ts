import express, { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import Razorpay from "razorpay";
const crypto = require('crypto');
import cors from "cors"
import { oauth2Client } from "./lib/google";
import { prisma } from "./lib/prisma";
import { checkVideoAnalysisLimit } from "./limit";


const app=express()
app.use(express.json())

app.use(cors({
  origin: "http://localhost:3000", // allow frontend URL
  methods: ["GET", "POST"],
  credentials: true
}));

dotenv.config();

app.get("/auth/login", (req: Request, res: Response) => {
  try {
  
    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: ["https://www.googleapis.com/auth/youtube.force-ssl"],
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    });

    // Redirect user to Google login
    return res.redirect(url);
  } catch (err) {
    console.error("Error generating auth URL:", err);
    return res.status(500).json({ error: "Failed to generate auth URL" });
  }
});

// 2️⃣ OAUTH CALLBACK (Step 2)
app.get("/auth/callback", async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;

    if (!code) {
      return res.status(400).json({ error: "Missing code" });
    }

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

 

    // You can either send JSON back or redirect to frontend
    return res.json({ tokens });
  } catch (error) {
    console.error("OAuth callback error:", error);
    return res.status(500).json({ error: "Token exchange failed" });
  }
});

app.post("/signup", async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;
 
    if (!name || !password) {
      return res.status(400).json({ error: "Name and password are required" });
    }
  console.log(name)
    // ✅ Prisma will auto-generate id
    const user = await prisma.userInfo.create({
      data: {
        name,
        password,
        createdAt: new Date(),
      },
    });
   console.log(user.id)
    // ✅ Send back the id
    res.status(201).json({ userId: user.id });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});



app.post("/api/analysis", async (req: Request, res: Response) => {
  try {
    const { comments } = req.body;


    if (!comments || !Array.isArray(comments)) {
      return res.status(400).json({ error: "Comments array is required" });
    }

    // Initialize Google Generative AI client
    const ai = new GoogleGenerativeAI(process.env.GOOGLE_GEN_API_KEY!);
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content
    const result = await model.generateContent(`
      You are given a list of YouTube comments with details like username, comment text, likes, and timestamp.

      Your tasks:
      1. Analyze the sentiment of each comment: classify as "positive", "negative", or "neutral".
      2. Identify and extract any suggestions mentioned in the comments (if present).
      3. Provide the total count of:
          - Positive comments
          - Negative comments
          - Neutral comments
      4. Identify the user who gave the most positive comment (most enthusiastic or appreciative).
      5. Provide:
          - A list of usernames who gave positive comments
          - A list of usernames who gave negative comments
          - A list of usernames who gave suggestions

      6. Return the result strictly in the following JSON format :

       Analyze the comments and output ONLY a valid JSON object in this exact format:

          {
            "summary": {
              "totalPositive": number,
              "totalNegative": number,
              "totalNeutral": number,
              "mostPositiveUser": "username"
            },
            "positiveUsers": [
              {
                "username": "string",
                "profilePic": "string",
                "comment": "string",
                "likes": number
              }
            ],
            "negativeUsers": [
              {
                "username": "string",
                "profilePic": "string",
                "comment": "string",
                "likes": number
              }
            ],
            "suggestionUsers": [
              {
                "username": "string",
                "profilePic": "string",
                "comment": "string",
                "likes": number,
                "suggestion": "string"
              }
            ]
          }

          ⚠ RULES:
          1. Output ONLY JSON — no explanation, no extra text.
          2. Every positive comment must be listed in **positiveUsers** with full details.
          3. Every negative comment must be listed in **negativeUsers** with full details.
          4. Every comment containing a suggestion (feedback, request, or improvement idea) must be listed in **suggestionUsers** with full details.
          5. Use the **profilePic, username, comment text, and likes** exactly from the input data — don’t make anything up.

          Here is the list of comments to analyze:

      ${JSON.stringify(comments)}
    `);
    
   
   
    // Extract and clean AI response
    const reply = await result.response.text();
     console.log(reply)
    const parsed = JSON.parse(reply.replace(/```json|```/g, "").trim());
     console.log("it is parsed",parsed)

    return res.status(200).json(parsed);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/api/comments",checkVideoAnalysisLimit, async (req: Request, res: Response) => {
  try {
    const { videoUrl } = req.body;

    // ✅ 1. Validate input
    if (!videoUrl) {
      return res.status(400).json({ error: "Missing video URL" });
    }
  

    // ✅ 2. Extract videoId from URL
    let videoId = "";
    try {
      const url = new URL(videoUrl);
      videoId = url.searchParams.get("v") || "";
      if (!videoId) throw new Error("Invalid videoId");
    } catch (err) {
      return res.status(400).json({ error: "Invalid YouTube URL" });
    }
   

    // ✅ 3. Fetch comments from YouTube API
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${process.env.GOOGLE_API_KEY!}`
    );

    const data = await response.json();
    
    if (!data.items) {
      return res.status(404).json({ error: "No comments found" });
    }

    // ✅ 4. Extract comments
    const comments = data.items.map(
      (item: any) => item.snippet.topLevelComment.snippet
    );
     
    // ✅ 5. Send response
    return res.json({ comments });
  } catch (error) {
    console.error("Error fetching YouTube comments:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/create-order", async (req, res) => {
  try {
    const { amount,planId,userId } = req.body; // Amount from frontend (in INR)
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
      });
      
    const options = {
      amount: amount * 100, // amount in paisa
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    const {currency,id,status}=order
    const receipt = order.receipt ?? "default-receipt";
    
    await prisma.orders.create({
      data:{  amount,
       plan_Id:planId,
        currency,
        receipt,
       status: "created",
        order_Id:id,
       User_Id: 1, 
       
      }
    })
    res.json(order);
    console.log(order)
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating order");
  }
});

app.post("/verify-payment", async (req, res) => {
  try {
const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId, status } = req.body;
   console.log(razorpay_order_id)
    // 🔐 Create the signature to compare with Razorpay’s
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    console.log("Generated Signature:", expectedSignature);
    console.log("Received Signature:", razorpay_signature);

    if (expectedSignature === razorpay_signature) {
      console.log("✅ Payment Verified");

      const payment = await prisma.payments.create({
        data: {
          orderId: orderId, // coming from frontend
          razorpay_order_id: razorpay_order_id,
          razorpay_payment_id: razorpay_payment_id,
          razorpay_signature: razorpay_signature,
          status: "success", // from your enum Status (SUCCESS, REFUNDED, FAILED)
          paymentDate:new Date(),
          order: {
      connect: { order_Id: razorpay_order_id }
    }
        },
      });

      // 👉 Here you can update DB to mark the order as PAID
      return res.json({ success: true });
    } else {
      console.log("❌ Signature mismatch! Possible fraud");
      return res.status(400).json({ success: false });
    }
  } catch (error) {
    console.error("❌ Verification Error:", error);
    return res.status(500).json({ success: false});
  }
});


app.listen(8000, () => console.log("✅ Backend running on http://localhost:8000"))
