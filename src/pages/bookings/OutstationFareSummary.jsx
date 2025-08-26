import React from "react";
import { useLocation } from "react-router-dom";
import CarFareSummary from "../../components/forms/carFareSummary";

const OutstationFareSummary = () => {
  const location = useLocation();
  const { fareData } = location.state || {};

  if (!fareData) {
    return (
      <div className="bg-black text-white min-h-screen font-sans p-4 sm:p-6 lg:p-8 mt-[5.5rem]">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl text-red-500 mb-4">
            Error: Missing Fare Data
          </h1>
          <p className="text-gray-300 mb-6">
            No fare information found. Please try booking again.
          </p>
          <a
            href="/outstation-trips"
            className="px-6 py-3 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
          >
            Back to Outstation Booking
          </a>
        </div>
      </div>
    );
  }

  return <CarFareSummary fareData={fareData} />;
};

export default OutstationFareSummary;
