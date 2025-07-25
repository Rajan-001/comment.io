import React, { useEffect, useRef, useState } from 'react'
import { FaCopy } from 'react-icons/fa'
import { GiLynxHead } from 'react-icons/gi'
import { ImDownload2 } from 'react-icons/im'
import { MdCollectionsBookmark } from 'react-icons/md'
import Image from 'next/image'
type Props = {}

export const LandingPage = (props: Props) => {
  const inputRef=useRef(null)
  const[comment,SetComment]=useState([{}])
  const key=process.env.NEXT_PUBLIC_GOOGLE_API_KEY!;
  
   const fetchData = async () => {
    const input = inputRef.current
    if (!input || !input.value) {
      alert("Please enter a valid YouTube URL.")
      return
    }

    try{
      const res=await fetch("/api/comments",{
        method:"POST",
        headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ videoUrl: input.value }),
      })
       const data = await res.json()
      //  console.log(data.comments)
 
     const newComment = data.comments.map((item: any) => {
        
        return {
          text: item.textOriginal,
          username: item.authorDisplayName,
          profilePic: item.authorProfileImageUrl,
          likes: item.likeCount,
          postedAt: item.publishedAt
        };
           });
           console.log(newComment)
      SetComment(newComment)
        const analysis= await fetch("/api/analysis",{
          method:"POST",
        headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comments: newComment }),
      
        })
    
       const {parsed}=await analysis.json()
      console.log(parsed)
    } 
    
 catch (err) {
      console.error("Failed to fetch comments", err)
    }
  }


  return (
    <div>
        <div className="w-screen h-screen relative ">
            <div className="w-full px-24 flex flex-row h-18 backdrop-blur-2xl justify-between items-center">
              <div className="w-auto "><Image width={30} height={30} src={"/youtube.png"} alt="Logo"/></div>
              <div className="flex flex-row gap-x-2">
                <div>Home</div>
                <div>About</div>
                <div>Features</div>
                <div>FAQs</div>
                <div>History</div>
              </div>
              <div><GiLynxHead className="w-8 h-8" /></div>
            </div>
            <div className="flex justify-center items-center w-full h-1/5">
              <div>
                Youtube Video Analyser
              </div>
            </div>
            <div className="flex justify-center items-center w-full h-36 text-center">
              <input ref={inputRef} placeholder="Paste Your Youtube link" className="w-96 h-12 place-content-center "/>
              <button onClick={fetchData} className='h-6 w-24 bg-red-500'>Analyze</button>
            </div>
        
            <div className="w-full h-96 flex px-24 flex-row bg-black">
              <div>
                <FaCopy className="text-white" />
              </div>
              <div>
                <ImDownload2 />
              </div>
              <div>
                <MdCollectionsBookmark />
              </div>
            </div>
           
           </div>
    </div>
  )
}