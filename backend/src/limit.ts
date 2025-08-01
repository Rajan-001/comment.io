import { prisma } from "./lib/prisma";
import { redis } from "./lib/redis";
import { Request,Response,NextFunction } from "express";
export const checkVideoAnalysisLimit=async (req:Request,res:Response,next:NextFunction)=>{

  
 try {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const userId = req.user?.id; // if using auth middleware (optional)
    let activePlan;
    // ✅ 1️⃣ If user is logged in and has an active plan → allow unlimited
    if (userId) {
       activePlan = await prisma.subscription.findFirst({
        where: {
          userId,
          status: "active",
        },
        include:{
          plan:true
        }
      });

      if (activePlan) {
        console.log(`✅ User ${userId} has an active plan → unlimited analyses`);
        return next();
      }
    }

    // ✅ 2️⃣ If no plan (or guest user), track by IP
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const redisKey = `video_analysis_ip:${ip}:${today}`;

    const count = await redis.incr(redisKey);

    // ✅ 3️⃣ Set expiration to midnight if first time today
    if (count === 1) {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(23, 59, 59, 999);
      const ttl = Math.ceil((midnight.getTime() - now.getTime()) / 1000);
      await redis.expire(redisKey, ttl);
    }
    // ✅ Guest users get 5 free per IP/day
    if (!userId && count > 5) {
      return res.status(401).json({
        error: "Free guest limit reached",
        action: "SHOW_SIGNIN_POPUP", // frontend should show sign-in popup
      });
    }
      
    if (userId && activePlan==null && count > 5) {
      return res.status(402).json({
        error: "Free member limit reached",
        action: "SHOW_PAYMENT_POPUP", // frontend should show upgrade popup
      });
    }

    next();
  } catch (err) {
    console.error("Error in video analysis limit middleware:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}