import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/layouts/Navbar";
import CarFareSummary from "@/components/forms/carFareSummary";
import Footer from "@/layouts/Footer";

const FareSummary = () => {
  const location = useLocation();
  const fareData = location.state?.fareData;

  // If no fare data, redirect back to home or show error
  if (!fareData) {
    return (
      <div className="relative overflow-hidden bg-background">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">No Fare Data Found</h1>
            <p className="mb-4">Please go back and calculate the fare first.</p>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-[#B8A171] text-black rounded-lg font-semibold hover:opacity-90"
            >
              Go Back
            </button>
          </div>
        </div>
        <Footer bgColor={"bg-[#1A1A1A]"} />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-background">
      <Navbar />
      <CarFareSummary fareData={fareData} />
      <Footer bgColor={"bg-[#1A1A1A]"} />
    </div>
  );
};

export default FareSummary;
