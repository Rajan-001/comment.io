"use client"
import React, { useState } from 'react'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { faq } from '../../lib/faq'
import { AnimatePresence, motion } from 'motion/react'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { GiPin } from 'react-icons/gi'


export default function Page ()  {
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  function toggleFaq(index:any){
    console.log(index)
   setOpenIndexes((prev)=>prev.includes(index)?prev.filter((i)=>i!=index):[...prev,index])
  }

  return (
    <div>
    <Navbar/>
   
        
        <div className='flex flex-col m-8 gap-y-8 mt-12 px-12'>
        
       <div className='w-full flex justify-center  text-center border-2 py-6 rounded-xl bg-red-600 text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]  '> <GiPin className='animate-bounce w-12 h-full justify-center items pt-2 ' /> <span className='font-extrabold text-5xl ml-2 '>Frequently Asked Questions (FAQ)</span> </div>

        <div className="w-full max-w-3xl mx-auto space-y-4">
      {faq.map((x, i) => (
        <div
          key={i}
          className="rounded-2xl overflow-hidden border  transition-all visited:text-white active:shadow-md duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        >
          {/* Question */}
          <button
            onClick={() => toggleFaq(i)}
            style={{backgroundColor:x.color}}
            className={`flex rounded-2xl w-full items-center border-2 border-black justify-between px-6 py-4 text-lg cursor-pointer font-semibold  transition-colors `}
          >
            <span>
              {x.id}. {x.question}
            </span>
            {openIndexes.includes(i) ? (
              <FiMinus className="w-5 h-5" />
            ) : (
              <FiPlus className="w-5 h-5" />
            )}
          </button>

          {/* Answer */}
          <AnimatePresence>
            {openIndexes.includes(i) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-50 px-6 py-4 text-sm text-slate-700 font-bold"
              >
                <p className="mb-2">{x.answer}</p>
                {x.steps && (
                  <ul className="list-disc pl-6 space-y-1">
                    {x.steps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>

</div>
   
   <Footer/>
    </div>
  )
}