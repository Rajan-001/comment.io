"use client"
import React from 'react'
import { Footer } from '../../components/Footer'
import { features } from '../../lib/features'
import { Navbar } from '../../components/Navbar'
import { useRouter } from 'next/navigation'


export default function Page  () {
 const router=useRouter();
  return (
   <div className="flex flex-col">
  <div className="w-screen flex flex-col p-12 ">
  <Navbar/>

  <div className='flex justify-center items-center text-center h-52 text-5xl font-extrabold'>
    
      AI-Powered Analysis, Human-Level Understanding
   
  </div>
    {/* Page Title */}
 { features.map((feature,i)=>(
    <div key={i}>
    <div className="flex flex-col gap-y-2 mt-8"><div className="text-4xl font-bold text-center">
         {feature.title}
     </div><div className="text-lg text-center max-w-3xl mx-auto text-gray-700">
             {feature.text}
         </div>
         
         </div>
         <div className="w-full h-[2px] bg-black"></div>
         </div>
 ))  
    }




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