import { AuthContext } from "@/contexts/Auth";
import axios from "axios";
import React, { useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import IconINDFlag from "@assets/icons/IconINDFlag.svg?react";
import PrimaryButton from "@components/buttons/PrimaryButton";

const Register = () => {
  const { setIsAuthenticated, setUser } = useContext(AuthContext);

  const navigateTo = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const handleRegister = async (data) => {
    const baseURL =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

    const { confirmPassword, ...payload } = data;
    payload.phone = `+91${payload.phone}`;

    console.log("Registering user with payload:", payload);

    await axios
      .post(`${baseURL}/api/v1/user/register`, payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        // setIsAuthenticated(true);
        // setUser(res.data.user);
        reset();
        navigateTo(`/auth/otp-verify/${payload.email}/${payload.phone}`);
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message ||
            "Registration failed Network Error, please try again!"
        );
      });
  };

  return (
    <>
      <form
        className="flex flex-col items-center gap-4 bg-black rounded-[0.3rem] px-6 sm:px-8 md:px-10 py-6 w-[90%] max-w-md mx-auto border border-[#B8A171]"
        onSubmit={handleSubmit((data) => handleRegister(data))}
      >
        <div className="w-full">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-400 mb-1 text-left"
          >
            Name
          </label>
          <div className="flex items-center justify-center bg-gradient-to-r from-[#B8A171] to-[#FFF2CC] p-[1px] rounded-[0.3rem] h-12">
            <input
              className="w-full bg-black h-full text-white px-2 rounded-[0.3rem] focus:outline-none focus:ring-2 focus:ring-[#B8A171]"
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              required
              {...register("name", { required: "Name is required" })}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="w-full">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-400 mb-1 text-left"
          >
            Email
          </label>
          <div className="flex items-center justify-center bg-gradient-to-r from-[#B8A171] to-[#FFF2CC] p-[1px] rounded-[0.3rem] h-12">
            <input
              className="w-full bg-black h-full text-white px-2 rounded-[0.3rem] focus:outline-none focus:ring-2 focus:ring-[#B8A171]"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email address",
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="w-full">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-400 mb-1 text-left"
          >
            Phone Number
          </label>
          <div className="flex items-center justify-center bg-gradient-to-r from-[#B8A171] to-[#FFF2CC] p-[1px] rounded-[0.3rem] h-12">
            <span className="flex py-2 px-2 items-center justify-center bg-black rounded-l-[0.3rem] h-full">
              <IconINDFlag />
              <span className="text-gray-400 ml-1">+91</span>
            </span>
            <input
              className="w-full bg-black h-full text-white px-2 rounded-r-[0.3rem] focus:outline-none focus:ring-2 focus:ring-[#B8A171]"
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter 10-digit number"
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
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div className="w-full">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-400 mb-1 text-left"
          >
            Password
          </label>
          <div className="flex items-center justify-center bg-gradient-to-r from-[#B8A171] to-[#FFF2CC] p-[1px] rounded-[0.3rem] h-12">
            <input
              className="w-full bg-black h-full text-white px-2 rounded-[0.3rem] focus:outline-none focus:ring-2 focus:ring-[#B8A171]"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
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
            Confirm Password
          </label>
          <div className="flex items-center justify-center bg-gradient-to-r from-[#B8A171] to-[#FFF2CC] p-[1px] rounded-[0.3rem] h-12">
            <input
              className="w-full bg-black h-full text-white px-2 rounded-[0.3rem] focus:outline-none focus:ring-2 focus:ring-[#B8A171]"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              required
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password.current || "The passwords do not match",
              })}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <PrimaryButton className={"w-full py-2 rounded-full"} type="submit">
          Register
        </PrimaryButton>
      </form>
    </>
  );
};

export default Register;
