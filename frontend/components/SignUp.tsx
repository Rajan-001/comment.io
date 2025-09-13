"use client"
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react"
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { RiTwitterXFill } from "react-icons/ri";
import Login from "./Login";
//@ts-ignore
export default function SignUp({setSignUpModal,setLoginModal}) {
     const { data: session, status } =  useSession()
     const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name,SetName]=useState("")
  const[selectedSite,SetSelectedSite]=useState("")
  
  async function handleSignup() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password,name }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Signup failed");
        return;
      }
     setLoginModal(true)
     setSignUpModal(false)
     
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  async function handleSocialSignIn() {
    try{
    signIn(selectedSite)
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/social-site-signin`,{
       method:"POST",
       headers:{ "Content-Type": "application/json" },
       //@ts-ignore
       body:JSON.stringify({ name:session?.user?.name,email:session?.user?.email ,provider:session?.user?.provider })
    })
 const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Signup failed");
        return;
      }
     setLoginModal(true)
     
    } 
    catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }    
  }
        
  return ( 
 <div className="min-h-screen flex items-center justify-center p-5">
   
   <div className="relative w-[420px] min-h-[700px]  [perspective:1000px]  rounded-3xl transition-all duration-300 hover:shadow-none  shadow-[24px_24px_0px_0px_rgba(0,0,0,1)]">
    
    {/* Card Container */}
    <div id="form-container" className="relative w-full min-h-[700px] [transform-style:preserve-3d] px-2 rounded-3xl  transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]">

      {/* FRONT SIDE */}
      <div className="absolute w-full py-4 min-h-[700px] backface-hidden backdrop-blur-xl  rounded-3xl bg-red-800 border-2 border-black px-4  shadow-2xl flex flex-col animate-fadeInUp">
        
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-black drop-shadow-lg">
            Create Your Account
          </h2>
          <p className="text-slate-100 mt-2 text-sm opacity-90">
            Join us and unlock amazing features!
          </p>
        </div>

        {/* Name Field */}
        <div className="mb-5">
          <label className="block text-slate-200 group text-sm font-semibold mb-2">Name</label>
          <input 
            onChange={(e) => SetName(e.target.value)}
            type="text" 
            placeholder="John Doe" 
            className="w-full p-3  group-hover:shadow-none border-2 visited:shadow-none text-slate-900 rounded-xl hover:shadow-xl bg-yellow-50 focus:border-neutral-900 focus:ring-2  focus:bg-white transform transition-all duration-300 focus:translate-y-[-2px] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] placeholder:text-slate-400 outline-none"
          />
          
        </div>

        {/* Email Field */}
        <div className="mb-5">
          <label className="block group text-slate-200 text-sm font-semibold mb-2">Email</label>
          <input 
            onChange={(e) => setEmail(e.target.value)}
            type="email" 
            placeholder="you@example.com" 
            className="w-full p-3 group-hover:shadow-none hover:shadow-xl border-neutral-900 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] text-slate-900 rounded-xl bg-yellow-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:bg-white transform transition-all duration-300 focus:translate-y-[-2px]  placeholder:text-slate-400 outline-none"
          />
        </div>

        {/* Password Field */}
        <div className="relative mb-6 group">
          <label className="block text-slate-200 text-sm font-semibold mb-2">Password</label>
          <input 
            onChange={(e) => setPassword(e.target.value)}
           type="text" 
            placeholder="••••••••" 
            className="w-full p-3 border-2 group-hover:shadow-none hover:shadow-xl border-neutral-900 text-slate-900 rounded-xl bg-yellow-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:bg-white transform transition-all duration-300 focus:translate-y-[-2px] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] placeholder:text-slate-400 outline-none"
          />
        
        </div>

        {/* Sign Up Button */}
        <button  
          onClick={() => handleSignup()} 
          className="relative w-full bg-yellow-50
                      cursor-pointer
                       shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]
                      border-2 border-black
                    text-black p-4 rounded-xl font-semibold 
                     hover:shadow-2xl 
                    transition-all duration-300 ease-in-out 
                    transform hover:-translate-y-1 active:translate-y-0 overflow-hidden  "
        >
       
           
          {/* Shimmer Effect */}
          <span className="absolute top-0 left-[-150%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent 
                          transform skew-x-[-20deg] group-hover:animate-shimmer"></span>

          {/* Button Text */}
          <span className="relative z-10">✨ Sign Up</span>
        </button>


        {/* Divider */}
        <div className="relative text-center my-8">
          <span className="bg-indigo-600 px-4 py-1 rounded-full text-slate-100 text-xs font-medium relative z-10 shadow-md">Or sign up with</span>
          <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-300 opacity-50 -z-10"></div>
        </div>

        {/* Social Buttons */}
        <div className="flex gap-4 mb-4">
          <button 
            onClick={() => signIn("google")}
            className="flex-1 group-hover:shadow-none hover:shadow-xl border-2 cursor-pointer border-neutral-900 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:border-2 hover:border-black flex items-center justify-center gap-2 p-3   rounded-xl bg-white text-slate-600 font-medium  transform hover:-translate-y-1 transition"
          >
            <FcGoogle className="w-5 h-5" /> Google 
          </button>
          <button 
            onClick={() => signIn("twitter")}
            className="flex-1 flex items-center group-hover:shadow-none hover:shadow-xl cursor-pointer border-neutral-900 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]  hover:border-2 hover:border-black justify-center gap-2 p-3 border-2  rounded-xl bg-white text-slate-600 font-medium  transform hover:-translate-y-1 transition"
          >
            <RiTwitterXFill className="w-5 h-5"/> X 
          </button>
        </div>

        {/* Already have an account */}
        <div className="text-center mt-4">
          <p className="text-slate-100 text-sm">
            Already have an account?  
            <span onClick={()=>{setSignUpModal(false);setLoginModal(true)}} className="text-yellow-200 font-semibold cursor-pointer hover:text-white ml-2">Login</span>
          </p>
        </div>
      </div>

      {/* BACK SIDE (For flipping animation later) */}
      <div className="absolute w-full min-h-[700px] backface-hidden bg-white/95 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-2xl flex flex-col rotate-y-180 animate-fadeInUp">
        {/* Future Login UI here */}
      </div>

    </div>
  </div> 
    </div>
  )
}


 