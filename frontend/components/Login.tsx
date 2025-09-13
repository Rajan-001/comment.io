import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { RiTwitterXFill } from "react-icons/ri";
//@ts-ignore
export default function Login({setSignUpModal,setLoginModal}) {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
    const router=useRouter()
  
  async function handleLogin() {

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/signin`, {
        method: "POST",
       credentials:"include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password}),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Signup failed");
        return;
      }

      router.push("/payment")
    } catch (error) {
      console.error(error);
      alert("Please check your Name and Password.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-white/30 backdrop-blur-sm">
      <div className="relative w-[420px] min-h-[480px] bg-blue-950 duration-500 rounded-3xl transition-all hover:shadow-none  shadow-[24px_24px_0px_0px_rgba(0,0,0,1)] p-8 text-white">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">Welcome Back</h2>
          <p className="text-slate-100 text-sm">Login to your account</p>
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-slate-200 text-sm font-semibold mb-2">Name</label>
          <input 
            onChange={(e) => setName(e.target.value)} 
            type="text" 
            placeholder="Enter your name" 
            className="w-full p-3 
                    group-hover:shadow-none border-2 visited:shadow-none text-slate-900 rounded-xl hover:shadow-xl bg-yellow-50 focus:border-neutral-900 focus:ring-2  focus:bg-white transform transition-all
                    duration-300 focus:translate-y-[-2px] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] placeholder:text-slate-400 outline-none      
                    border-slate-200 t text-base focus:shadow-lg "
          />
        </div>

        {/* Password Input */}
        <div className="relative mb-4">
          <label className="block text-slate-200 text-sm font-semibold mb-2">Password</label>
          <input 
            onChange={(e) => setPassword(e.target.value)} 
            type="text" 
            placeholder="••••••••" 
            className=" w-full p-3 
                    group-hover:shadow-none border-2 visited:shadow-none text-slate-900 rounded-xl hover:shadow-xl bg-yellow-50 focus:border-neutral-900 focus:ring-2  focus:bg-white transform transition-all
                    duration-300 focus:translate-y-[-2px] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] placeholder:text-slate-400 outline-none      
                    border-slate-200 t text-base focus:shadow-lg"
          />
        
        </div>

        {/* Login Button */}
        <button  
          onClick={handleLogin} 
          className="relative w-full bg-yellow-50
                      cursor-pointer
                       shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]
                      border-2 border-black
                    text-black p-4 mt-6 rounded-xl font-semibold 
                     hover:shadow-2xl 
                    transition-all duration-300 ease-in-out 
                    transform hover:-translate-y-1 active:translate-y-0 overflow-hidden"
        >
          {/* Glow Ring Effect */}
          
          {/* Shimmer Effect */}
          <span className="absolute top-0 left-[-150%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent 
                           transform skew-x-[-20deg] group-hover:animate-shimmer"></span>

          {/* Button Text */}
          <span className="relative z-10">✨ Login</span>
        </button>

        {/* Divider */}
        <div className="relative text-center my-8 text-slate-200 text-sm">
          <span className="bg-slate-600 px-4 py-2 relative z-10 rounded-lg">Or login with</span>
          <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-200 -z-10"></div>
        </div>

        {/* Social Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 group-hover:shadow-none hover:shadow-xl border-2 cursor-pointer border-neutral-900 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:border-2 hover:border-black flex items-center justify-center gap-2 p-3   rounded-xl bg-white text-slate-600 font-medium  transform hover:-translate-y-1 transition">
             <FcGoogle className="w-5 h-5" /> Google 
          </button>
          <button className="flex-1 group-hover:shadow-none hover:shadow-xl border-2 cursor-pointer border-neutral-900 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:border-2 hover:border-black flex items-center justify-center gap-2 p-3   rounded-xl bg-white text-slate-600 font-medium  transform hover:-translate-y-1 transition">
             <RiTwitterXFill className="w-5 h-5"/> X 
          </button>
        </div>

        {/* Signup Redirect */}
        <div className="text-center mt-6">
          <p className="text-slate-100 text-sm">
            Don’t have an account?
            <span onClick={()=>{setSignUpModal(true);setLoginModal(false);}} className="text-yellow-200 font-semibold cursor-pointer hover:text-white ml-2">Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
}
