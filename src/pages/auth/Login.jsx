import { AuthContext } from "@/contexts/Auth";
import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import IconINDFlag from "@assets/icons/IconINDFlag.svg?react";
import PrimaryButton from "@components/buttons/PrimaryButton";

const Login = () => {
  const { setIsAuthenticated, setUser } = useContext(AuthContext);

  const navigateTo = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    const baseURL =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

    const payload = {
      ...data,
      phone: `+91${data.phone}`,
    };

    console.log("Registering user with payload:", payload);

    await axios
      .post(`${baseURL}/api/v1/user/login`, payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(true);
        setUser(res.data.user);
        reset();
        navigateTo("/");
      })
      .catch((error) => {
        // console.log("in catch block");
        toast.error(
          error?.response?.data?.message ||
            "Login failed Network Error, please try again!"
        );
        reset();
      });
  };

  return (
    <>
      <form
        className="flex flex-col items-center gap-4 bg-black rounded-[0.3rem] px-6 sm:px-8 md:px-10 py-6 w-[90%] max-w-md mx-auto border border-[#B8A171]"
        onSubmit={handleSubmit((data) => handleLogin(data))}
      >
        {/* input and btn */}
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
        </div>
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
        <div className="w-full">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-400 mb-1 text-left"
          >
            Password
          </label>
          <div className="flex items-center justify-center bg-gradient-to-r from-[#FFE3E5] to-[#BB878B] p-[1px] rounded-[0.3rem] h-12">
            <input
              className="w-full bg-black h-full text-white px-2 rounded-[0.3rem] focus:outline-none focus:ring-2 focus:ring-[#B8A171]"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              {...register("password")}
            />
          </div>
        </div>

        <p className="w-full text-right">
          <Link to={"/auth/password/forgot"} className="text-foreground">
            Forgot Password?
          </Link>
        </p>

        <PrimaryButton className={"w-full py-2 rounded-full"} type="submit">
          Login
        </PrimaryButton>
      </form>
    </>
  );
};

export default Login;
