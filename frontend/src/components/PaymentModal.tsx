// PaymentModal.tsx
export default function PaymentModal({ onClose }: { onClose: () => void }) {
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
          Upgrade Required
        </h2>
        <p className="text-gray-600 text-center mb-6">
          You’ve used your free daily limit. Upgrade to get unlimited analysis.
        </p>

        <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
          Upgrade Now
        </button>
      </div>
    </div>
  );
}
