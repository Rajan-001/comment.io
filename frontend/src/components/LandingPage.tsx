import React, { useEffect, useRef, useState } from 'react'
import { FaCopy } from 'react-icons/fa'
import { GiLynxHead } from 'react-icons/gi'
import { ImDownload2 } from 'react-icons/im'
import { MdCollectionsBookmark } from 'react-icons/md'
import Image from 'next/image'
import PieChart from './Chart'
import { CommentsAnalysis } from './CommentsAnalysis'
import Link from 'next/link'
import SignInModal from './SignIn'
import PaymentModal from './PaymentModal'
type Props = {}

export const LandingPage = (props: Props) => {
  const inputRef=useRef(null)
  const[comment,SetComment]=useState([{}])
  const key=process.env.NEXT_PUBLIC_GOOGLE_API_KEY!;
  const [analysisStatus,analysisCompleted]=useState(false)
  const [checkedComment,SetCheckedComment]=useState({})
  const [positiveCommentList,SetPositiveCommentList]=useState([])
  const [suggestionList,SetSuggesstionList]=useState([])
  const [negativeCommentList,SetNegativeCommentList]=useState([])
  const [showSignIn, setShowSignIn] = useState(false);
  const [showPayment, setShowPayment] = useState(false);


   const fetchData = async () => {
    const input = inputRef.current
    if (!input || !input.value) {
      alert("Please enter a valid YouTube URL.")
      return
    }

    try{
    
      const res=await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/api/comments`,{
        method:"POST",
        headers: {
        'Content-Type': 'application/json',
      },
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
              <div>
                <Link href="/payment">
                <GiLynxHead className="w-8 h-8"  />
                </Link>
                </div>
            </div>
            <div className="flex justify-center items-center w-full h-1/5">
              <div>
                Youtube Video Analyser
              </div>
            </div>
            <div className="flex justify-center items-center w-full h-36 text-center ">
              <input ref={inputRef} placeholder="Paste Your Youtube link" className="w-96 h-12 place-content-center "/>
              <button onClick={fetchData} className='h-6 w-24 bg-red-500'>Analyze</button>
            </div>
        
            <div className="w-full h-12 flex px-24 flex-row">
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
             {
            analysisStatus &&
            <div className='flex flex-row'>
            <PieChart positive={checkedComment?.summary?.totalPositive||0} negative={checkedComment?.summary?.totalNegative||0} neutral={checkedComment?.summary?.totalNeutral||0} /> 
            <CommentsAnalysis positiveCommentList={positiveCommentList} suggestionList={suggestionList} negativeCommentList={negativeCommentList}/>
            </div>
            }
          
               { showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
      {showPayment && <PaymentModal onClose={() => setShowPayment(false)} />}
           
           </div>
          
    </div>
  )
}