import React from 'react'
import { Footer } from '../../components/Footer'
import { Navbar } from '../../components/Navbar'



export default function page  () {
  return (
    <div className='flex flex-col'>
      <Navbar/>
        <div className="w-screen flex flex-col p-12 gap-y-6">

              {/* Hero Section */}
              <div className="text-4xl w-full flex justify-center items-center text-center font-bold">
                YouTube Comments Analyzer – Turn Chaos into Clarity
              </div>

              <div className="flex flex-col text-xl text-center max-w-3xl mx-auto">
                <div className="font-semibold">Your audience is talking. Are you truly listening?</div>
                <div>
                  Every YouTube comment section is overflowing with ideas, reactions, and feedback—but it’s often buried in a flood of noise.  
                  Our AI-powered YouTube Comments Analyzer cuts through that clutter and transforms raw chatter into clear, actionable insights you can use instantly.
                </div>
              </div>

              <div className="w-full h-[2px] bg-black translate-y-0"></div>

              {/* Audience Understanding */}
              <div className="flex flex-col text-md gap-y-2">
                <div className="text-2xl font-semibold">Understand Your Audience Like Never Before</div>
                <div>
                  Whether you’re a content creator, brand strategist, or researcher, knowing what your audience truly thinks can be a game-changer.  
                  Forget endless scrolling and guessing—our tool delivers instant clarity on what’s trending, how viewers feel, and why it matters.
                </div>

                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Spot Trends Instantly</strong> – Pinpoint the hottest topics driving discussion.</li>
                  <li><strong>Understand Sentiment</strong> – See the ratio of positive, negative, and neutral reactions at a glance.</li>
                  <li><strong>Find Hidden Gems</strong> – Uncover valuable feedback and overlooked insights.</li>
                  <li><strong>Visualize the Conversation</strong> – Get ready-to-use charts and summaries for reports, pitches, or social media.</li>
                </ul>
              </div>

              <div className="w-full h-[2px] bg-black"></div>

              {/* How It Works */}
              <div className="flex flex-col text-md gap-y-2">
                <div className="text-2xl font-semibold">How It Works</div>
                <ol className="list-decimal list-inside space-y-1">
                  <li><strong>Paste a YouTube Video Link</strong> – Works with any public video.</li>
                  <li><strong>Let AI Do the Heavy Lifting</strong> – We fetch comments via the YouTube Data API (standard version: up to 20).</li>
                  <li><strong>View Instant Insights</strong> – Summaries, sentiment breakdowns, and discussion themes in seconds.</li>
                  <li>Results are stored temporarily so you can revisit without reprocessing.</li>
                </ol>
              </div>

              <div className="w-full h-[2px] bg-black"></div>

              {/* Future Features */}
              <div className="flex flex-col text-md gap-y-2">
                <div className="text-2xl font-semibold">Built for the Future</div>
                <div>We’re constantly evolving. Soon, you’ll be able to:</div>
                <ul className="list-disc list-inside space-y-1">
                  <li>Analyze thousands of comments per video for deeper accuracy.</li>
                  <li>Use advanced filters by keywords, sentiment, or audience segments.</li>
                  <li>Track sentiment changes over time to spot trends early.</li>
                  <li>Expand analysis beyond YouTube to platforms like Reddit and TikTok.</li>
                </ul>
              </div>

              <div className="w-full h-[2px] bg-black"></div>

              {/* Feedback Section */}
              <div className="flex flex-col text-md gap-y-2">
                <div className="text-2xl font-semibold">💡 Help Shape the Future of Comments Analyzer</div>
                <div>
                  Your feedback matters. Whether it’s smarter filtering, multi-video comparison, or deeper analytics, your ideas can define our next big update.
                </div>
                <div>
                  📧 <strong>Talk to Us:</strong> contact@commentsanalyzer.info
                </div>
              </div>

              {/* <div className="w-full h-[2px] bg-black translate-y-0"></div> */}
            </div>

        <Footer/>
    </div>
  )
}