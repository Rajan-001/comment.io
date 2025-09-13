import React, { use, useEffect, useRef, useState } from 'react'

import PieChart from './Chart'
import { CommentsAnalysis } from './CommentsAnalysis'

import PaymentModal from './PaymentModal'
import { Navbar } from './Navbar'
import { Description } from './Description'
import { Steps } from './Steps'
import { Footer } from './Footer'
import Login from './Login'
type Props = {}

export const LandingPage = (props: Props) => {
  const inputRef=useRef(null)
  const[comment,SetComment]=useState([{}])

  const [analysisStatus,analysisCompleted]=useState(false)
  const [checkedComment,SetCheckedComment]=useState({})
  const [positiveCommentList,SetPositiveCommentList]=useState([])
  const [suggestionList,SetSuggesstionList]=useState([])
  const [negativeCommentList,SetNegativeCommentList]=useState([])
  const [showSignIn, setShowSignIn] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [loading,Setloading]=useState(false)

   const fetchData = async () => {
    const input = inputRef.current
    //@ts-ignore
    if (!input || !input.value) {
      alert("Please enter a valid YouTube URL.")
      return
    }

    try{
      Setloading(true)
      const res=await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/api/comments`,{
        method:"POST",
        headers: {
        'Content-Type': 'application/json',
      },
      //@ts-ignore
      body: JSON.stringify({ videoUrl: input.value }),
      })
       const data = await res.json()
      if (data.action === "SHOW_SIGNIN_POPUP") {
        setShowSignIn(true); // 🔥 Show sign-in modal
      } else if (data.action === "SHOW_PAYMENT_POPUP") {
        setShowPayment(true); // 🔥 Show payment modal
      } 
 
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
        const analysis= await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/api/analysis`,{
          method:"POST",
          credentials:"include",
        headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comments: newComment }),
      
        })
   
       const parsed=await analysis.json()
    
       SetCheckedComment(parsed)
      SetPositiveCommentList(parsed.positiveUsers)
      SetSuggesstionList(parsed.suggestionUsers)
      SetNegativeCommentList(parsed.negativeUsers)
      analysisCompleted(true)
      Setloading(false)
    } 
    
 catch (err) {
      console.error("Failed to fetch comments", err)
    }
  }


  return (
    <div className=''>
        <div className="w-screen  relative  backdrop-blur-3xl">

               <Navbar/>
       <div className='w-screen'>
        
            <div className="flex justify-center items-center w-full h-1/5 mt-8">
              <div className='text-5xl text-red-400'>
                Youtube Video Comment Analyser 
              </div>
            </div>
            <div className="flex justify-center items-center w-full h-36 text-center  ">
              <input ref={inputRef} placeholder="Paste Your Youtube link here" className="w-110 placeholder:text-white h-12 rounded-full pl-8 place-content-center border-2 bg-red-400 text-white transition-all duration-200 hover:shadow-none visited:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border-black  "/>

              <button onClick={fetchData} className='h-12 ml-2 rounded-3xl w-32 hover:cursor-pointer transition-all duration-300 border-2 border-black hover:shadow-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:text-white  bg-red-400 text-slate-100'>Analyze</button>
            </div>
        
    

           { loading &&
           <div className='h-38 w-screen flex justify-center items-center'>
           <div className='loader-105'>
            </div>
            </div>
           }
 
           
             {
            analysisStatus &&
         
            <div className='flex flex-row'>
         
            <PieChart positive={(checkedComment as any)?.summary?.totalPositive||0} negative={(checkedComment as any)?.summary?.totalNegative||0} neutral={(checkedComment as any)?.summary?.totalNeutral||0} /> 
            
            <CommentsAnalysis positiveCommentList={positiveCommentList} suggestionList={suggestionList} negativeCommentList={negativeCommentList}/>
            </div>
            }
          
               { showSignIn && <Login setSignUpModal={true} setLoginModal={false}  />}
      {showPayment && <PaymentModal onClose={() => setShowPayment(false)} />}
              
           <div className='relative w-screen '>
             {/* <section className='absolute top-1/4 left-1/2 h-[80vh]'>
            <div className="container -z-10">
            <div className="blur">
              <div className="gradient-mask">
                <div className="spinning-gradient"></div>
              </div>
            </div>
            </div>
            </section> */}
          
            <Description/> 
            

            <Steps/>
            </div>
            </div> 
           </div>
           <div className='w-screen '>
           
          <Footer/>
          </div>
          
    </div>
  )
}