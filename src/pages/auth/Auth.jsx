import React, { useContext, useEffect, useState } from "react";
import Register from "./Register";
import Login from "./Login";
import { AuthContext } from "@/contexts/Auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Auth = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      toast.info("You're logged in. Redirecting to home page...", {
        toastId: "auth-redirect-msg",
      });

      const timer = setTimeout(() => {
        navigateTo("/");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigateTo]);

  if (isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <p className="text-xl font-medium text-gradient">
          You're logged in. Redirecting to home page...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-black p-4 rounded-lg shadow-lg mt-15">
        {/* login-register toggle */}
        <div className="flex justify-center mb-1 pt-15">
          <button
            className={`px-4 py-2 font-semibold rounded-l-lg ${
              isLogin
                ? "bg-gradient-to-r from-[#B8A171] to-[#FFF2CC] text-black"
                : "bg-[#434242] text-white"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 font-semibold rounded-r-lg ${
              !isLogin
                ? "bg-gradient-to-r from-[#B8A171] to-[#FFF2CC] text-black"
                : "bg-[#434242] text-white"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>
        {isLogin ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default Auth;
