import React, { useState } from "react";
import PrimaryButton from "../buttons/PrimaryButton";

const CabBookingForm = () => {
  const [tripType, setTripType] = useState("one-way");
  const [formData, setFormData] = useState({
    location: "",
    pickUp: "",
    dropOff: "",
    departureTime: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="my-container mb-20 flex justify-center">
      <div className="flex flex-col-reverse md:flex-row md:items-start md:justify-center gap-10 md:gap-20 w-full max-w-5xl">
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center max-w-md">
          <h2 className="text-gradient text-2xl sm:text-3xl font-bold mb-4 text-center">
            Luxury Cars
          </h2>
          <div className="w-full bg-gradient-to-r from-[#FFE3E5] to-[#BB878B] p-[2px] rounded-[0.5rem] shadow-lg">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-4 w-full bg-[#2F2F2F] rounded-[0.5rem] py-8 px-4 sm:px-8"
            >
              <h1 className="text-gradient text-base sm:text-lg font-semibold mb-1 text-center">
                Book dedicated cabs to popular destinations with a chauffeur
                that stays with you throughout.
              </h1>

              <div className="flex w-full bg-[#1A1A1A] p-[2px] rounded-lg">
                <button
                  type="button"
                  className={`flex-1 py-2 rounded-l-lg text-sm sm:text-base transition-all duration-300 ${
                    tripType === "one-way"
                      ? "btn-gradient text-black font-semibold"
                      : "bg-black text-gradient"
                  }`}
                  onClick={() => setTripType("one-way")}
                >
                  One Way
                </button>
                <button
                  type="button"
                  className={`flex-1 py-2 rounded-r-lg text-sm sm:text-base transition-all duration-300 ${
                    tripType === "round-trip"
                      ? "btn-gradient text-black font-semibold"
                      : "bg-black text-gradient"
                  }`}
                  onClick={() => setTripType("round-trip")}
                >
                  Round Trip
                </button>
              </div>

              <div className="w-full">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-gradient text-xs">
                    Location
                  </label>
                  <button
                    type="button"
                    className="text-gradient text-sm font-medium"
                  >
                    + Add Stop
                  </button>
                </div>
                <div className="flex items-center justify-center bg-gradient-to-r from-[#FFE3E5] to-[#BB878B] p-[1px] rounded-[0.3rem] w-full">
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full py-2 px-4 bg-black text-[#FFE3E5] rounded-[0.3rem] focus:outline-none focus:ring-2 focus:ring-[#BB878B] text-base placeholder:text-gradient"
                    placeholder="Pick-up Location"
                  />
                </div>
              </div>

              <div className="w-full">
                <label className="block mb-1 text-gradient text-xs">
                  Drop-off
                </label>
                <div className="flex items-center justify-center bg-gradient-to-r from-[#FFE3E5] to-[#BB878B] p-[1px] rounded-[0.3rem] w-full">
                  <input
                    type="text"
                    name="dropOff"
                    value={formData.dropOff}
                    onChange={handleChange}
                    className="w-full py-2 px-4 bg-black text-[#FFE3E5] rounded-[0.3rem] focus:outline-none focus:ring-2 focus:ring-[#BB878B] text-base placeholder:text-gradient"
                    placeholder="Drop-off"
                  />
                </div>
              </div>

              <div className="w-full">
                <label className="block mb-1 text-gradient text-xs">
                  Date and Time
                </label>
                <div className="flex items-center justify-center bg-gradient-to-r from-[#FFE3E5] to-[#BB878B] p-[1px] rounded-[0.3rem] w-full">
                  <input
                    type="datetime-local"
                    name="departureTime"
                    value={formData.departureTime}
                    onChange={handleChange}
                    className="w-full py-2 px-4 bg-black text-[#FFE3E5] rounded-[0.3rem] focus:outline-none focus:ring-2 focus:ring-[#BB878B] text-base [color-scheme:dark]"
                  />
                </div>
                <p className="text-gradient text-xs mt-1">
                  Please book at least 2 hrs in advance.
                </p>
              </div>

              <PrimaryButton
                type="submit"
                className="w-full py-2 rounded-full text-lg font-semibold mt-3"
              >
                Check Fare
              </PrimaryButton>
            </form>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-start text-center md:text-left px-2 md:px-0">
          <h2 className="text-gradient mb-6 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
            Comfortable rides, scenic views.
          </h2>
          <p className="mt-2 text-sm font-normal text-foreground sm:text-base md:text-lg lg:text-xl max-w-xl">
            Planning a gateway? Leave the driving to us. just sit back relax and
            soak in the views.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CabBookingForm;
