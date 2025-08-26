import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../buttons/PrimaryButton";
import IconClock from "../ui/IconClock";
import IconMap from "../ui/IconMap";
import IconCal from "../ui/IconCal";
import GuestModal from "../modals/GuestModal";
import { FaUserFriends } from "react-icons/fa";
import Map from "../ui/Map";
import AutocompleteInput from "../ui/AutocompleteInput";
import GoogleMapsProvider from "../ui/GoogleMapsProvider";
import api from "../../utils/api";
import { toast } from "react-toastify";

const OutStationForm = () => {
  const navigate = useNavigate();

  // Form state
  const [tripType, setTripType] = useState("one-way");
  const [formData, setFormData] = useState({
    location: "",
    dropOff: "",
    departureTime: "",
    returnTime: "",
  });

  const [stops, setStops] = useState([]);
  const [passengers, setPassengers] = useState(2);
  const [suitcases, setSuitcases] = useState(2);
  const [showGuestModal, setShowGuestModal] = useState(false);

  // Map calculation results
  const [distance, setDistance] = useState(null);

  // UI state
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Calculate minimum datetime (6 hours from now)
  const getMinDateTime = () => {
    const now = new Date();
    const minDate = new Date(now.getTime() + 6 * 60 * 60 * 1000); // 6 hours from now
    return minDate.toISOString().slice(0, 16); // Format for datetime-local input
  };

  // Validate 6-hour advance booking requirement
  const validateStartTime = (dateTime) => {
    if (!dateTime) return false;

    const now = new Date();
    const startTime = new Date(dateTime);
    const diffHours = (startTime - now) / (1000 * 60 * 60);

    return diffHours >= 6;
  };

  // Validate return time for round trips
  const validateReturnTime = (startTime, returnTime) => {
    if (!startTime || !returnTime) return false;

    const start = new Date(startTime);
    const returnDate = new Date(returnTime);

    return returnDate > start;
  };

  const handleStopChange = (index, value) => {
    const updatedStops = [...stops];
    updatedStops[index] = value;
    setStops(updatedStops);
  };

  const handleStopPlaceSelect = (index, addressData) => {
    const updatedStops = [...stops];
    updatedStops[index] = addressData.address;
    setStops(updatedStops);
  };

  const handleAddStop = () => {
    if (stops.length < 5) {
      setStops([...stops, ""]);
    }
  };

  const handleRemoveStop = (index) => {
    const updatedStops = stops.filter((_, i) => i !== index);
    setStops(updatedStops);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.location || !formData.dropOff) {
      toast.error("Please enter both pickup and drop-off locations.");
      return;
    }

    if (!formData.departureTime) {
      toast.error("Please select a departure date and time.");
      return;
    }

    if (!validateStartTime(formData.departureTime)) {
      toast.error("Bookings must be made at least 6 hours in advance.");
      return;
    }

    // Validate return time for round trips
    if (tripType === "round-trip") {
      if (!formData.returnTime) {
        toast.error("Return date and time is required for round trips.");
        return;
      }

      if (!validateReturnTime(formData.departureTime, formData.returnTime)) {
        toast.error("Return time must be after departure time.");
        return;
      }
    }

    // Use calculated distance from map or fallback to estimated distance
    const totalDistance = distance ? parseFloat(distance) : 150;

    // Validate distance according to backend API rules (1-500 km for outstation)
    if (totalDistance < 1 || totalDistance > 500) {
      toast.error(
        "Distance must be between 1 and 500 km for outstation trips."
      );
      return;
    }

    setLoading(true);

    try {
      // Prepare API payload matching backend validation requirements
      const payload = {
        pickUp: {
          address: formData.location,
          location: {
            type: "Point",
            coordinates: [85.8166, 20.2945], // Default coordinates - should be geocoded
          },
        },
        dropOff: {
          address: formData.dropOff,
          location: {
            type: "Point",
            coordinates: [85.8266, 20.3045], // Default coordinates - should be geocoded
          },
        },
        stops: stops
          .filter((stop) => stop.trim() !== "")
          .map((stop) => ({
            address: stop,
            location: {
              type: "Point",
              coordinates: [85.8166, 20.2945], // Default coordinates - should be geocoded
            },
          })),
        passengerCount: passengers,
        luggageCount: suitcases,
        startTime: formData.departureTime,
        totalDistance: totalDistance,
        isRoundTrip: tripType === "round-trip",
        returnTime: tripType === "round-trip" ? formData.returnTime : null,
        addOns: {
          airportToll: false,
          placard: {
            required: false,
            text: "",
          },
          pets: {
            dogs: false,
            cats: false,
          },
          bookForOther: {
            isBooking: false,
            otherGuestInfo: "",
          },
          childSeat: false,
        },
      };

      const response = await api.post(
        "/api/v1/bookings/charges/outstation",
        payload
      );

      if (response.data.success) {
        const fareData = {
          service: "Outstation Trip",
          formData: payload,
          apiResponse: response.data,
        };

        // Navigate to fare summary page with data
        navigate("/outstation-trips/fare-summary", {
          state: { fareData },
        });
      } else {
        throw new Error(response.data.message || "Failed to calculate fare");
      }
    } catch (err) {
      console.error("Fare calculation error:", err);

      let errorMessage = "Failed to calculate fare. Please try again.";

      if (err.code === "ECONNABORTED") {
        errorMessage = "Request timeout - backend server may be down";
      } else if (err.response?.status === 401) {
        errorMessage = "Authentication required - please login to continue";
      } else if (err.response?.status === 400) {
        errorMessage =
          err.response.data.message || "Invalid booking details provided";
      } else if (err.response?.status === 500) {
        errorMessage = "Server error - please try again later";
      } else if (!navigator.onLine) {
        errorMessage = "No internet connection";
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GoogleMapsProvider>
      <div className="my-container mt-30 mb-20 flex justify-center">
        <div className="flex flex-col-reverse md:flex-row md:items-start md:justify-center gap-10 md:gap-20 w-full max-w-5xl">
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center max-w-md">
            <h2 className="text-foreground text-2xl sm:text-3xl font-bold mb-4 text-center">
              Outstation Trips
            </h2>
            <div className="w-full bg-[linear-gradient(132.73deg,#B8A171_0%,#FFF2CC_100%)] p-[2px] rounded-[0.5rem] shadow-lg">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-4 w-full bg-background rounded-[0.5rem] py-8 px-4 sm:px-8"
              >
                <h1 className="text-foreground text-base sm:text-lg font-semibold mb-1 text-center">
                  Explore Odisha’s most loved destinations like Puri, Konark,
                  Chilika, and Gopalpur with the comfort of a chauffeur by your
                  side. Outstation bookings are available for trips up to 400
                  km.
                </h1>

                <div className="flex w-full bg-[#1A1A1A] p-[2px] rounded-lg">
                  <button
                    type="button"
                    className={`flex-1 py-2 rounded-l-lg text-sm sm:text-base transition-all duration-300 ${
                      tripType === "one-way"
                        ? "btn-gradient text-black font-semibold"
                        : "bg-background text-gradient"
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
                        : "bg-background text-gradient"
                    }`}
                    onClick={() => setTripType("round-trip")}
                  >
                    Round Trip
                  </button>
                </div>

                <div className="w-full">
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-foreground text-xs">
                      Location
                    </label>
                    <button
                      type="button"
                      className={`text-sm font-medium text-foreground ${
                        stops.length >= 5 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={handleAddStop}
                      disabled={stops.length >= 5}
                    >
                      + Add Stop (Max 5)
                    </button>
                  </div>
                  <div className="flex items-center justify-center bg-[linear-gradient(132.73deg,#B8A171_0%,#FFF2CC_100%)] p-[1px] rounded-[0.3rem] w-full">
                    <AutocompleteInput
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Pick-up Location"
                      className="w-full py-2 px-4 bg-background text-foreground rounded-[0.3rem] focus:outline-none focus:ring-2 focus:ring-[var(--color-gradient-end)] text-base placeholder-gray-400"
                    />
                  </div>
                </div>

                {stops.map((stop, index) => (
                  <div className="w-full" key={index}>
                    <label className="block mb-1 text-foreground text-xs">
                      Stop {index + 1}
                    </label>
                    <div className="flex items-center justify-between bg-[linear-gradient(132.73deg,#B8A171_0%,#FFF2CC_100%)] p-[1px] rounded-[0.3rem] w-full">
                      <AutocompleteInput
                        value={stop}
                        onChange={(e) =>
                          handleStopChange(index, e.target.value)
                        }
                        onPlaceSelect={(addressData) =>
                          handleStopPlaceSelect(index, addressData)
                        }
                        placeholder={`Stop ${index + 1}`}
                        className="w-full py-2 px-4 bg-background text-foreground rounded-[0.3rem] focus:outline-none focus:ring-2 focus:ring-[var(--color-gradient-end)] text-base placeholder-gray-400"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveStop(index)}
                        className="ml-2 mr-2 bg-[#1A1A1A] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-black"
                        title="Remove stop"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}

                <div className="w-full">
                  <label className="block mb-1 text-foreground text-xs">
                    Drop-off
                  </label>
                  <div className="flex items-center justify-center bg-[linear-gradient(132.73deg,#B8A171_0%,#FFF2CC_100%)] p-[1px] rounded-[0.3rem] w-full">
                    <AutocompleteInput
                      name="dropOff"
                      value={formData.dropOff}
                      onChange={handleChange}
                      placeholder="Drop-off"
                      className="w-full py-2 px-4 bg-background text-foreground rounded-[0.3rem] focus:outline-none focus:ring-2 focus:ring-[var(--color-gradient-end)] text-base placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="w-full">
                  <label className="block mb-1 text-foreground text-xs">
                    Date and Time
                  </label>
                  <div className="flex items-center justify-center bg-[linear-gradient(132.73deg,#B8A171_0%,#FFF2CC_100%)] p-[1px] rounded-[0.3rem] w-full">
                    <input
                      type="datetime-local"
                      name="departureTime"
                      value={formData.departureTime}
                      onChange={handleChange}
                      min={getMinDateTime()}
                      className="w-full py-2 px-4 bg-background text-foreground rounded-[0.3rem] focus:outline-none focus:ring-2 focus:ring-[var(--color-gradient-end)] text-base [color-scheme:dark]"
                    />
                  </div>
                  <p className="text-foreground text-xs mt-1">
                    Please book at least 6 hours in advance.
                  </p>
                </div>

                {tripType === "round-trip" && (
                  <div className="w-full">
                    <label className="block mb-1 text-foreground text-xs">
                      Return Date and Time
                    </label>
                    <div className="flex items-center justify-center bg-[linear-gradient(132.73deg,#B8A171_0%,#FFF2CC_100%)] p-[1px] rounded-[0.3rem] w-full">
                      <input
                        type="datetime-local"
                        name="returnTime"
                        value={formData.returnTime}
                        onChange={handleChange}
                        min={formData.departureTime || getMinDateTime()}
                        className="w-full py-2 px-4 bg-background text-foreground rounded-[0.3rem] focus:outline-none focus:ring-2 focus:ring-[var(--color-gradient-end)] text-base [color-scheme:dark]"
                      />
                    </div>
                    <p className="text-foreground text-xs mt-1">
                      Return time must be after departure time.
                    </p>
                  </div>
                )}

                <div className="w-full">
                  <button
                    type="button"
                    onClick={() => setShowGuestModal(true)}
                    className="flex items-center gap-2 px-4 py-2 border border-white rounded-md text-white font-semibold"
                  >
                    <FaUserFriends /> {passengers} Guests
                  </button>
                </div>

                <PrimaryButton
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 rounded-full text-lg font-semibold mt-3"
                >
                  {loading ? "Calculating..." : "Check Fare"}
                </PrimaryButton>
              </form>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-start text-center md:text-left px-2 md:px-0">
            <h2 className="text-gradient mb-6 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
              Smooth Journeys. Beautiful Surroundings
            </h2>
            <p className="mt-2 text-sm font-normal text-foreground sm:text-base md:text-lg lg:text-xl max-w-xl mb-6">
              The perfect getaway starts with the perfect ride; quiet,
              comfortable, and effortlessly scenic.
            </p>

            {/* Map Component */}
            <div className="w-full max-w-xl">
              <Map
                pickupAddress={formData.location}
                dropAddress={formData.dropOff}
                stopAddresses={stops.filter((stop) => stop.trim() !== "")}
                setDistance={setDistance}
              />
            </div>
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
    </GoogleMapsProvider>
  );
};

export default OutStationForm;
