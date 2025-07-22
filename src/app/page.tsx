"use client"
import { useEffect, useState } from "react";


export default function Home() {
  const[comment,SetComment]=useState([])
  useEffect(()=>{
   const fetchData=async()=>{
  
    const res=await fetch("https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=QxVCigL1eyE",
      {
      method:'GET',
      headers:{
        "Authorization":"Bearer "
      }
    }
    )
      const data=await res.json()
    const newComment=data.items.map(
      (item)=> item.snippet.topLevelComment.snippet.textOriginal
    )
  
    SetComment(newComment)

   }
    fetchData();
  },[]
)
  return (
   <div className="w-screen h-screen place-content-center">
 { 
 [...comment].map((i,j)=>{
  return(<div key={j}>
    {i}
  </div>)
 })
 }
   </div>
  );
}
