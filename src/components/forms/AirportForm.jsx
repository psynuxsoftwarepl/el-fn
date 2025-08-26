import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPlaneDeparture,
  FaPlaneArrival,
  FaCalendarAlt,
  FaUserFriends,
} from "react-icons/fa";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import GuestModal from "../modals/GuestModal";


const AirportForm = () => {
  const [passengers, setPassengers] = useState(2);
  const [suitcases, setSuitcases] = useState(2);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [tripType, setTripType] = useState("to-airport");
  const [formData, setFormData] = useState({
    pickUpLocation: "",
    airport: "",
    terminal: "T1",
    departureTime: "",
    flightNumber: "",
    guests: "2",
    roundTrip: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const renderRoundTripSection = () => {
  if (!formData.roundTrip) return null;

  if (tripType === "to-airport") {
    return (
      <>
        <div className="w-full">
          <label className="text-white font-bold text-sm flex items-center gap-2 mb-1 -ml-1">
            <FaMapMarkerAlt /> Return Drop-off Location
          </label>
          <input
            type="text"
            name="returnDropLocation"
            placeholder="Return Drop-off"
            className="w-full px-4 py-2 bg-black border border-white rounded-md text-white placeholder-gray-400"
          />
          <label className="text-white font-bold text-sm flex items-center gap-2 mt-4 mb-1 -ml-1">
            <FaCalendarAlt /> Return Date and Time
          </label>
          <input
            type="datetime-local"
            name="returnTime"
            className="w-full px-4 py-2 bg-black border border-white rounded-md text-white [color-scheme:dark]"
          />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="w-full">
          <label className="text-white font-bold text-sm flex items-center gap-2 mb-1 -ml-1">
            <FaMapMarkerAlt /> Return Pick-up Location
          </label>
          <input
            type="text"
            name="returnPickUpLocation"
            placeholder="Return Pick-up"
            className="w-full px-4 py-2 bg-black border border-white rounded-md text-white placeholder-gray-400"
          />
          <label className="text-white font-bold text-sm flex items-center gap-2 mt-4 mb-1 -ml-1">
            <FaCalendarAlt /> Return Date and Time
          </label>
          <input
            type="datetime-local"
            name="returnTime"
            className="w-full px-4 py-2 bg-black border border-white rounded-md text-white [color-scheme:dark]"
          />
        </div>
      </>
    );
  }
};


  return (
    <>
    <div className="my-container mt-30 mb-20 flex justify-center">
      <div className="flex flex-col-reverse md:flex-row md:items-start md:justify-center gap-10 md:gap-20 w-full max-w-5xl">
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center max-w-md">
          <h2 className="text-white text-2xl sm:text-3xl font-bold mb-4 text-center">
            Airport Transfers
          </h2>

          <div className="w-full border border-white rounded-[0.5rem] shadow-lg">
            <div className="w-full bg-black rounded-[0.5rem] py-8 px-4 sm:px-8">
              <div className="flex mb-6 bg-black p-1 rounded-lg">
                <button
                  className={`flex-1 py-2 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 ${
                    tripType === "to-airport"
                      ? "bg-gradient-to-r from-[#B8A171] to-[#BDA97F] text-black"
                      : "text-white"
                  }`}
                  onClick={() => setTripType("to-airport")}
                >
                  To Airport
                </button>
                <button
                  className={`flex-1 py-2 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 ${
                    tripType === "from-airport"
                      ? "bg-gradient-to-r from-[#B8A171] to-[#BDA97F] text-black"
                      : "text-white"
                  }`}
                  onClick={() => setTripType("from-airport")}
                >
                  From Airport
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 ">
                {tripType === "to-airport" ? (
                  <>
                    <div>
                      <label className="text-white font-bold text-sm flex items-center gap-2 mb-1 -ml-1">
                        <FaMapMarkerAlt /> Pick-up Location
                      </label>
                      <input
                        type="text"
                        name="pickUpLocation"
                        value={formData.pickUpLocation}
                        onChange={handleChange}
                        placeholder="Pick-up"
                        className="w-full px-4 py-2 bg-black border border-white rounded-md text-white placeholder-gray-400"
                      />
                    </div>

                    <div>
                      <label className="text-white font-bold text-sm flex items-center gap-2 mb-1 -ml-1">
                        <FaPlaneDeparture /> Airport
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="airport"
                          value="BBI"
                          readOnly
                          placeholder="BBI"
                          className="flex-1 px-4 py-2 bg-black border border-white rounded-md text-white placeholder-gray-400"
                        />

                        <select
                          name="terminal"
                          value={formData.terminal}
                          onChange={handleChange}
                          className="px-4 py-2 bg-black border border-white rounded-md text-white"
                        >
                          <option value="T1">T1</option>
                          <option value="T2">T2</option>
                        </select>
                      </div>
                      <p className="text-xs text-white mt-1">
                        Premium airport rides to and from all Bhubaneswar airports.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="text-white font-bold text-sm flex items-center gap-2 mb-1 -ml-1">
                        <FaPlaneArrival /> Airport
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="airport"
                          value="BBI"
                          readOnly
                          placeholder="BBI"
                          className="flex-1 px-4 py-2 bg-black border border-white rounded-md text-white placeholder-gray-400"
                        />

                        <select
                          name="terminal"
                          value={formData.terminal}
                          onChange={handleChange}
                          className="px-4 py-2 bg-black border border-white rounded-md text-white"
                        >
                          <option value="T1">T1</option>
                          <option value="T2">T2</option>
                        </select>
                      </div>
                      <p className="text-xs text-white mt-1">
                        Premium airport rides to and from all Bhubaneswar airports.
                      </p>
                    </div>

                    <div>
                      <label className="text-white font-bold text-sm flex items-center gap-2 mb-1 -ml-1">
                        <FaMapMarkerAlt /> Drop-off Location
                      </label>
                      <input
                        type="text"
                        name="pickUpLocation"
                        value={formData.pickUpLocation}
                        onChange={handleChange}
                        placeholder="Drop-off"
                        className="w-full px-4 py-2 bg-black border border-white rounded-md text-white placeholder-gray-400"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="text-white font-bold text-sm flex items-center gap-2 mb-1 -ml-1">
                    <FaCalendarAlt /> Date and Time
                  </label>
                  <input
                    type="datetime-local"
                    name="departureTime"
                    value={formData.departureTime}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-black border border-white rounded-md text-white [color-scheme:dark]"
                  />
                  <p className="text-xs text-white mt-1">
                    Please book at least 2 hrs in advance.
                  </p>
                </div>

                <div>
                  <label className="text-white font-bold text-sm flex items-center gap-2 mb-1 -ml-1">
                    <FaPlaneArrival /> Flight Number (Optional)
                  </label>
                  <input
                    type="text"
                    name="flightNumber"
                    value={formData.flightNumber}
                    onChange={handleChange}
                    placeholder="Flight Number"
                    className="w-full px-4 py-2 bg-black border border-white rounded-md text-white placeholder-gray-400"
                  />
                </div>

                <div className="flex flex-wrap gap-4 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowGuestModal(true)}
                    className="flex items-center gap-2 px-4 py-2 border border-white rounded-md text-white font-semibold"
                  >
                    <FaUserFriends />  {passengers} Guests
                  </button>

                  {!formData.roundTrip ? (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, roundTrip: true })}
                      className="px-4 py-2 border border-white rounded-md text-white font-semibold"
                    >
                      Round Trip
                    </button>
                  ) : (
                    <>
                      {renderRoundTripSection()}
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, roundTrip: false })}
                        className="px-4 py-2 border border-white rounded-md text-white font-semibold mt-2"
                      >
                        Remove
                      </button>
                    </>
                  )}
                </div>

                <PrimaryButton className="w-full py-3 text-lg font-semibold rounded-full mt-2">
                  Check Fare
                </PrimaryButton>
              </form>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center text-center md:text-left px-2 md:px-0 pt-11">
          <h2 className="text-gradient mb-6 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
            On-time transfers <br /> with extra space.
          </h2>
          <p className="mt-2 text-sm font-normal text-foreground sm:text-base md:text-lg lg:text-xl max-w-xl">
            Pre-book your ride in advance and we’ll get you there on time, in prime comfort — so you start and end your trip off right.
          </p>
        </div>
      </div>
    </div>

    <GuestModal
  isOpen={showGuestModal}
  onClose={() => setShowGuestModal(false)}
  passengers={passengers}
  setPassengers={setPassengers}
  suitcases={suitcases}
  setSuitcases={setSuitcases}
  onSubmit={() => setShowGuestModal(false)}
/>
</>

  );
};

export default AirportForm;
