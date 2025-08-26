import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../utils/api";
import Success from "./Success";
import Failure from "./Failure";

const PaymentStatus = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [status, setStatus] = useState(null); // null: loading, true: success, false: failure
  const [paymentData, setPaymentData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [countdown, setCountdown] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      const token = searchParams.get("token");
      const error = searchParams.get("error");

      // If there's an error parameter, set failure status
      if (error) {
        setStatus(false);
        setErrorMessage(decodeURIComponent(error));
        setIsLoading(false);
        return;
      }

      // If no token, redirect to bookings after state update
      if (!token) {
        toast.error("Invalid payment verification request");
        setStatus(false);
        setErrorMessage("Invalid payment verification request");
        setIsLoading(false);
        // Use setTimeout to avoid setState during render
        setTimeout(() => {
          navigate("/user/bookings");
        }, 0);
        return;
      }

      try {
        // Call the backend API to verify payment token
        const response = await api.post(
          "/api/v1/bookings/verify-payment-token",
          {
            token: token,
          }
        );

        if (response.data.success) {
          setStatus(true);
          setPaymentData(response.data.data);
        } else {
          setStatus(false);
          setErrorMessage(
            response.data.message || "Payment verification failed"
          );
        }
      } catch (err) {
        console.error("Payment verification error:", err);
        setStatus(false);

        let errorMsg = "Payment verification failed. Please try again.";
        if (err.response?.status === 400) {
          errorMsg = err.response.data.message || "Invalid payment token";
        } else if (err.response?.status === 404) {
          errorMsg = "Payment not found";
        } else if (err.response?.status === 500) {
          errorMsg = "Server error - please contact support";
        } else if (!navigator.onLine) {
          errorMsg = "No internet connection";
        }

        setErrorMessage(errorMsg);
        toast.error(errorMsg);
      } finally {
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  useEffect(() => {
    // Start countdown when status is determined
    if (status !== null && !isLoading) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate("/user/bookings");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [status, isLoading, navigate]);

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-black text-white min-h-screen font-sans flex items-center justify-center mt-[5.5rem]">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#B8A171] border-t-transparent mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B8A171] to-[#FFF2CC] mb-4">
            Verifying Payment
          </h2>
          <p className="text-gray-400">
            Please wait while we verify your payment...
          </p>
        </div>
      </div>
    );
  }

  // Success state
  if (status === true) {
    return (
      <div className="bg-black text-white min-h-screen font-sans mt-[5.5rem]">
        <div className="max-w-4xl mx-auto p-6">
          <Success
            razorpay_payment_id={paymentData?.razorpay_payment_id}
            razorpay_order_id={paymentData?.razorpay_order_id}
            userId={paymentData?.userId}
            bookingData={paymentData}
          />

          <div className="mt-8 text-center">
            <div className="bg-black border border-gray-800 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-gray-400 text-sm mb-2">
                Redirecting to your bookings in
              </p>
              <div className="text-3xl font-bold text-[#B8A171] mb-4">
                {countdown}
              </div>
              <button
                onClick={() => navigate("/user/bookings")}
                className="w-full bg-[linear-gradient(132.73deg,#B8A171_0%,#FFF2CC_100%)] text-black font-bold py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                View My Bookings
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Failure state
  if (status === false) {
    return (
      <div className="bg-black text-white min-h-screen font-sans mt-[5.5rem]">
        <div className="max-w-4xl mx-auto p-6">
          <Failure error={errorMessage} />

          <div className="mt-8 text-center">
            <div className="bg-black border border-red-800 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-gray-400 text-sm mb-2">
                Redirecting to your bookings in
              </p>
              <div className="text-3xl font-bold text-red-500 mb-4">
                {countdown}
              </div>
              <button
                onClick={() => navigate("/user/bookings")}
                className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors mb-3"
              >
                View My Bookings
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full bg-gray-700 text-white font-bold py-3 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback state (shouldn't reach here normally)
  return (
    <div className="bg-black text-white min-h-screen font-sans flex items-center justify-center mt-[5.5rem]">
      <div className="max-w-md mx-auto text-center p-8">
        <div className="bg-black border border-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B8A171] to-[#FFF2CC] mb-4">
            Payment Status Unknown
          </h2>
          <p className="text-gray-400 mb-6">
            We couldn't determine your payment status. Please check your
            bookings or contact support.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/user/bookings")}
              className="w-full bg-[linear-gradient(132.73deg,#B8A171_0%,#FFF2CC_100%)] text-black font-bold py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              View My Bookings
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full bg-gray-700 text-white font-bold py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;
