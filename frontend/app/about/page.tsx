"use client";
import React from "react";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import { motion, Variants } from "framer-motion";
import { Users, Search, BarChart, Sparkles, Mail } from "lucide-react";

export default function Page() {
  // Parent container with staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Variants for text blocks
  const fadeUp:Variants  = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div initial="hidden" animate="show" variants={container} className="flex flex-col">
      <Navbar />

      <div className="w-screen flex flex-col p-8 md:p-16 gap-y-12 max-w-5xl mx-auto">
        {/* Hero Section */}
        <motion.div variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-center">
          YouTube Comments Analyzer <br />
          <span className="text-red-500">Turn Chaos into Clarity</span>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col text-lg md:text-xl text-center max-w-3xl mx-auto">
          <div className="font-semibold text-2xl flex items-center justify-center gap-2 mb-2">
            <Users className="w-10 h-10 p-2 rounded-full bg-red-100 text-red-500 shadow-md animate-pulse" />
            Your audience is talking. Are you truly listening?
          </div>
          <div className="text-gray-600 leading-relaxed">
            Every YouTube comment section is overflowing with ideas, reactions, and feedback —
            but it’s often buried in a flood of noise. Our AI-powered Comments Analyzer cuts
            through the clutter and transforms chatter into clear, actionable insights.
          </div>
        </motion.div>

        <hr className="border-gray-200" />

        {/* Audience Understanding */}
      
        <motion.div variants={fadeUp} className="flex flex-col gap-y-3 ">
          <div className="text-3xl font-semibold flex items-center gap-3">
            <Search className="w-10 h-10 p-2 m-2 rounded-full bg-red-100 text-red-500 shadow-md animate-spin" />
            Understand Your Audience Like Never Before
          </div>
          <div className="text-gray-600 leading-relaxed">
            Whether you’re a content creator, brand strategist, or researcher, knowing what
            your audience truly thinks can be a game-changer.
          </div>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>
              <strong>Spot Trends Instantly</strong> – Identify the hottest topics driving discussion.
            </li>
            <li>
              <strong>Understand Sentiment</strong> – See positive, negative, and neutral reactions at a glance.
            </li>
            <li>
              <strong>Find Hidden Gems</strong> – Uncover overlooked feedback and insights.
            </li>
            <li>
              <strong>Visualize the Conversation</strong> – Beautiful charts & shareable summaries.
            </li>
          </ul>
        </motion.div>

        <hr className="border-gray-200" />

        {/* How It Works */}
        <motion.div variants={fadeUp} className="flex flex-col gap-y-3">
          <div className="text-3xl font-semibold flex items-center gap-3">
            <BarChart className="w-10 h-10 p-2 rounded-full bg-red-100 text-red-500 shadow-md animate-pulse" />
            How It Works
          </div>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>
              <strong>Paste a YouTube Video Link</strong> – Works with any public video.
            </li>
            <li>
              <strong>AI Does the Heavy Lifting</strong> – Fetches comments via the YouTube Data API.
            </li>
            <li>
              <strong>View Instant Insights</strong> – Get summaries, sentiment breakdowns & themes.
            </li>
            <li>Results are stored temporarily for quick revisit.</li>
          </ol>
        </motion.div>

        <hr className="border-gray-200" />

        {/* Future Features */}
        <motion.div variants={fadeUp} className="flex flex-col gap-y-3">
          <div className="text-3xl font-semibold flex items-center gap-3">
            <Sparkles className="w-10 h-10 p-2 rounded-full bg-red-100 text-red-500 shadow-md animate-pulse" />
            Built for the Future
          </div>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Analyze thousands of comments per video.</li>
            <li>Use advanced filters by keywords, sentiment, or audience segments.</li>
            <li>Track sentiment changes over time.</li>
            <li>Expand beyond YouTube to Reddit & TikTok.</li>
          </ul>
        </motion.div>

        <hr className="border-gray-200" />

        {/* Feedback Section */}
        <motion.div variants={fadeUp} className="flex flex-col gap-y-3">
          <div className="text-3xl font-semibold flex items-center gap-3">
            <Mail className="w-10 h-10 p-2 rounded-full bg-red-100 text-red-500 shadow-md animate-pulse" />
            💡 Help Shape the Future
          </div>
          <div className="text-gray-600 leading-relaxed">
            Your feedback matters. Whether it’s smarter filtering, multi-video comparison,
            or deeper analytics, your ideas can define our next big update.
          </div>
          <div className="font-bold">
            📧 Talk to Us:{" "}
            <a href="mailto:contact@commentsanalyzer.info" className="text-red-500 underline">
              contact@commentsanalyzer.info
            </a>
          </div>
        </motion.div>
      </div>

      <Footer />
    </motion.div>
  );
}
