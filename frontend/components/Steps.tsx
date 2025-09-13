import React from 'react'



export const Steps = () => {
    return (
        <div className="grid grid-cols-1 mt-8 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-12 px-4 text-slate-800 max-w-7xl mx-auto">
  {/* Step 1 */}
  <div className=" rounded-xl border-2 overflow-hidden transition-all duration-300 border-black bg-white hover:shadow-lg  shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
    <h3 className="text-lg font-bold py-5  mb-2 bg-amber-400 w-full text-black ">
      1️⃣ Paste & Analyze
    </h3>
    <p className="text-sm p-2 leading-relaxed">
      Insert any public YouTube video link into the tool to get started. It works instantly with any accessible video content.
    </p>
  </div>

  {/* Step 2 */}
  <div className=" rounded-xl border-2 overflow-hidden transition-all duration-300 border-black bg-white hover:shadow-lg  shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
    <h3 className="text-lg font-bold py-5  mb-2  bg-cyan-400 w-full text-black ">
      2️⃣ Deep AI Breakdown
    </h3>
    <p className="text-sm leading-relaxed p-2">
      Behind the scenes, our AI dives into the comments — detecting tone, surfacing trends, and pulling out key topics with advanced natural language understanding.
    </p>
  </div>

  {/* Step 3 */}
  <div className="rounded-xl border-2 overflow-hidden transition-all duration-300 border-black bg-white hover:shadow-lg  shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
    <h3 className="text-lg font-bold py-5  mb-2   bg-fuchsia-400 w-full text-black ">
      3️⃣ Insightful Dashboard
    </h3>
    <p className="text-sm leading-relaxed p-2">
      Get a clear, visual summary of audience sentiment, popular keywords, and recurring feedback — all in one place, ready for review or download.
    </p>
  </div>

  {/* Step 4 */}
  <div className=" rounded-xl border-2 overflow-hidden transition-all duration-300 border-black bg-white hover:shadow-lg  shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
    <h3 className="text-lg font-bold  mb-2 py-5   bg-orange-400 w-full text-black">
      4️⃣ Optimize Your Strategy
    </h3>
    <p className="text-sm leading-relaxed p-2">
      Apply what you’ve learned to refine your content, connect better with your viewers, or guide creative and marketing decisions with confidence.
    </p>
  </div>
</div>

    )
}