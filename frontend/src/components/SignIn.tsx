import { motion } from "framer-motion";
import { Mail, X, LogIn } from "lucide-react";
import { useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";


export default function SignIn() {
     const { data: session, status } =  useSession()
     const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  async function handleSignup() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Signup failed");
        return;
      }

      alert("✅ Signup successful!");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }
        
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-violet-500 to-pink-400 p-5">
  <div className="relative w-[420px] min-h-[680px] [perspective:1000px]">
   
    <div id="form-container" className="relative w-full min-h-[680px] [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]">

      <div className="absolute w-full min-h-[680px] backface-hidden bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl flex flex-col animate-fadeInUp">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-br from-indigo-500 to-violet-500 bg-clip-text text-transparent">Create Account</h2>
          <p className="text-slate-500 text-sm">Sign up to get started</p>
        </div>

       
        <div className="mb-4">
          <label className="block text-slate-700 text-sm font-semibold mb-2">Email</label>
          <input onChange={((e)=>setEmail(e.target.value))} type="email" placeholder="Enter your email" className="w-full p-3 border-2 border-slate-200 rounded-xl text-base bg-white/80 focus:border-indigo-500 focus:bg-white transform transition-all duration-300 focus:translate-y-[-2px] focus:shadow-lg placeholder:text-slate-400 outline-none"/>
        </div>

        
        <div className="relative mb-4">
          <label className="block text-slate-700 text-sm font-semibold mb-2">Password</label>
          <input onChange={((e)=>setPassword(e.target.value))} type="password" placeholder="••••••••" className="w-full p-3 border-2 border-slate-200 rounded-xl text-base bg-white/80 focus:border-indigo-500 focus:bg-white transform transition-all duration-300 focus:translate-y-[-2px] focus:shadow-lg placeholder:text-slate-400 outline-none"/>
          <button className="absolute right-3 top-2/3 -translate-y-1/2 text-slate-400 hover:text-indigo-500">
            👁️
          </button>
        </div>

      
        <div className="flex items-center justify-between text-sm mb-6">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4 accent-indigo-500"/>
            <span className="text-slate-600">Remember me</span>
          </label>
          <a href="#" className="text-indigo-500 hover:text-violet-500 font-medium">Forgot password?</a>
        </div>

       
        <button  onClick={()=>handleSignup()} className="w-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white p-4 rounded-xl font-semibold relative overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-2xl active:translate-y-0">
          Sign Up
          <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-500 hover:left-[100%]"></span>
        </button>

       
        <div className="relative text-center my-4 text-slate-400 text-sm">
          <span className="bg-white/95 px-4 relative z-10">Or sign up with</span>
          <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-200 -z-10"></div>
        </div>

      
        <div className="flex gap-3 mb-4">
          <a onClick={() => signIn("google")} href="#" className="flex-1 flex items-center justify-center gap-2 p-3 border-2 border-slate-200 rounded-xl bg-white/80 text-slate-600 font-medium hover:border-indigo-500 hover:bg-white transform hover:-translate-y-1 hover:shadow-lg transition">
            <img  src="/google.svg" className="w-5 h-5"/> Google 
          </a>
          <a onClick={() => signIn("twitter")} href="#" className="flex-1 flex items-center justify-center gap-2 p-3 border-2 border-slate-200 rounded-xl bg-white/80 text-slate-600 font-medium hover:border-indigo-500 hover:bg-white transform hover:-translate-y-1 hover:shadow-lg transition">
            <img src="/facebook.svg" className="w-5 h-5"/> X 
          </a>
        </div>

       
        <div className="text-center mt-4">
          <p className="text-slate-500 text-sm">
            Already have an account?
            <span className="text-indigo-500 font-semibold cursor-pointer hover:text-violet-500">Login</span>
          </p>
        </div>
      </div>

     
      <div className="absolute w-full min-h-[680px] backface-hidden bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl flex flex-col rotate-y-180 animate-fadeInUp">
      
      </div>

    </div>
  </div>
</div>


    </div>
  )
}

