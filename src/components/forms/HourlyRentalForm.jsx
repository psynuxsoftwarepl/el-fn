import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../buttons/PrimaryButton";
import GuestModal from "../modals/GuestModal";
import { FaUserFriends } from "react-icons/fa";
import Map from "../ui/Map";
import AutocompleteInput from "../ui/AutocompleteInput";
import GoogleMapsProvider from "../ui/GoogleMapsProvider";
import api from "../../utils/api";
import { toast } from "react-toastify";

// --- New Hours Modal Component ---
const HoursModal = ({ isOpen, onClose, onSelect, currentDuration }) => {
  const [selectedHour, setSelectedHour] = useState(currentDuration || 5);
  const scrollContainerRef = useRef(null);

  // Reset internal state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedHour(currentDuration || 5);
    }
  }, [isOpen, currentDuration]);

  // Effect to scroll the selected hour into the center view when the modal opens
  useEffect(() => {
    if (isOpen && scrollContainerRef.current) {
      // We need a slight delay to ensure the element is rendered and scrollable
      setTimeout(() => {
        const selectedElement = scrollContainerRef.current.querySelector(
          `[data-hour="${selectedHour}"]`
        );
        if (selectedElement) {
          const containerHeight = scrollContainerRef.current.clientHeight;
          const elementOffsetTop = selectedElement.offsetTop;
          const elementHeight = selectedElement.clientHeight;
          const scrollTop =
            elementOffsetTop - containerHeight / 2 + elementHeight / 2;
          scrollContainerRef.current.scrollTo({
            top: scrollTop,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [isOpen, selectedHour]);

  if (!isOpen) return null;

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleSelect = () => {
    onSelect(selectedHour);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-[#1C1C1E] rounded-xl shadow-xl p-6 w-full max-w-xs mx-4 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Select Hours</h3>
          <button
            onClick={onClose}
            className="text-gray-400 text-2xl hover:text-white"
          >
            &times;
          </button>
        </div>

        <div className="relative h-48 my-4">
          <div
            ref={scrollContainerRef}
            className="absolute inset-0 overflow-y-scroll scrollbar-hide text-center snap-y snap-mandatory"
          >
            <div className="h-[calc(50%-1.5rem)]"></div> {/* Spacer */}
            {hours.map((hour) => (
              <div
                key={hour}
                data-hour={hour}
                onClick={() => setSelectedHour(hour)}
                className={`snap-center cursor-pointer py-2 transition-all duration-300 h-12 flex items-center justify-center ${
                  selectedHour === hour
                    ? "font-bold text-3xl text-white"
                    : "text-2xl text-gray-500"
                }`}
              >
                {hour}
              </div>
            ))}
            <div className="h-[calc(50%-1.5rem)]"></div> {/* Spacer */}
          </div>
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-[#1C1C1E] to-transparent pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#1C1C1E] to-transparent pointer-events-none"></div>
          <div className="absolute top-1/2 left-0 right-0 h-12 -translate-y-1/2 border-y border-gray-700 pointer-events-none flex items-center justify-end pr-4">
            <span className="text-lg text-gray-400">Hours</span>
          </div>
        </div>

        <div className="bg-yellow-900 bg-opacity-30 border border-yellow-700 text-yellow-300 p-3 rounded-md mb-6 text-center">
          <p className="text-xs font-medium">
            Extensions are subject to availability. We may be unable to extend
            your ride during peak hours. Kindly plan your schedule to avoid any
            disruptions.
          </p>
        </div>

        <button
          onClick={handleSelect}
          className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
        >
          Book For {selectedHour} Hours
        </button>
      </div>
    </div>
  );
};

// --- Main Hourly Rental Form ---
const HourlyRentalForm = () => {
  const navigate = useNavigate(); // Form state

  const [formData, setFormData] = useState({
    location: "",
    dropOff: "",
    departureTime: "",
    duration: "",
  });

  const [stops, setStops] = useState([]);
  const [passengers, setPassengers] = useState(2);
  const [suitcases, setSuitcases] = useState(2);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [showHoursModal, setShowHoursModal] = useState(false); // State for the new modal // UI state

  const [loading, setLoading] = useState(false); // Handlers

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler for the new modal
  const handleDurationSelect = (hours) => {
    setFormData({ ...formData, duration: hours });
  }; // Calculate minimum datetime (6 hours from now)

  const getMinDateTime = () => {
    const now = new Date();
    const minDate = new Date(now.getTime() + 6 * 60 * 60 * 1000);
    return minDate.toISOString().slice(0, 16);
  }; // Validate 6-hour advance booking requirement

  const validateStartTime = (dateTime) => {
    if (!dateTime) return false;
    const now = new Date();
    const startTime = new Date(dateTime);
    const diffHours = (startTime - now) / (1000 * 60 * 60);
    return diffHours >= 6;
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
    e.preventDefault(); // Validate required fields

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

    const hours = parseInt(formData.duration);
    if (!hours || hours < 1 || hours > 12) {
      toast.error("Duration must be between 1 and 12 hours.");
      return;
    }

    setLoading(true);

    try {
      // Prepare API payload
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
        hours: hours,
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
        "/api/v1/bookings/charges/hourly-rental",
        payload
      );

      if (response.data.success) {
        const fareData = {
          service: "Hourly Rental",
          formData: payload,
          apiResponse: response.data,
        }; // Navigate to fare summary page with data

        navigate("/hourly-rental/fare-summary", {
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
    <>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <GoogleMapsProvider>
        <div className="my-container mt-30 mb-20 flex justify-center">
          <div className="flex flex-col-reverse md:flex-row md:items-start md:justify-center gap-10 md:gap-20 w-full max-w-5xl mt-[0.5rem]">
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center max-w-md">
              <h2 className="text-foreground text-2xl sm:text-3xl font-bold mb-4 text-center">
                Hourly Rentals
              </h2>
              <div className="w-full bg-[linear-gradient(132.73deg,#B8A171_0%,#FFF2CC_100%)] p-[2px] rounded-[0.5rem] shadow-lg">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col items-center gap-4 w-full bg-background rounded-[0.5rem] py-8 px-4 sm:px-8"
                >
                  <h1 className="text-foreground text-base sm:text-lg font-semibold mb-1 text-center">
                    Whether it’s business or leisure, A dedicated ride that
                    stays until your day is done.
                  </h1>

                  {/* --- MODIFIED DURATION INPUT --- */}
                  <div className="w-full">
                    <label className="block mb-1 text-foreground text-xs">
                      Duration (unlimited kms)
                    </label>
                    <div className="flex items-center justify-center bg-[linear-gradient(132.73deg,#B8A171_0%,#FFF2CC_100%)] p-[1px] rounded-[0.3rem] w-full">
                      <div
                        className="relative w-full cursor-pointer"
                        onClick={() => setShowHoursModal(true)}
                      >
                        <div className="w-full py-2 px-4 bg-background text-foreground rounded-[0.3rem] focus:outline-none focus:ring-2 focus:ring-[var(--color-gradient-end)] text-base h-[40px] flex items-center">
                          {formData.duration ? (
                            `${formData.duration} Hours`
                          ) : (
                            <span className="text-gray-400">
                              Select hours (1-12)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-foreground text-xs">
                        Location
                      </label>
                      <button
                        type="button"
                        className={`text-foreground text-xs font-medium ${
                          stops.length >= 5
                            ? "opacity-50 cursor-not-allowed"
                            : ""
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
                      <div className="relative w-full">
                        <input
                          type="datetime-local"
                          name="departureTime"
                          value={formData.departureTime}
                          onChange={handleChange}
                          min={getMinDateTime()}
                          className="w-full py-2 px-4 bg-background text-foreground rounded-[0.3rem] focus:outline-none focus:ring-2 focus:ring-[var(--color-gradient-end)] text-base [color-scheme:dark]"
                        />
                      </div>
                    </div>
                    <p className="text-foreground text-xs mt-1">
                      Please book at least 6 hours in advance.
                    </p>
                  </div>

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

            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center text-center md:text-left px-2 md:px-0 pt-11">
              <h2 className="text-gradient mb-6 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
                Seamless Travel, On Your Schedule
              </h2>
              <p className="mt-2 text-foreground text-sm font-normal sm:text-base md:text-lg lg:text-xl max-w-xl mb-6">
                Whether it’s meetings or me-time, enjoy the convenience of a
                ride that’s always nearby.
              </p>

              {/* Map Component */}
              <div className="w-full max-w-xl">
                <Map
                  pickupAddress={formData.location}
                  dropAddress={formData.dropOff}
                  stopAddresses={stops.filter((stop) => stop.trim() !== "")}
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
        <HoursModal
          isOpen={showHoursModal}
          onClose={() => setShowHoursModal(false)}
          currentDuration={formData.duration}
          onSelect={handleDurationSelect}
        />
      </GoogleMapsProvider>
    </>
  );
};

// Mocking the components that are not defined
const MockComponent = ({ children }) => <div>{children}</div>;
const MockInput = (props) => <input {...props} />;
const MockButton = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);

// In a real scenario, these would be your actual component imports
const OriginalPrimaryButton = PrimaryButton || MockButton;
const OriginalGuestModal = GuestModal || MockComponent;
const OriginalMap = Map || MockComponent;
const OriginalAutocompleteInput = AutocompleteInput || MockInput;
const OriginalGoogleMapsProvider = GoogleMapsProvider || MockComponent;
const originalApi = api || {
  post: () => Promise.resolve({ data: { success: true } }),
};
const originalToast = toast || { error: console.error };
const originalUseNavigate = useNavigate || (() => () => {});

export default HourlyRentalForm;
