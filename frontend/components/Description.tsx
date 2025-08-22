import React from 'react'
import { GiBrain } from 'react-icons/gi'
import Image from 'next/image'
import { FaHeart } from 'react-icons/fa'
import { GoHeartFill } from 'react-icons/go'
import { IoHeartSharp } from 'react-icons/io5'
import { FaRegHeart } from 'react-icons/fa6'
import { FiHeart } from 'react-icons/fi'
import { BsHeartFill } from 'react-icons/bs'
import { ImHeart } from 'react-icons/im'
type Props = {}

export const Description = (props: Props) => {
  return (
   <div className="flex flex-col px-12 py-16 items-center  text-slate-800">
  {/* Header */}
  <h1 className="text-4xl font-black mb-6 text-center">
    🎥 The YouTube Comment Analyzer
  </h1>

  {/* Description */}
  <p className="max-w-3xl text-center text-lg font-normal text-slate-600 mb-12 leading-normal">
    The YouTube Comment Analyzer is a powerful web-based tool that uses natural language processing (NLP) to automatically fetch, analyze, and visualize comments from any YouTube video. It highlights sentiment trends, filters spam, surfaces top keywords, and delivers smart summaries — all in one beautiful dashboard.
  </p>

  {/* Features */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
    
    {/* Feature 1 */}
    <div className="bg-white p-6 rounded-2xl shadow-2xl hover:shadow-lg transition group shadow-red-300">
      <div className=' w-full justify-center items-start '><GiBrain className='h-16 rounded-xl p-2 hover:text-slate-200 w-16 bg-red-400 text-white group-hover:scale-120 transition-all duration-300' /></div>
      <h3 className="text-[26px] mt-4 font-bold mb-2 text-red-500"> Smart Comment Summarization</h3>
      <p className="text-slate-700 mt-4 text-base">
        Too many comments? No problem. Our tool highlights key themes, trending phrases, and top reactions so you get the full picture without reading every word.
      </p>
    </div>

    {/* Feature 2 */}
    <div className="bg-white p-6 rounded-2xl shadow-2xl hover:shadow-lg transition group shadow-sky-300">
      <div className=' w-full justify-center items-start '>
        <Image src={"/polling.png"} width={2} height={30} unoptimized alt='poll Image'  className='h-16 rounded-xl p-2 hover:text-slate-200 w-16  text-white group-hover:scale-120 transition-all duration-300' />
      </div>
      <h3 className="text-[26px] mt-4 font-bold mb-2 text-blue-500">📊 Audience Pulse at a Glance</h3>
      <p className="text-slate-700 mt-4 text-base">
        Visualize how your video is performing emotionally. Real-time charts and keyword breakdowns make it easy to spot patterns and make data-driven decisions.
      </p>
    </div>

    {/* Feature 3 */}
    <div className="bg-white p-6 rounded-2xl shadow-2xl hover:shadow-lg transition group shadow-green-300 ">
      <div className=' w-full justify-center items-start '>
        <ImHeart       className='h-16 rounded-xl p-2 text-red-500 hover:text-slate-200 w-16   group-hover:scale-120 transition-all duration-300' /></div>
    
      <h3 className="text-[26px] mt-4 font-bold mb-2 text-emerald-500">❤️ Emotion-Driven Feedback Mapping</h3>
      <p className="text-slate-700 mt-4 text-base">
        Quickly uncover how viewers feel about your content. Our intelligent analyzer identifies emotional tones across all comments — from praise to criticism — with clarity and accuracy.
      </p>
    </div>

  </div>
</div>

  )
}