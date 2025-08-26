import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../utils/api";
import { decryptOptions } from "../../utils/decryptOptions";

const FaCalendarAlt = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 448 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M400 64h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v48c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V160h352v298c0 3.3-2.7 6-6 6z"></path>
  </svg>
);

const FaDog = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 576 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M544 218.4V208c0-26.51-21.49-48-48-48h-80.01c-2.11 0-4.13.46-6.01 1.25L320 128l-15.99-33.25C296.01 79.25 285.88 64 272 64h-64c-13.88 0-24.01 15.25-16.01 33.25L176 128l-89.99-33.75C84.14 93.46 82.11 93 80.01 93H48C21.49 93 0 114.49 0 141v1.6C0 150.93 5.07 159.1 13.57 160h16.87C40.32 160 48 167.68 48 176v16c0 8.84-7.68 16-17.56 16H13.57C5.07 208 0 215.07 0 224v48c0 8.93 5.07 16 13.57 16h17.44c9.88 0 17.56 7.16 17.56 16v16c0 8.84-7.68 16-17.56 16H13.57C5.07 336 0 343.07 0 352v48c0 26.51 21.49 48 48 48h32c17.67 0 32-14.33 32-32v-32h384v32c0 17.67 14.33 32 32 32h32c26.51 0 48-21.49 48-48v-48c0-8.93-5.07-16-13.57-16h-17.44c-9.88 0-17.56-7.16-17.56-16v-16c0-8.84 7.68-16 17.56-16h17.44C570.93 288 576 280.93 576 272v-48c0-8.93-5.07-16-13.57-16zM288 320c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"></path>
  </svg>
);

const FaCat = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M290.59 192c-20.18 0-106.82 1.98-162.59 85.95V192c0-52.94-43.06-96-96-96-17.67 0-32 14.33-32 32s14.33 32 32 32c17.64 0 32 14.36 32 32v256c0 35.3 28.7 64 64 64h176c8.84 0 16-7.16 16-16v-16c0-17.67-14.33-32-32-32h-32l128-96v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V289.86c-10.29 2.67-20.89 4.54-32 4.54-61.81 0-113.52-44.05-125.41-102.4zM448 96h-64l-64-64v134.4c0 53.02 42.98 96 96 96s96-42.98 96-96V32l-64 64zm-72 80c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16zm80 0c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16z"></path>
  </svg>
);

const FaChild = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 384 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M120 72c0-39.765 32.235-72 72-72s72 32.235 72 72c0 39.764-32.235 72-72 72s-72-32.236-72-72zm254.627 1.373c-12.496-12.497-32.758-12.497-45.254 0L242.745 160H141.255L54.627 73.373c-12.496-12.497-32.758-12.497-45.254 0-12.497 12.497-12.497 32.758 0 45.255L104.947 214.2 75.264 352H32c-17.673 0-32 14.327-32 32s14.327 32 32 32h64c15.591 0 29.426-11.099 31.406-26.432L155.93 248h72.14l28.524 141.568C258.574 404.901 272.409 416 288 416h64c17.673 0 32-14.327 32-32s-14.327-32-32-32h-43.264l-29.683-137.8L374.627 118.627c12.497-12.497 12.497-32.758 0-45.254z"></path>
  </svg>
);

const FaUser = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 448 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3 0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path>
  </svg>
);

const FaUserPlus = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 640 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3 0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path>
  </svg>
);

const FaRegClock = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8l-22.4 30.9c-3.9 5.3-11.4 6.5-16.8 2.6z"></path>
  </svg>
);

const FaMapMarkerAlt = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 384 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path>
  </svg>
);

