import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import PrimaryButton from "@components/buttons/PrimaryButton";

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const handleResetPassword = async (data) => {
    setIsLoading(true);
    try {
      const baseURL =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

      const response = await axios.put(
        `${baseURL}/api/v1/user/password/reset/${token}`,
        {
          password: data.password,
          confirmPassword: data.confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setResetSuccess(true);
        reset();

        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate("/auth");
        }, 3000);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to reset password. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (resetSuccess) {
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
          <h2 className="text-2xl font-bold text-white mb-2">
            Password Reset Successful!
          </h2>
          <p className="text-gray-400 mb-6">
            Your password has been successfully reset. You will be redirected to
            the login page in a few seconds.
          </p>
          <Link
            to="/auth"
            className="inline-block w-full py-2 px-4 bg-gradient-to-r from-[#B8A171] to-[#FFF2CC] text-black rounded-full font-semibold hover:from-[#A67B5B] hover:to-[#E6D9B7] transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="bg-black rounded-[0.3rem] px-6 sm:px-8 md:px-10 py-6 w-[90%] max-w-md mx-auto border border-[#B8A171]">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
          <p className="text-gray-400">Enter your new password below.</p>
        </div>

        <form
          onSubmit={handleSubmit(handleResetPassword)}
          className="space-y-4"
        >
          <div className="w-full">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-400 mb-1 text-left"
            >
              New Password
            </label>
            <div className="flex items-center justify-center bg-gradient-to-r from-[#FFE3E5] to-[#BB878B] p-[1px] rounded-[0.3rem] h-12">
              <input
                className="w-full bg-black h-full text-white px-3 rounded-[0.3rem] focus:outline-none focus:ring-2 focus:ring-[#B8A171]"
                type="password"
                id="password"
                name="password"
                placeholder="Enter new password"
                required
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                  },
                })}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-400 mb-1 text-left"
            >
              Confirm New Password
            </label>
            <div className="flex items-center justify-center bg-gradient-to-r from-[#FFE3E5] to-[#BB878B] p-[1px] rounded-[0.3rem] h-12">
              <input
                className="w-full bg-black h-full text-white px-3 rounded-[0.3rem] focus:outline-none focus:ring-2 focus:ring-[#B8A171]"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm new password"
                required
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <PrimaryButton
            className="w-full py-2 rounded-full"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Password"}
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

export default ResetPassword;
