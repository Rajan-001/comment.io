import { motion } from "framer-motion";
import { Mail, X, LogIn } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function SignInModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      {/* Background fade-in */}
      <motion.div
        className="bg-white rounded-3xl shadow-2xl p-8 w-[400px] relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">
          Sign In Required
        </h2>
        <p className="text-gray-600 text-center mb-6 text-sm">
          🚀 You’ve reached your free daily limit. Sign in to unlock unlimited access!
        </p>

        {/* Sign in with Email */}
        <button className="w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition font-medium shadow-sm">
          <Mail className="w-5 h-5" /> Sign in with Email
        </button>

        {/* OR Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 h-[1px] bg-gray-200"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>

        {/* Sign in with Google */}
        <button className="w-full bg-gray-100 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition font-medium border shadow-sm">
          <FcGoogle className="w-5 h-5" /> Sign in with Google
        </button>

        {/* Footer */}
        <div className="mt-5 text-center text-xs text-gray-400">
          By signing in, you agree to our{" "}
          <a href="/terms" className="text-blue-500 hover:underline">
            Terms
          </a>{" "}
          &{" "}
          <a href="/privacy" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>
          .
        </div>
      </motion.div>
    </div>
  );
}
