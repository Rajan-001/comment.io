import React from 'react'



export const Steps = () => {
    return (
        <div className="grid grid-cols-1 mt-8 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-12 px-4 text-slate-800 max-w-7xl mx-auto">
  {/* Step 1 */}
  <div className="p-6 rounded-xl shadow-md bg-white hover:shadow-lg transition drop-shadow-[0_2px_2px_rgba(71.4% 0.203 305.504)]">
    <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
      1️⃣ Paste & Analyze
    </h3>
    <p className="text-sm leading-relaxed">
      Insert any public YouTube video link into the tool to get started. It works instantly with any accessible video content.
    </p>
  </div>

  {/* Step 2 */}
  <div className="p-6 rounded-xl shadow-md bg-white hover:shadow-lg transition drop-shadow-[0_2px_2px_rgba(oklch(68.5% 0.169 237.323)]">
    <h3 className="text-lg font-bold mb-2  bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-400 bg-clip-text text-transparent ">
      2️⃣ Deep AI Breakdown
    </h3>
    <p className="text-sm leading-relaxed">
      Behind the scenes, our AI dives into the comments — detecting tone, surfacing trends, and pulling out key topics with advanced natural language understanding.
    </p>
  </div>

  {/* Step 3 */}
  <div className="p-6 rounded-xl shadow-md bg-white hover:shadow-lg transition drop-shadow-[0_2px_2px_oklch(70.4% 0.191 22.216)]">
    <h3 className="text-lg font-bold mb-2  bg-gradient-to-r bg-clip-text text-transparent from-pink-600 via-orange-500 to-yellow-400 ">
      3️⃣ Insightful Dashboard
    </h3>
    <p className="text-sm leading-relaxed">
      Get a clear, visual summary of audience sentiment, popular keywords, and recurring feedback — all in one place, ready for review or download.
    </p>
  </div>

  {/* Step 4 */}
  <div className="p-6 rounded-xl shadow-md bg-white hover:shadow-lg transition drop-shadow-[0_2px_2px_oklch(76.8% 0.233 130.85)]">
    <h3 className="text-lg font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent from-green-600 via-emerald-400 to-teal-300">
      4️⃣ Optimize Your Strategy
    </h3>
    <p className="text-sm leading-relaxed">
      Apply what you’ve learned to refine your content, connect better with your viewers, or guide creative and marketing decisions with confidence.
    </p>
  </div>
</div>

    )
}