// lib/redis.ts
import Redis from "ioredis";

// export const redis = new Redis({
//   host: "127.0.0.1",  // or your Docker container host, or remote URL
//   port: 6379,         // default Redis port
//   password: process.env.REDIS_PASSWORD || undefined, // if password is set
//   tls: process.env.REDIS_TLS === "true" ? {} : undefined // if using cloud Redis like Upstash/Neon
// });

if (!process.env.REDIS_URL) {
  throw new Error("REDIS_URL is not defined in environment variables");
}

export const redis = new Redis(process.env.REDIS_URL);

redis.on("connect", () => console.log("✅ Redis connected"));
redis.on("error", (err) => console.error("❌ Redis error:", err));
