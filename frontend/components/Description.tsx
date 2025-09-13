import React from 'react'
import { GiBrain } from 'react-icons/gi'
import Image from 'next/image'

import { ImHeart } from 'react-icons/im'
type Props = {}

export const Description = (props: Props) => {
  return (
   <div className="flex flex-col px-12 z-2 py-16 items-center  text-slate-800 ">
  {/* Header */}
  <h1 className="text-4xl  mb-6 text-center text-neutral-800 font-bold">
    🎥 The YouTube Comment Analyzer
  </h1>

  {/* Description */}
  <p className="max-w-3xl text-center text-lg font-normal text-neutral-900 mb-12 leading-normal">
    The YouTube Comment Analyzer is a powerful web-based tool that uses natural language processing (NLP) to automatically fetch, analyze, and visualize comments from any YouTube video. It highlights sentiment trends, filters spam, surfaces top keywords, and delivers smart summaries — all in one beautiful dashboard.
  </p>

  {/* Features */}
  <div className="grid grid-cols-1 mt-28 md:grid-cols-3 gap-8 w-full max-w-6xl">
    
    {/* Feature 1 */}
    <div className="bg-cyan-50  rounded-2xl border-3 transition-all duration-300 border-black  hover:shadow-lg  group shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
      <div className=' w-full justify-center items-start p-4'><GiBrain className='border-black group-hover:shadow-none border-2 h-16 rounded-xl p-2 hover:text-slate-200 w-16 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-red-400 text-white group-hover:scale-120 transition-all duration-300' /></div>
      <h3 className="text-[24px] p-4 mt-4 font-bold mb-2 bg-red-700 text-black border-2 border-black"> Smart Comment Summarization</h3>
      <p className="text-slate-700 mt-2 text-base p-4">
        Too many comments? No problem. Our tool highlights key themes, trending phrases, and top reactions so you get the full picture without reading every word.
      </p>
    </div>

    {/* Feature 2 */}
    <div className="bg-cyan-50  rounded-2xl hover:shadow-lg border-3 border-black transition-all duration-300 group shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
      <div className=' w-full justify-center items-start p-4'>
        <Image src={"/polling.png"} width={2} height={30} unoptimized alt='poll Image'  className='h-16 group-hover:shadow-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-2 border-black rounded-xl p-2 hover:text-slate-200 w-16  text-white group-hover:scale-120 transition-all duration-300' />
      </div>
      <h3 className="text-[26px] p-4 mt-4 font-bold mb-2 bg-indigo-700 text-black border-2 border-black">Audience Pulse at a Glance</h3>
      <p className="text-slate-700 mt-2 text-base p-4">
        Visualize how your video is performing emotionally. Real-time charts and keyword breakdowns make it easy to spot patterns and make data-driven decisions.
      </p>
    </div>

    {/* Feature 3 */}
    <div className="bg-cyan-50  rounded-2xl transition-all duration-300 border-3 border-black hover:shadow-lg  group shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] ">
      <div className=' w-full justify-center items-start p-4 '>
        <ImHeart       className='h-16 group-hover:shadow-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-2 border-black rounded-xl p-2 text-red-500 hover:text-slate-200 w-16   group-hover:scale-120 transition-all duration-300' /></div>
    
      <h3 className="text-[26px]  p-4 mt-4 font-bold mb-2 bg-emerald-700 text-black border-2 border-black">Emotion-Driven Feedback Mapping</h3>
      <p className="text-slate-700 mt-2 text-base p-4">
        Quickly uncover how viewers feel about your content. Our intelligent analyzer identifies emotional tones across all comments — from praise to criticism — with clarity and accuracy.
      </p>
    </div>

  </div>
</div>

  )
}