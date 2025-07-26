import express, { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

import cors from "cors"
import { oauth2Client } from "./lib/google";

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


app.post("/api/comments", async (req: Request, res: Response) => {
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

app.listen(8000, () => console.log("✅ Backend running on http://localhost:8000"))