const ToggleSwitch = ({ checked, onChange, disabled = false }) => {
  return (
    <label
      className={`relative inline-flex items-center cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B8A171]"></div>
    </label>
  );
};

const CarFareSummary = ({ fareData }) => {
  const navigate = useNavigate();
  const [addOns, setAddOns] = useState({
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
  });

  const [currentFareData, setCurrentFareData] = useState(fareData);
  const [loading, setLoading] = useState(false);
  // const [paymentOptions, setPaymentOptions] = useState(null);

  // Local state for text inputs (to prevent API calls on every character)
  const [placardText, setPlacardText] = useState("");
  const [otherGuestInfo, setOtherGuestInfo] = useState("");

  // Initialize add-ons from initial fare data
  useEffect(() => {
    if (fareData?.formData?.addOns) {
      setAddOns(fareData.formData.addOns);
      setPlacardText(fareData.formData.addOns.placard?.text || "");
      setOtherGuestInfo(
        fareData.formData.addOns.bookForOther?.otherGuestInfo || ""
      );
    }
  }, [fareData]);

  const updateFare = async (newAddOns) => {
    setLoading(true);
    try {
      // Create updated payload with new add-ons
      const updatedPayload = {
        ...fareData.formData,
        addOns: newAddOns,
      };

      // Determine API endpoint based on service type
      const serviceType = currentFareData?.service || fareData?.service;
      let endpoint = "/api/v1/bookings/charges/hourly-rental"; // default

      switch (serviceType) {
        case "Hourly Rental":
          endpoint = "/api/v1/bookings/charges/hourly-rental";
          break;
        case "Airport Transfer":
          endpoint = "/api/v1/bookings/charges/airport-transfer";
          break;
        case "Outstation Trip":
          endpoint = "/api/v1/bookings/charges/outstation";
          break;
        case "Cab Booking":
          endpoint = "/api/v1/bookings/charges/cab-booking";
          break;
        default:
          endpoint = "/api/v1/bookings/charges/hourly-rental";
      }

      const response = await api.post(endpoint, updatedPayload);

      if (response.data.success) {
        setCurrentFareData({
          ...fareData,
          formData: updatedPayload,
          apiResponse: response.data,
        });
      } else {
        throw new Error(response.data.message || "Failed to update fare");
      }
    } catch (err) {
      console.error("Fare update error:", err);
      let errorMessage = "Failed to update fare. Please try again.";

      if (err.response?.status === 400) {
        errorMessage =
          err.response.data.message || "Invalid booking details provided";
      } else if (err.response?.status === 500) {
        errorMessage = "Server error - please try again later";
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleChange = async (toggleType, value, subType = null) => {
    const newAddOns = { ...addOns };

    switch (toggleType) {
      case "airportToll":
        newAddOns.airportToll = value;
        break;
      case "placard":
        newAddOns.placard.required = value;
        if (!value) {
          newAddOns.placard.text = "";
          setPlacardText("");
        }
        break;
      case "pets":
        if (subType) {
          // Handle individual pet types (dogs/cats)
          newAddOns.pets[subType] = value;
        } else {
          // Handle main pets toggle
          if (value) {
            // When turning on pets, enable dogs by default
            newAddOns.pets.dogs = true;
          } else {
            // When turning off pets, disable all pet types
            newAddOns.pets.dogs = false;
            newAddOns.pets.cats = false;
          }
        }
        break;
      case "bookForOther":
        newAddOns.bookForOther.isBooking = value;
        if (!value) {
          newAddOns.bookForOther.otherGuestInfo = "";
          setOtherGuestInfo("");
        }
        break;
      case "childSeat":
        newAddOns.childSeat = value;
        break;
      default:
        return;
    }

    setAddOns(newAddOns);
    await updateFare(newAddOns);
  };

  const handlePlacardTextSave = async () => {
    const newAddOns = {
      ...addOns,
      placard: {
        ...addOns.placard,
        text: placardText,
      },
    };
    setAddOns(newAddOns);
    await updateFare(newAddOns);
  };

  const handleOtherGuestInfoSave = async () => {
    const newAddOns = {
      ...addOns,
      bookForOther: {
        ...addOns.bookForOther,
        otherGuestInfo: otherGuestInfo,
      },
    };
    setAddOns(newAddOns);
    await updateFare(newAddOns);
  };

  const handlePayNow = async () => {
    setLoading(true);
    try {
      // Create final payload with current add-ons
      const finalPayload = {
        ...fareData.formData,
        addOns: addOns,
      };

      // Determine booking API endpoint based on service type
      const serviceType = currentFareData?.service || fareData?.service;
      let endpoint = "/api/v1/bookings/order/hourly-rental"; // default

      switch (serviceType) {
        case "Hourly Rental":
          endpoint = "/api/v1/bookings/order/hourly-rental";
          break;
        case "Airport Transfer":
          endpoint = "/api/v1/bookings/order/airport-transfer";
          break;
        case "Outstation Trip":
          endpoint = "/api/v1/bookings/order/outstation";
          break;
        case "Cab Booking":
          endpoint = "/api/v1/bookings/order/cab-booking";
          break;
        default:
          endpoint = "/api/v1/bookings/order/hourly-rental";
      }

      const response = await api.post(endpoint, finalPayload);

      if (response.data.success) {
        // console.log("Booking created successfully:", response.data);

        const { encryptedData, iv } = response.data.options;

        const decrypted = decryptOptions(encryptedData, iv);
        if (!decrypted) {
          throw new Error("Failed to decrypt payment options");
        }

        if (!decrypted.key || !decrypted.amount || !decrypted.order_id) {
          throw new Error("Invalid payment configuration received");
        }

        // console.log("Decrypted options:", decrypted);
        // setPaymentOptions(decrypted);

        // payment-rzp-integration
        try {
          // Check if Razorpay is loaded
          if (!window.Razorpay) {
            toast.error(
              "Payment gateway not available. Please refresh the page."
            );
            return;
          }

          // Use decrypted options instead of paymentOptions state
          const razorpayOptions = {
            ...decrypted,
            modal: {
              ondismiss: function () {
                toast.info("Payment cancelled");
                setLoading(false);
              },
            },
          };

          const razorpay = new window.Razorpay(razorpayOptions);

          // Handle payment failure
          razorpay.on("payment.failed", function (response) {
            console.error("Payment failed:", response.error);
            toast.error(response.error.description || "Payment failed");
            setLoading(false);
          });

          razorpay.open();
        } catch (error) {
          console.error("Razorpay error:", error);
          toast.error("Failed to open payment gateway");
          setLoading(false);
        }
      } else {
        throw new Error(response.data.message || "Failed to create booking");
      }
    } catch (err) {
      console.error("Booking creation error:", err);
      let errorMessage = "Failed to create booking. Please try again.";

      if (err.response?.status === 400) {
        errorMessage =
          err.response.data.message || "Invalid booking details provided";
      } else if (err.response?.status === 401) {
        errorMessage = "Please login to continue with the booking";
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

  // Extract data from API response
  const apiData = currentFareData?.apiResponse?.data || {};
  const formData = currentFareData?.formData || {};

  // Get service route based on service type
  const getServiceRoute = () => {
    const serviceType = apiData.serviceType || currentFareData?.service;

    switch (serviceType) {
      case "hourly-rental":
      case "Hourly Rental":
        return "/hourly-rental";
      case "outstation":
      case "outstation-trips":
      case "Outstation":
        return "/outstation-trips";
      case "airport-transfer":
      case "airport-transfers":
      case "Airport Transfer":
        return "/airport-transfers";
      default:
        return "/"; // fallback to home
    }
  };

  // Format date and time
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "";
    const date = new Date(dateTimeString);
    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Format fare amount
  const formatFare = (amountInPaise) => {
    return `₹${(amountInPaise / 100).toFixed(0)}`;
  };

  // Get service-specific rental information
  const getRentalInfo = () => {
    const serviceType = apiData.serviceType || currentFareData?.service;

    switch (serviceType) {
      case "hourly-rental":
      case "Hourly Rental":
        return {
          label: "Rental",
          description: `${formData.hours || 0}hr rental`,
        };
      case "outstation":
      case "outstation-trips":
      case "Outstation Trip":
        return {
          label: "Trip Type",
          description: formData.isRoundTrip ? "Round Trip" : "One Way",
        };
      case "airport-transfer":
      case "airport-transfers":
      case "Airport Transfer":
        return {
          label: "Transfer",
          description: "Airport Transfer",
        };
      case "cab-booking":
      case "Cab Booking":
        return {
          label: "Booking",
          description: "Cab Booking",
        };
      default:
        return {
          label: "Service",
          description: "Car Rental",
        };
    }
  };

  // Get additional trip details based on service type
  const getAdditionalTripDetails = () => {
    const serviceType = apiData.serviceType || currentFareData?.service;
    const details = [];

    // Add return time for outstation round trips
    if (
      (serviceType === "outstation" ||
        serviceType === "outstation-trips" ||
        serviceType === "Outstation Trip") &&
      formData.isRoundTrip &&
      formData.returnTime
    ) {
      details.push({
        icon: FaCalendarAlt,
        label: "Return Time",
        value: formatDateTime(formData.returnTime),
      });
    }

    // Add duration for hourly rentals
    if (
      (serviceType === "hourly-rental" || serviceType === "Hourly Rental") &&
      formData.hours
    ) {
      details.push({
        icon: FaRegClock,
        label: "Duration",
        value: `${formData.hours} hours`,
      });
    }

    // Add flight details for airport transfers
    if (
      serviceType === "airport-transfer" ||
      serviceType === "airport-transfers" ||
      serviceType === "Airport Transfer"
    ) {
      if (formData.flightNumber) {
        details.push({
          icon: FaRegClock,
          label: "Flight",
          value: formData.flightNumber,
        });
      }
      if (formData.transferType) {
        details.push({
          icon: FaMapMarkerAlt,
          label: "Transfer Type",
          value:
            formData.transferType === "airport-to-city"
              ? "Airport to City"
              : "City to Airport",
        });
      }
    }

    return details;
  };

  // Get drop-off label based on service type
  const getDropOffLabel = () => {
    const serviceType = apiData.serviceType || currentFareData?.service;

    switch (serviceType) {
      case "airport-transfer":
      case "airport-transfers":
      case "Airport Transfer":
        return formData.transferType === "airport-to-city"
          ? "Destination"
          : "Airport";
      case "outstation":
      case "outstation-trips":
      case "Outstation Trip":
        return formData.isRoundTrip ? "Destination" : "Drop";
      default:
        return "Drop";
    }
  };

  // Check if drop-off should be shown
  const shouldShowDropOff = () => {
    const serviceType = apiData.serviceType || currentFareData?.service;

    // For hourly rentals, drop-off might be same as pickup, so it's less important
    if (serviceType === "hourly-rental" || serviceType === "Hourly Rental") {
      return (
        formData.dropOff?.address &&
        formData.dropOff.address !== formData.pickUp?.address
      );
    }

    return formData.dropOff?.address;
  };

  // Get fare summary details based on service type
  const getFareSummaryDetails = () => {
    const serviceType = apiData.serviceType || currentFareData?.service;
    const details = [];

    // Base fare is always shown
    details.push({
      label: "Base Fare",
      value: formatFare(apiData.fare || 0),
    });

    // Service type
    details.push({
      label: "Service Type",
      value: apiData.serviceType || serviceType || "Car Rental",
    });

    // Duration/Trip specific details
    switch (serviceType) {
      case "hourly-rental":
      case "Hourly Rental":
        if (apiData.duration || formData.hours) {
          details.push({
            label: "Duration",
            value: `${apiData.duration || formData.hours || 0} hours`,
          });
        }
        break;
      case "outstation":
      case "outstation-trips":
      case "Outstation Trip":
        if (formData.isRoundTrip !== undefined) {
          details.push({
            label: "Trip Type",
            value: formData.isRoundTrip ? "Round Trip" : "One Way",
          });
        }
        if (apiData.distance) {
          details.push({
            label: "Distance",
            value: `${apiData.distance} km`,
          });
        }
        break;
      case "airport-transfer":
      case "airport-transfers":
      case "Airport Transfer":
        if (formData.transferType) {
          details.push({
            label: "Transfer Type",
            value:
              formData.transferType === "airport-to-city"
                ? "Airport to City"
                : "City to Airport",
          });
        }
        break;
    }

    return details;
  };

  // Get dynamic labels for booking details
  const getBookingDetailsLabel = (field) => {
    const serviceType = apiData.serviceType || currentFareData?.service;

    switch (field) {
      case "passengers":
        if (
          serviceType === "airport-transfer" ||
          serviceType === "airport-transfers" ||
          serviceType === "Airport Transfer"
        ) {
          return "Travelers";
        }
        return "Passengers";
      case "luggage":
        if (
          serviceType === "airport-transfer" ||
          serviceType === "airport-transfers" ||
          serviceType === "Airport Transfer"
        ) {
          return "Luggage";
        }
        return "Suitcases";
      default:
        return field;
    }
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans p-4 sm:p-6 lg:p-8 mt-[5.5rem]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B8A171] to-[#FFF2CC]">
            {currentFareData?.service || "Car Rental"}
          </h1>
          <button
            onClick={() => navigate(getServiceRoute())}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
          >
            ← Back
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-black border border-gray-800 rounded-lg p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold tracking-wider text-gray-200">
                  TRIP SUMMARY
                </h2>
              </div>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <FaRegClock className="text-[#B8A171] text-xl mt-1" />
                  <div>
                    <p className="font-semibold text-white">
                      {getRentalInfo().label}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {getRentalInfo().description}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FaMapMarkerAlt className="text-[#B8A171] text-xl mt-1" />
                  <div>
                    <p className="font-semibold text-white">Pick up</p>
                    <p className="text-gray-400 text-sm">
                      {formData.pickUp?.address || "Not specified"}
                    </p>
                  </div>
                </div>
                {shouldShowDropOff() && (
                  <div className="flex items-start gap-4">
                    <FaMapMarkerAlt className="text-[#B8A171] text-xl mt-1" />
                    <div>
                      <p className="font-semibold text-white">
                        {getDropOffLabel()}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {formData.dropOff?.address || "Not specified"}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <FaCalendarAlt className="text-[#B8A171] text-xl mt-1" />
                  <div>
                    <p className="font-semibold text-white">Pickup Time</p>
                    <p className="text-gray-400 text-sm">
                      {formatDateTime(formData.startTime)}
                    </p>
                  </div>
                </div>
                {/* Render additional trip details dynamically */}
                {getAdditionalTripDetails().map((detail, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <detail.icon className="text-[#B8A171] text-xl mt-1" />
                    <div>
                      <p className="font-semibold text-white">{detail.label}</p>
                      <p className="text-gray-400 text-sm">{detail.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-black border border-gray-800 rounded-lg p-5">
              <h2 className="text-lg font-semibold tracking-wider text-gray-200 mb-4">
                BOOKING DETAILS
              </h2>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center justify-between">
                  <span>{getBookingDetailsLabel("passengers")}</span>
                  <span className="text-white font-semibold">
                    {formData.passengerCount || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{getBookingDetailsLabel("luggage")}</span>
                  <span className="text-white font-semibold">
                    {formData.luggageCount || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Vehicle Type</span>
                  <span className="text-[#B8A171] font-semibold">
                    {apiData.carType || "Standard"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between p-3 bg-black border border-gray-800 rounded-lg">
              <div className="flex items-center gap-4">
                <img
                  src="/assets/c3.png"
                  alt="Vehicle"
                  className="w-28 h-auto rounded-md"
                />
                <div>
                  <p className="text-xl font-bold text-white">
                    {formatFare(apiData.fare || 0)}
                  </p>
                  <div className="mt-1 px-2 py-1 text-xs text-black bg-gradient-to-r from-[#B8A171] to-[#FFF2CC] rounded-md inline-block font-semibold">
                    {apiData.carType || "Standard"}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end text-xs text-gray-300">
                <span className="bg-gray-800 px-2 py-1 rounded-full mb-1">
                  {apiData.carType || "Standard Car"}
                </span>
                <span className="bg-gray-800 px-2 py-1 rounded-full mb-1">
                  {formData.passengerCount || 0} Guests
                </span>
                <span className="bg-gray-800 px-2 py-1 rounded-full">
                  {formData.luggageCount || 0} Suitcases
                </span>
              </div>
            </div>

            <div className="bg-black border border-gray-800 rounded-lg p-5">
              <h2 className="text-lg font-semibold tracking-wider text-gray-200 mb-4">
                TRIP ADD-ONS
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <FaUser className="text-[#B8A171] text-xl" />
                    <div>
                      <p className="font-semibold text-white">
                        Placard Message
                      </p>
                      <p className="text-gray-400 text-sm">
                        ₹500, type your message
                      </p>
                    </div>
                  </div>
                  <ToggleSwitch
                    checked={addOns.placard.required}
                    onChange={(e) =>
                      handleToggleChange("placard", e.target.checked)
                    }
                    disabled={loading}
                  />
                </div>

                {addOns.placard.required && (
                  <div className="ml-10 space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={placardText}
                        onChange={(e) => setPlacardText(e.target.value)}
                        placeholder="Enter placard message"
                        className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:border-[#B8A171] focus:outline-none"
                        disabled={loading}
                      />
                      <button
                        onClick={handlePlacardTextSave}
                        disabled={
                          loading || placardText === addOns.placard.text
                        }
                        className="px-4 py-2 bg-[#B8A171] text-black rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <FaDog className="text-[#B8A171] text-xl" />
                    <div>
                      <p className="font-semibold text-white">
                        Travelling with pet(s)
                      </p>
                      <p className="text-gray-400 text-sm">
                        Dogs and cats are welcome
                      </p>
                    </div>
                  </div>
                  <ToggleSwitch
                    checked={addOns.pets.dogs || addOns.pets.cats}
                    onChange={(e) =>
                      handleToggleChange("pets", e.target.checked)
                    }
                    disabled={loading}
                  />
                </div>

                {(addOns.pets.dogs || addOns.pets.cats) && (
                  <div className="ml-10 space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <FaDog className="text-[#B8A171] text-lg" />
                        <span className="text-white">Dogs</span>
                      </div>
                      <ToggleSwitch
                        checked={addOns.pets.dogs}
                        onChange={(e) =>
                          handleToggleChange("pets", e.target.checked, "dogs")
                        }
                        disabled={loading}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <FaCat className="text-[#B8A171] text-lg" />
                        <span className="text-white">Cats</span>
                      </div>
                      <ToggleSwitch
                        checked={addOns.pets.cats}
                        onChange={(e) =>
                          handleToggleChange("pets", e.target.checked, "cats")
                        }
                        disabled={loading}
                      />
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      Note: Max 2 pets allowed.
                    </p>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <FaChild className="text-[#B8A171] text-xl" />
                    <div>
                      <p className="font-semibold text-white">Child Seat</p>
                      <p className="text-gray-400 text-sm">
                        Safe seating for children
                      </p>
                    </div>
                  </div>
                  <ToggleSwitch
                    checked={addOns.childSeat}
                    onChange={(e) =>
                      handleToggleChange("childSeat", e.target.checked)
                    }
                    disabled={loading}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <FaUserPlus className="text-[#B8A171] text-xl" />
                    <div>
                      <p className="font-semibold text-white">
                        Book for someone else
                      </p>
                      <p className="text-gray-400 text-sm">
                        Add the guest details
                      </p>
                    </div>
                  </div>
                  <ToggleSwitch
                    checked={addOns.bookForOther.isBooking}
                    onChange={(e) =>
                      handleToggleChange("bookForOther", e.target.checked)
                    }
                    disabled={loading}
                  />
                </div>

                {addOns.bookForOther.isBooking && (
                  <div className="ml-10 space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={otherGuestInfo}
                        onChange={(e) => setOtherGuestInfo(e.target.value)}
                        placeholder="Enter guest details"
                        className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:border-[#B8A171] focus:outline-none"
                        disabled={loading}
                      />
                      <button
                        onClick={handleOtherGuestInfoSave}
                        disabled={
                          loading ||
                          otherGuestInfo === addOns.bookForOther.otherGuestInfo
                        }
                        className="px-4 py-2 bg-[#B8A171] text-black rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-[linear-gradient(132.73deg,#B8A171_0%,#FFF2CC_100%)] p-[2px] rounded-lg sticky top-8">
              <div className="bg-black rounded-md p-5">
                <h3 className="text-lg font-semibold tracking-wider text-gray-200 mb-4">
                  Fare Summary
                </h3>
                <div className="space-y-2 text-sm">
                  {getFareSummaryDetails().map((detail, index) => (
                    <p
                      key={index}
                      className="flex justify-between text-gray-300"
                    >
                      <span>{detail.label}</span>
                      <span>{detail.value}</span>
                    </p>
                  ))}
                </div>
                <hr className="border-gray-700 my-4" />
                <div className="flex justify-between font-bold text-lg mb-6 text-white">
                  <p>Total Amount</p>
                  <p>{formatFare(apiData.fare || 0)}</p>
                </div>
                <button
                  onClick={handlePayNow}
                  className="w-full bg-[linear-gradient(132.73deg,#B8A171_0%,#FFF2CC_100%)] text-black font-bold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Pay Now"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 lg:mt-12 bg-black border border-gray-800 p-6 rounded-lg text-sm">
          <h4 className="text-md font-semibold mb-3 tracking-wider text-gray-200">
            BOOKING POLICY
          </h4>
          <ul className="list-disc list-inside space-y-2 text-gray-400">
            <li>Rentals are available within city limits.</li>
            <li>
              Reach out at {import.meta.env.VITE_SUPPORT_PHONE} for any help.
            </li>
            <li>
              You can cancel your trip anytime, though we would appreciate you
              giving 2-3 hours notice.
            </li>
            <li>We do not charge any cancellation fee at the moment.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CarFareSummary;
