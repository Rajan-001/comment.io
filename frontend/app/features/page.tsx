"use client"
import React, { useRef } from 'react'
import { Footer } from '../../components/Footer'
import { features } from '../../lib/features'
import { Navbar } from '../../components/Navbar'
import { useRouter } from 'next/navigation'
import { motion, useMotionValue } from 'motion/react'


export default function Page  () {
 const router=useRouter();
 const x=useMotionValue(0)
 const y=useMotionValue(0)
const containerRef=useRef(null)
 function handleMouseMove(e:React.MouseEvent)
 {
  if(containerRef.current)
  {
      const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - 48; // 48 is half of 96 (div size)
    const mouseY = e.clientY - rect.top - 48;
  x.set(mouseX)
  y.set(mouseY)
  }
 }


  return (
   <div ref={containerRef} onMouseMove={handleMouseMove} className="flex flex-col ">
  

  <div className="w-screen flex flex-col p-12 relative z-10">
  <Navbar/>
<motion.div style={{x,y, background: "transparent",
    boxShadow: "0 0 120px 80px rgba(239, 68, 68, 0.7)",zIndex:"-3",borderRadius:"50%" }}  className=" bg-red-500 pointer-events-none rounded-full shadow-2xl absolute  flex justify-center items-center -translate-x-1/2 -translate-y-1/2"></motion.div>
  
  <div className='flex justify-center items-center text-center h-52 text-5xl font-extrabold'>
    
      AI-Powered Analysis, Human-Level Understanding
   
  </div>
  <div className='flex justify-center items-center text-center h-20 text-4xl font-bold'>
    Your analytics need at one place
  </div>
    {/* Page Title */}
    <div className='grid grid-cols-3 gap-x-12 gap-y-26 mt-12'>
 { features.map((feature,i)=>(
    <div key={i} className='flex flex-col w-full h-full gap-y-4'>
      <div className='w-full flex justify-start items-center '><div style={{ boxShadow: "0 0 8px 14px rgba(239, 42, 68, 0.2)"}} className="w-20 h-20 flex items-center justify-center rounded-full shadow-2xl bg-transparent border border-neutral-300">
  <feature.icons 
   className="w-10 h-10 text-primary animate-pulse" />
</div>
 </div>
    <div className="flex flex-col gap-y-4 mt-6"><div className="text-4xl font-bold text-start">
         {feature.title}
     </div><div className="text-lg text-start mt-4 max-w-3xl mx-auto text-gray-700">
             {feature.text}
         </div>
         
         </div>
      
         </div>
 ))  
    }
    </div>




    {/* Call to Action */}
    <div className="text-center mt-8">
      <div className="text-xl font-semibold mb-2">
        Start Analyzing Your Audience Today
      </div>
      <button onClick={()=>router.push("/")} className="px-6 py-3 bg-red-600 text-white rounded-lg text-lg hover:bg-red-700 transition cursor-pointer">
        Try It Now
      </button>
    </div>
  </div>

  <Footer />
</div>

  )
}