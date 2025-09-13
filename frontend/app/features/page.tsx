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
    //@ts-ignore
      const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - 48; // 48 is half of 96 (div size)
    const mouseY = e.clientY - rect.top - 48;
  x.set(mouseX)
  y.set(mouseY)
  }
 }


  return (
   <div ref={containerRef}  className="flex flex-col bg-yellow-50 ">
  

  <div className="w-screen flex flex-col p-12 relative z-10">
  <Navbar/>
  
  <div className='flex z-10 justify-center items-center text-center h-52 text-5xl font-extrabold hover:shadow-md transition-all duration-300 bg-pink-400 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'>
    
      AI-Powered Analysis, Human-Level Understanding
   
  </div>
  <div className='flex z-10 justify-center transition-all duration-200 items-center text-center mt-8 h-20 text-4xl font-bold bg-cyan-300 hover:shadow-md shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'>
    Your analytics need at one place
  </div>
    {/* Page Title */}
    <div className='grid grid-cols-3 gap-x-8 gap-y-18 mt-12'>
 { features.map((feature,i)=>(
    <div key={i} className='flex z-10 border-2 hover:shadow-2xl transition-all duration-500 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] pb-4 pt-4 rounded-2xl   flex-col w-full h-full gap-y-6 '>
     
      <div className='w-full flex justify-start items-center px-4'>  
          <div 
          style={{backgroundColor:feature.color}}
          // style={{ boxShadow: "0 0 8px 14px rgba(239, 42, 68, 0.2)"}}
           className="w-20 h-20 m-4 flex items-center text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] justify-center rounded-full bg-transparent  border-2 border-black">
          <feature.icons className=" w-10 h-10 text-primary " />
          </div>
      </div>

    <div className="flex flex-col gap-y-4 mt-6 "><div style={{backgroundColor:feature.color}} className={`text-4xl  py-4 font-bold text-start pl-2  text-black`}>
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