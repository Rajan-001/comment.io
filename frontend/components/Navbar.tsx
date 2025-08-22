"use client"
import React, { useRef, useState } from 'react'

import Link from 'next/link'
import { GiLynxHead } from 'react-icons/gi'
import { navItems } from '../lib/navItems'
import { motion, useMotionValue } from 'motion/react'
import { FaYoutube } from 'react-icons/fa'

export const Navbar = () => {
  const x=useMotionValue([0])
  const tabRef=useRef(null)
  const [position,SetPosition]=useState({width:0,left:0,opacity:0})
  return (
    <div className='w-screen  flex justify-center items-center '>
   <div className="w-[calc(100vw-200px)] flex flex-row m-6 h-16 backdrop-blur-2xl justify-between items-center  ">
              {
                navItems.map((item,i)=>{
                      if (item.type === "image") 
                      {
                        return ( <div key={i} > 
                            <Link href={item.href!}>
                              <FaYoutube className='text-neutral-900 hover:text-red-400 w-8 h-8' />
                                </Link>
                            </div>
                            )
                      }
                      else if(item.type=="links")
                      {
                       
                        return(
                        <motion.div
                          key={i}
                            
                          className="flex h-full gap-x-2 px-4 w-fit border-2 border-neutral-900 hover:border-red-400 relative text-lg rounded-3xl items-center backdrop-blur-sm   text-neutral-900"
                        >
                          <motion.div
                            className="bg-red-500 absolute h-4/5 rounded-3xl my-2 z-10  "
                            animate={position}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                          ></motion.div>

                          {item?.items?.map(({ label, href }) => (
                            <motion.div key={href} className="z-20 px-2">
                              <Link
                                href={href}
                                onMouseEnter={(e) => {
                                  //@ts-ignore
                                  const { width } = e.target.getBoundingClientRect();
                                  SetPosition({
                                    width,
                                    opacity: 1,
                                    //@ts-ignore
                                    left: e.target.offsetLeft,
                                  });
                                }}
                              onMouseLeave={() => {
                                SetPosition((prev) => ({
                                  ...prev,
                                  opacity: 0,
                                }));
                              }}                      
                                className="w-full h-full py-2 flex justify-center items-center hover:text-slate-200"
                              >
                                <motion.div className="cursor-pointer px-2 py-1  transition-colors duration-200">
                                  {label}
                                </motion.div>
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
           
                      )
                      }
                      else if(item.type=="iconLink")
                      {
                        return(<div key={i}>
                            <Link href={item.href!}>
                             <GiLynxHead className="w-8 h-8 text-neutral-900 hover:text-red-400"/>
                            </Link>
                        </div>)
                      }

                })
              }
          </div>
     </div>     
  )
}