import express, { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import Razorpay from "razorpay";
const crypto = require('crypto');
import cors from "cors"
import { oauth2Client } from "./lib/google";
import { prisma } from "./lib/prisma";
import { checkVideoAnalysisLimit } from "./limit";
import { middleware } from "./lib/middleware";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"
const app=express()
app.use(express.json())


const allowedOrigins = [
  "https://comment-io.vercel.app",
  "http://localhost:3000"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps / curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser())
dotenv.config();
// allow preflight for all routes

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


app.post("/signin",async (req:Request,res:Response)=>{

    try{
         const response=await prisma.userInfo.findFirst({
            where:{
                name:req.body.name,
                password:req.body.password,
            }
         })
         console.log("Id ",response?.id)
         console.log(process.env.JWT_SECRET!)
         
         const token=jwt.sign({userId:response?.id!},process.env.JWT_SECRET!)
       console.log(token)
         res.cookie("token", token, {
            httpOnly: true,   // ✅ cannot be accessed via JS
            secure: false,    // ✅ set to true only if you have HTTPS (you can change later)
            sameSite:"lax" // ✅ prevents CSRF
            });
            console.log(token)
               if(token)
      {
      res.status(200).json({
        message:"able to do signIn"
      })
      }else{
        res.status(407).json({
            message:"Not able to create token"
        })
    }
  }
    catch(err){
        res.status(404).json({
            err
        })
    }
})


app.post("/social-site-signin",async(req:Request,res:Response)=>{
  try{
       const response=await prisma.userInfo.findFirst({
        where:{
               name:req.body.name,
                email:req.body.email,
                provider:req.body.provider
            }
         })
          //@ts-ignore
         const token=jwt.sign({userId:response.id},process.env.JWT_SECRET!)
       res.cookie("token", token, {
            httpOnly: true,   // ✅ cannot be accessed via JS
            secure: false,    // ✅ set to true only if you have HTTPS (you can change later)
            sameSite: "lax" // ✅ prevents CSRF
            });
       res.status(200).json({
        token
       })
    }
    catch(err){
        res.status(404).json({
            Error:err
        })
    }
})




app.post("/api/analysis", async (req: Request, res: Response) => {
  try {
    const { comments } = req.body;

    if (!comments || !Array.isArray(comments)) {
      return res.status(400).json({
        error: "Comments array is required",
      });
    }

    const apiKey = process.env.GOOGLE_GEN_API_KEY;

    console.log("Gemini API key exists:", !!apiKey);

    if (!apiKey) {
      return res.status(500).json({
        error: "GOOGLE_GEN_API_KEY is not configured",
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
    });

    const prompt = `
You are given a list of YouTube comments.

Analyze every comment and return ONLY valid JSON.

Tasks:
1. Classify every comment as positive, negative, or neutral.
2. Identify suggestions, feedback, requests, or improvement ideas.
3. Calculate total positive, negative, and neutral comments.
4. Identify the most positive user.
5. Return positive users, negative users, and users who made suggestions.

Return exactly this JSON structure:

{
  "summary": {
    "totalPositive": 0,
    "totalNegative": 0,
    "totalNeutral": 0,
    "mostPositiveUser": ""
  },
  "positiveUsers": [
    {
      "username": "",
      "profilePic": "",
      "comment": "",
      "likes": 0
    }
  ],
  "negativeUsers": [
    {
      "username": "",
      "profilePic": "",
      "comment": "",
      "likes": 0
    }
  ],
  "suggestionUsers": [
    {
      "username": "",
      "profilePic": "",
      "comment": "",
      "likes": 0,
      "suggestion": ""
    }
  ]
}

Rules:
- Output ONLY JSON.
- Do not use markdown.
- Do not invent information.
- Preserve username exactly.
- Preserve profilePic exactly.
- Preserve comment exactly.
- Preserve likes exactly.
- Every comment must be classified.
- totalPositive + totalNegative + totalNeutral must equal the number of comments.
- If there are no suggestions, return [].
- If there is no positive comment, mostPositiveUser must be "".

Comments:

${JSON.stringify(comments)}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    const reply = response.text;

    console.log("Gemini response:");
    console.log(reply);

    if (!reply) {
      return res.status(500).json({
        error: "Gemini returned an empty response",
      });
    }

    let cleanedReply = reply
      .trim()
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(cleanedReply);
    } catch (error) {
      console.error("Invalid JSON from Gemini:", cleanedReply);

      return res.status(500).json({
        error: "Gemini returned invalid JSON",
        rawResponse: cleanedReply,
      });
    }

    return res.status(200).json(parsed);

  } catch (err: any) {
    console.error("Gemini error:", err);

    return res.status(500).json({
      error: "Internal Server Error",
      message: err?.message || "Unknown Gemini error",
    });
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

app.post("/create-order",middleware, async (req, res) => {
  try {
    //@ts-ignore
   
    const { amount,planId } = req.body; // Amount from frontend (in INR)
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
      });
      
    const options = {
      amount: amount * 100, // amount in paisa
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
   
 //@ts-ignore
 console.log("Request id",req.id)
    const order = await razorpay.orders.create(options);
    const {currency,id,status}=order
    console.log("this is create order",order)
    const receipt = order.receipt ?? "default-receipt";
    
   const response= await prisma.orders.create({
      data:{  amount,
      
        currency,
        receipt,
       status: "created",
        order_Id:id,
        //@ts-ignore
      //  User_Id: req.id, 
       user:
       {
        connect:{
          //@ts-ignore
          id:req.id
       }
      },
      plan:{
        connect:{
      //@ts-ignore
        id:planId
        }
      }
      }
    })
    console.log("respnose from create order",response)
    if(response){
      res.status(200).json({
          response
      })
    }
    else{
      res.status(503).json({
        message:"not able to create order"
      })
    }
    
  } catch (error) {
    console.log(error);
    res.status(503).json(
      {
      message:"Error creating order"
      }
    );
  }
});

app.post("/verify-payment",middleware, async (req, res) => {
  try {
const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId, status,planId } = req.body;
   console.log(razorpay_order_id)
    // 🔐 Create the signature to compare with Razorpay’s
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
  
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    console.log("Generated Signature:", expectedSignature);
    console.log("Received Signature:", razorpay_signature);
    const startDate=new Date();
    const endDate=new Date(startDate);
    endDate.setFullYear(endDate.getFullYear()+1)
    if (expectedSignature === razorpay_signature) {
      console.log("✅ Payment Verified");

      const payment = await prisma.payments.create({
        data: {
          // orderId: orderId, // coming from frontend
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
      if(payment.status=="success")
      {
        const subscribe=await prisma.subscription.create({
          data:{
            user:{
              connect:{
                //@ts-ignore
                id:req.id
              }
            },
            plan:{
              connect:{
                id:planId
              }
            },
            endDate
          }
        })
        if(subscribe)
        {
      return res.json({ success: true });
        }
        
      }
      // 👉 Here you can update DB to mark the order as PAID
    } else {
      console.log("❌ Signature mismatch! Possible fraud");
      return res.status(400).json({ success: false });
    }
  } catch (error) {
    console.error("❌ Verification Error:", error);
    return res.status(500).json({ success: false});
  }
});


// app.listen(8000, () => console.log("✅ Backend running on http://localhost:8000"))

const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});