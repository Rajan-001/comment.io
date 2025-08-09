import React from 'react'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'


export default function page ()  {
  return (
    <div>
    <Navbar/>
   
        
        <div className='flex flex-col m-8 gap-y-8 mt-12 px-12'>
        
       <div className='w-full flex justify-center  text-center font-extrabold text-5xl '> 📌 Frequently Asked Questions (FAQ)</div>
       
       <div className='text-xl text-black mt-6 flex flex-col'>
       <div className=' font-bold'>1. What is YouTube Comments Analyzer?</div> 
      <div className='text-sm pl-6'>
      YouTube Comments Analyzer is an AI-powered tool that scans video comment sections, filters out the noise, and delivers clear insights about what your audience is saying. From spotting trending topics to understanding sentiment, it helps you make data-driven decisions for your content, brand, or research.
   </div>
   </div>


    <div className='text-xl text-black flex flex-col' >
      <div className='font-bold'> 2. How does it work?</div> 
<div className='text-sm pl-6'>
It’s simple:
<ul className='list-disc  pl-4'>
    <li>Paste a public YouTube video link into the tool.</li>
    <li>Our system fetches comments using the YouTube Data API.</li>
    <li>AI analyzes the data, detecting trends, sentiment, and themes.</li>
    <li>You instantly see visual summaries, charts, and insights — no manual scrolling required.</li>
</ul>
</div>
    </div>

<div className='text-xl text-black flex flex-col'>
    <div className=' font-bold'>3. How many comments can it analyze?</div>
    <div className='text-sm pl-6'>
        <ul className='list-disc pl-4'>
            <li>In the standard version, we process up to 20 comments per video for quick results.</li>
            <li>In the upcoming pro version, we’ll support thousands of comments for deeper analysis.</li>
        </ul>
    </div>
</div>

<div className='text-xl text-black flex flex-col'>
    <div className='font-bold'>4. What kind of insights will I get?</div>
            <div className='text-sm pl-6'>
                You’ll see:
                <ul className='list-disc pl-4'>
                <li>Trending Topics – The most discussed themes.</li>
                <li>Sentiment Analysis – Positive, negative, and neutral breakdowns.</li>  
                <li>Hidden Gems – Unique feedback or overlooked ideas.</li> 
                <li>Visual Reports – Beautiful, shareable charts & summaries.</li>
                </ul>
        </div>
</div>

<div className='text-xl text-black flex flex-col'>
    <div className='font-bold'>5. Who is this tool for?</div>
<div className='text-sm pl-6'>
    It’s built for:
    <ul className='list-disc pl-4'>
        <li>Content Creators – To understand viewers & improve videos.</li>
        <li>Brands & Marketers – To gauge audience perception.</li>
        <li>Researchers & Analysts – To collect public opinion insights.</li>
    </ul>
</div>
</div>

<div className='text-xl text-black flex flex-col'>
    <div className='font-bold'>6. Does it work on private or unlisted videos?</div>
  <div className='text-sm pl-6'>No — it only works with public videos that have comments enabled.</div>
</div>

<div className='text-xl text-black flex flex-col'>
    <div className='font-bold'>7. Will you add more features? </div>
    <div className='text-sm pl-10'>
        <ul className='list-disc '>
            <li>Yes! Upcoming updates include:</li>
            <li>Advanced filtering by keywords or sentiment type.</li>
            <li>Multi-video comparison.</li>
            <li>Sentiment tracking over time.</li>
            <li>Support for platforms like Reddit & TikTok.</li>
        </ul>
    </div>
</div>

<div className='text-xl text-black flex flex-col'>
    <div className='font-bold'>8. How do I share my feedback or request a feature?</div>
<div className='text-sm pl-6'>We love hearing from our users!💡</div>
<div className='mt-12 font-extrabold'>📧 Email us at contact@commentsanalyzer.info with your ideas.</div>
</div>

</div>
   
   <Footer/>
    </div>
  )
}