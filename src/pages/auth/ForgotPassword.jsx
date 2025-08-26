import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import PrimaryButton from "@components/buttons/PrimaryButton";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleForgotPassword = async (data) => {
    setIsLoading(true);
    try {
      const baseURL =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

      const response = await axios.post(
        `${baseURL}/api/v1/user/password/forgot`,
        { email: data.email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setEmailSent(true);
        reset();
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send reset email. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="bg-black rounded-[0.3rem] px-6 sm:px-8 md:px-10 py-8 w-[90%] max-w-md mx-auto border border-[#B8A171] text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#B8A171] to-[#FFF2CC] rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-black"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Email Sent!</h2>
          <p className="text-gray-400 mb-6">
            We've sent a password reset link to your email address. Please check
            your inbox and follow the instructions to reset your password.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => setEmailSent(false)}
              className="w-full py-2 px-4 bg-[#1a1a1a] text-white rounded-full border border-[#B8A171] hover:bg-[#B8A171] hover:text-black transition-colors"
            >
              Send Another Email
            </button>
            <Link
              to="/auth"
              className="block w-full py-2 px-4 text-center text-[#B8A171] hover:text-[#FFF2CC] transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="bg-black rounded-[0.3rem] px-6 sm:px-8 md:px-10 py-6 w-[90%] max-w-md mx-auto border border-[#B8A171]">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Forgot Password?
          </h2>
          <p className="text-gray-400">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleForgotPassword)}
          className="space-y-4"
        >
          <div className="w-full">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400 mb-1 text-left"
            >
              Email Address
            </label>
            <div className="flex items-center justify-center bg-gradient-to-r from-[#FFE3E5] to-[#BB878B] p-[1px] rounded-[0.3rem] h-12">
              <input
                className="w-full bg-black h-full text-white px-3 rounded-[0.3rem] focus:outline-none focus:ring-2 focus:ring-[#B8A171]"
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                required
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <PrimaryButton
            className="w-full py-2 rounded-full"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </PrimaryButton>

          <div className="text-center mt-4">
            <Link
              to="/auth"
              className="text-[#B8A171] hover:text-[#FFF2CC] transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
