import React from "react";
import { FaUserFriends, FaSuitcase } from "react-icons/fa";
import { toast } from "react-toastify";

const GuestModal = ({
  isOpen,
  onClose,
  passengers,
  suitcases,
  setPassengers,
  setSuitcases,
  onSubmit,
}) => {
  if (!isOpen) return null;

  const increment = (type) => {
    if (type === "passengers") {
      setPassengers((prev) => Math.min(prev + 1, 5));
    } else {
      setSuitcases((prevSuitcases) => {
        if (passengers === 5 && prevSuitcases >= 2) {
          toast.error("Max suitcases allowed for 5 passengers is now 2", {
            toastId: "suitcase-limit",
          });
          return 2;
        }
        return Math.min(prevSuitcases + 1, 4);
      });
    }
  };

  const decrement = (type) => {
    if (type === "passengers") {
      setPassengers((prev) => Math.max(prev - 1, 1));
    } else {
      setSuitcases((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1C1C1C] text-white rounded-lg w-[90%] max-w-md p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Guest Info</h2>
        <button onClick={onClose} className="absolute top-4 right-4 text-xl font-bold">
          ×
        </button>

        <div className="space-y-4">
          {/* Passengers */}
          <div className="flex justify-between items-center border-b border-gray-700 pb-4">
            <div className="flex items-center gap-2">
              <FaUserFriends className="text-white" />
              <span className="text-sm sm:text-base">Passengers</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => decrement("passengers")}
                className="text-lg font-bold px-2 py-1 border border-white rounded-md"
              >
                −
              </button>
              <span>{passengers}</span>
              <button
                onClick={() => increment("passengers")}
                className="text-lg font-bold px-2 py-1 border border-white rounded-md"
              >
                +
              </button>
            </div>
          </div>

          {/* Suitcases */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FaSuitcase className="text-white" />
              <span className="text-sm sm:text-base">Suitcases</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => decrement("suitcases")}
                className="text-lg font-bold px-2 py-1 border border-white rounded-md"
              >
                −
              </button>
              <span>{suitcases}</span>
              <button
                onClick={() => increment("suitcases")}
                className="text-lg font-bold px-2 py-1 border border-white rounded-md"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-300 mt-4">
         Our EVs comfortably seat 3–5 passengers and can accommodate up to 4 large suitcases. Sharing these details helps us assign the ideal vehicle for your ride.
        </p>

        <button
          onClick={onSubmit}
          className="mt-6 w-full bg-gradient-to-r from-[#B8A171] to-[#BDA97F] text-black py-2 rounded-full font-semibold"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default GuestModal;
