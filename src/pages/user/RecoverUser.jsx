import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import PrimaryButton from "@components/buttons/PrimaryButton";
import IconINDFlag from "@assets/icons/IconINDFlag.svg?react";

const RecoverUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recoverySuccess, setRecoverySuccess] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleRecoverAccount = async (data) => {
    setIsLoading(true);
    try {
      const baseURL =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

      const payload = {
        phone: `+91${data.phone}`,
        password: data.password,
      };

      const response = await axios.put(
        `${baseURL}/api/v1/user/me/recover`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setRecoverySuccess(true);
        reset();

        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate("/auth");
        }, 3000);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to recover account. Please try again.";

      if (error.response?.status === 404) {
        toast.error("Account not found or not eligible for recovery");
      } else if (error.response?.status === 401) {
        toast.error("Invalid credentials");
      } else if (error.response?.status === 403) {
        toast.error(
          "Recovery window expired. Please contact support for assistance."
        );
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (recoverySuccess) {
    return (
      <div className="min-h-screen w-full bg-background text-white flex flex-col items-center justify-center px-4">
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
            Account Recovered!
          </h2>
          <p className="text-gray-400 mb-6">
            Your account has been successfully recovered. You will be redirected
            to the login page in a few seconds.
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
    <div className="min-h-screen w-full bg-background text-white flex flex-col items-center justify-center px-4">
      <div className="bg-black rounded-[0.3rem] px-6 sm:px-8 md:px-10 py-6 w-[90%] max-w-md mx-auto border border-[#B8A171]">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Recover Account
          </h2>
          <p className="text-gray-400">
            Enter your phone number and password to recover your deleted
            account. You have 72 hours from deletion request to recover your
            account.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleRecoverAccount)}
          className="space-y-4"
        >
          <div className="w-full">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-400 mb-1 text-left"
            >
              Phone Number
            </label>
            <div className="flex items-center justify-center bg-gradient-to-r from-[#FFE3E5] to-[#BB878B] p-[1px] rounded-[0.3rem] h-12">
              <span className="flex py-2 px-2 items-center justify-center bg-black rounded-l-[0.3rem] h-full">
                <IconINDFlag />
                <span className="text-gray-400 ml-1">+91</span>
              </span>
              <input
                className="w-full bg-black h-full text-white px-2 rounded-r-[0.3rem] focus:outline-none focus:ring-2 focus:ring-[#B8A171]"
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter Phone number"
                required
                {...register("phone", {
                  required: "Phone is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit number",
                  },
                })}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-400 mb-1 text-left"
            >
              Password
            </label>
            <div className="flex items-center justify-center bg-gradient-to-r from-[#FFE3E5] to-[#BB878B] p-[1px] rounded-[0.3rem] h-12">
              <input
                className="w-full bg-black h-full text-white px-3 rounded-[0.3rem] focus:outline-none focus:ring-2 focus:ring-[#B8A171]"
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                {...register("password", {
                  required: "Password is required",
                })}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="bg-yellow-900/20 border border-yellow-400/20 rounded p-3 text-sm text-yellow-400">
            <p className="font-semibold mb-1">⚠️ Recovery Window</p>
            <p>
              You can only recover your account within 72 hours of deletion
              request. After this period, please contact support.
            </p>
          </div>

          <PrimaryButton
            className="w-full py-2 rounded-full"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Recovering..." : "Recover Account"}
          </PrimaryButton>

          <div className="text-center mt-4 space-y-2">
            <Link
              to="/auth"
              className="block text-[#B8A171] hover:text-[#FFF2CC] transition-colors"
            >
              Back to Login
            </Link>
            <p className="text-sm text-gray-400">
              Need help? Contact our support team
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecoverUser;
