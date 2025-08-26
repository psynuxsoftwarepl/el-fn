import React from "react";

const Success = ({
  razorpay_payment_id,
  razorpay_order_id,
  userId,
  bookingData,
}) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B8A171] to-[#FFF2CC] mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-400 text-lg">
          Your booking has been confirmed successfully
        </p>
      </div>

      <div className="bg-black border border-gray-800 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-white mb-4">
          Payment Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {razorpay_payment_id && (
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Payment ID</p>
              <p className="text-white font-mono text-sm break-all">
                {razorpay_payment_id}
              </p>
            </div>
          )}

          {razorpay_order_id && (
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Order ID</p>
              <p className="text-white font-mono text-sm break-all">
                {razorpay_order_id}
              </p>
            </div>
          )}

          {userId && (
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">User ID</p>
              <p className="text-white font-mono text-sm">{userId}</p>
            </div>
          )}

          {bookingData?.bookingId && (
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Booking ID</p>
              <p className="text-white font-mono text-sm">
                {bookingData.bookingId}
              </p>
            </div>
          )}
        </div>

        {bookingData && (
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">
              Booking Summary
            </h3>
            <div className="space-y-3">
              {bookingData.serviceType && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Service Type</span>
                  <span className="text-white capitalize">
                    {bookingData.serviceType}
                  </span>
                </div>
              )}

              {bookingData.amount && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount Paid</span>
                  <span className="text-[#B8A171] font-semibold">
                    ₹{(bookingData.amount / 100).toFixed(0)}
                  </span>
                </div>
              )}

              {bookingData.pickupLocation && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Pickup</span>
                  <span className="text-white text-right max-w-xs truncate">
                    {bookingData.pickupLocation}
                  </span>
                </div>
              )}

              {bookingData.dropLocation && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Drop-off</span>
                  <span className="text-white text-right max-w-xs truncate">
                    {bookingData.dropLocation}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-green-900/20 border border-green-500/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-green-400 font-semibold">What's Next?</p>
          </div>
          <ul className="text-green-300 text-sm space-y-1">
            <li>• You'll receive a confirmation email shortly</li>
            <li>• Your driver will contact you before pickup</li>
            <li>• You can track your booking in the "My Bookings" section</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Success;
