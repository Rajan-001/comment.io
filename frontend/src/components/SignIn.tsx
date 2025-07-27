// SignInModal.tsx
export default function SignInModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-96 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✕
        </button>

        {/* Modal Content */}
        <h2 className="text-xl font-semibold mb-4 text-center">
          Sign In Required
        </h2>
        <p className="text-gray-600 text-center mb-6">
          You’ve reached your free daily limit. Please sign in to continue.
        </p>

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Sign in with Email
        </button>

        <button className="w-full mt-3 bg-gray-100 py-2 rounded-lg hover:bg-gray-200">
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
