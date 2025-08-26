import React, { useContext, useState, useRef, useEffect } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "@/contexts/Auth";
import PrimaryButton from "@/components/buttons/PrimaryButton";

const OtpVerification = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(AuthContext);
  const { email, phone } = useParams();
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    if (!/^\d+$/.test(pastedText)) {
      return;
    }
    const newOtp = pastedText.slice(0, otp.length).split("");
    while (newOtp.length < otp.length) {
      newOtp.push("");
    }
    setOtp(newOtp);
    const focusIndex = Math.min(pastedText.length, otp.length - 1);
    if (inputRefs.current[focusIndex]) {
      inputRefs.current[focusIndex].focus();
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 5) {
      toast.error("Please enter a valid 5-digit OTP.");
      return;
    }

    const baseURL =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

    const data = {
      email,
      otp: Number(enteredOtp),
      phone,
    };

    console.log("Verifying OTP with data:", data);

    await axios
      .post(`${baseURL}/api/v1/user/otp-verify`, data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(true);
        setUser(res.data.user);
      })
      .catch((err) => {
        toast.error(err.response.data.message || "OTP verification failed");
        setIsAuthenticated(false);
        setUser(null);
      });
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <div className="bg-[#262626] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gradient mb-2">
          OTP Verification
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Enter the 5-digit OTP sent to your registered phone.
        </p>
        <form onSubmit={handleOtpVerification} className="flex flex-col gap-6">
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                ref={(el) => (inputRefs.current[index] = el)}
                id={`otp-input-${index}`}
                type="text"
                maxLength="1"
                key={index}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center text-2xl bg-[#434242] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB878B]"
              />
            ))}
          </div>
          <PrimaryButton type="submit" className="w-full py-3 rounded-full">
            Verify OTP
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
