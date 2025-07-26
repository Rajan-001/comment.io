import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
export async function POST(req:Request){
   
    try{
        const {comments}=await req.json()
       
          const ai = new GoogleGenerativeAI(process.env.GOOGLE_GEN_API_KEY! );
    
           const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
                   console.log("they are comments",comments)
            const result = await model.generateContent( `
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
                       
                       
                            6. Return the result strictly in the following JSON format:

                            {
                                "summary": {
                                    "totalPositive": number,
                                    "totalNegative": number,
                                    "totalNeutral": number,
                                    "mostPositiveUser": "username"
                                },
                                "positiveUsers": ["user1", "user2", "..."],
                                "negativeUsers": ["user3", "user4", "..."],
                                "suggestionUsers": ["user5", "user6", "..."],
                                "suggestions": [
                                    {
                                    "username": "user5",
                                    "profilePic": "https://example.com/user5.jpg",
                                    "comment": "Add subtitles to improve accessibility.",
                                    "likes": 12,
                                  
                                    }
                                ],
                                "positivecomment": [
                                    {
                                    "username": "user1",
                                    "profilePic": "https://example.com/user1.jpg",
                                    "comment": "your video is very good.",
                                    "likes": 25
                                    }
                                ]
                                }

                        Here is the list of comments to analyze:
                        ${JSON.stringify(comments)}
                        `,
                    );

    const reply = await result.response.text();  
    const parsed=JSON.parse(reply.replace(/```json|```/g, '').trim()); 
            console.log(parsed)
    
       return NextResponse.json({parsed},{status:200})

    }
    catch(err){
        return NextResponse.json({err:"Internal Server Error"},{status:500})
    }

}