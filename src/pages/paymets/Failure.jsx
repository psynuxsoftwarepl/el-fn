import React from "react";

const Failure = ({ error }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-red-500 mb-2">Payment Failed</h1>
        <p className="text-gray-400 text-lg">
          We couldn't process your payment
        </p>
      </div>

      <div className="bg-black border border-red-800 rounded-lg p-6 space-y-6">
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-red-400 font-semibold">Error Details</p>
          </div>
          <p className="text-red-300 text-sm">
            {error || "An unknown error occurred during payment processing"}
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">What you can do:</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-[#B8A171] mt-1">•</span>
              <span>Check your payment details and try again</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#B8A171] mt-1">•</span>
              <span>Ensure you have sufficient balance in your account</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#B8A171] mt-1">•</span>
              <span>Contact your bank if the issue persists</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#B8A171] mt-1">•</span>
              <span>Reach out to our support team for assistance</span>
            </li>
          </ul>
        </div>

        <div className="pt-4 border-t border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-[#B8A171]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <p className="text-[#B8A171] font-semibold">Need Help?</p>
          </div>
          <p className="text-gray-400 text-sm">
            Contact our support team at{" "}
            <span className="text-[#B8A171]">+91-89558745852</span> or email us
            for assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Failure;
