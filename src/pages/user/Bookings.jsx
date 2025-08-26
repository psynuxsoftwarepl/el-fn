import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PrimaryButton from "@components/buttons/PrimaryButton";

const Bookings = () => {
  const [bookings, setBookings] = useState({
    active: [],
    past: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState("active"); // active or past
  const [statistics, setStatistics] = useState({});
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const baseURL =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

      const { data } = await axios.get(`${baseURL}/api/v1/bookings`, {
        params: { page, limit },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.success) {
        setBookings({
          active: data.data.active || [],
          past: data.data.past || [],
        });
        setStatistics(data.data.statistics || {});
        setError("");
      } else {
        setError(data.message || "Failed to fetch bookings");
        toast.error(data.message || "Failed to fetch bookings");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Unable to fetch bookings. Please try again later.";
      setError(errorMessage);
      toast.error(errorMessage);

      // Set empty state on error
      setBookings({ active: [], past: [] });
      setStatistics({});
    } finally {
      setLoading(false);
    }
  };

  const fetchBookingDetails = async (bookingId) => {
    try {
      setDetailsLoading(true);
      const baseURL =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

      const { data } = await axios.get(
        `${baseURL}/api/v1/bookings/${bookingId}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        setSelectedBooking(data.data);
        setShowBookingDetails(true);
      } else {
        toast.error(data.message || "Failed to fetch booking details");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Unable to fetch booking details. Please try again.";
      toast.error(errorMessage);
    } finally {
      setDetailsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-green-900/30 text-green-400 border-green-400/20";
      case "pending":
        return "bg-yellow-900/30 text-yellow-400 border-yellow-400/20";
      case "cancelled":
        return "bg-red-900/30 text-red-400 border-red-400/20";
      case "completed":
        return "bg-blue-900/30 text-blue-400 border-blue-400/20";
      case "ongoing":
        return "bg-purple-900/30 text-purple-400 border-purple-400/20";
      default:
        return "bg-gray-900/30 text-gray-400 border-gray-400/20";
    }
  };

  const getCurrentBookings = () => {
    return bookings[view] || [];
  };

  const handleViewDetails = (booking) => {
    fetchBookingDetails(booking._id);
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const baseURL =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

      const { data } = await axios.put(
        `${baseURL}/api/v1/bookings/cancel/${bookingId}`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        toast.success("Booking cancelled successfully");
        // Refresh bookings to update the status
        fetchBookings();
      } else {
        toast.error(data.message || "Failed to cancel booking");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Unable to cancel booking. Please try again.";
      toast.error(errorMessage);
    }
  };

  // Get dynamic details based on service type
  const getServiceSpecificDetails = (booking) => {
    if (!booking) return [];

    const details = [];
    const serviceType = booking.rideType?.toLowerCase();

    // Common details for all services
    details.push(
      { label: "Booking ID", value: booking._id },
      { label: "Service Type", value: booking.rideType || "N/A" },
      { label: "Status", value: booking.status, isStatus: true },
      {
        label: "Pickup Location",
        value: booking.pickUp?.address || booking.pickupLocation || "N/A",
      }
    );

    // Service-specific details
    switch (serviceType) {
      case "hourly":
      case "hourly-rental": {
        details.push(
          {
            label: "Duration",
            value: `${booking.durationHrs || booking.duration || 0} hours`,
          },
          {
            label: "Start Time",
            value:
              booking.startTimeFormatted || formatDateTime(booking.startTime),
          }
        );

        // Only show drop location if different from pickup
        const dropAddress = booking.dropOff?.address || booking.dropLocation;
        const pickupAddress = booking.pickUp?.address || booking.pickupLocation;
        if (dropAddress && dropAddress !== pickupAddress) {
          details.push({ label: "Drop Location", value: dropAddress });
        }
        break;
      }

      case "outstation":
      case "outstation-trip":
        details.push(
          {
            label: "Destination",
            value: booking.dropOff?.address || booking.dropLocation || "N/A",
          },
          {
            label: "Trip Type",
            value: booking.isRoundTrip ? "Round Trip" : "One Way",
          },
          {
            label: "Start Time",
            value:
              booking.startTimeFormatted || formatDateTime(booking.startTime),
          }
        );

        if (
          booking.isRoundTrip &&
          (booking.returnTimeFormatted || booking.returnTime)
        ) {
          details.push({
            label: "Return Time",
            value:
              booking.returnTimeFormatted || formatDateTime(booking.returnTime),
          });
        }

        if (booking.distance) {
          details.push({ label: "Distance", value: `${booking.distance} km` });
        }
        break;

      case "airport-transfer":
      case "airport":
        details.push(
          {
            label: "Transfer Type",
            value:
              booking.transferType === "airport-to-city"
                ? "Airport to City"
                : "City to Airport",
          },
          {
            label:
              booking.transferType === "airport-to-city"
                ? "Destination"
                : "Airport",
            value: booking.dropOff?.address || booking.dropLocation || "N/A",
          },
          {
            label: "Pickup Time",
            value:
              booking.startTimeFormatted || formatDateTime(booking.startTime),
          }
        );

        if (booking.flightNumber) {
          details.push({ label: "Flight Number", value: booking.flightNumber });
        }
        break;

      case "cab-booking":
      case "cab":
        details.push(
          {
            label: "Drop Location",
            value: booking.dropOff?.address || booking.dropLocation || "N/A",
          },
          {
            label: "Pickup Time",
            value:
              booking.startTimeFormatted || formatDateTime(booking.startTime),
          }
        );
        break;

      default:
        // Default case for unknown service types
        details.push(
          {
            label: "Drop Location",
            value: booking.dropOff?.address || booking.dropLocation || "N/A",
          },
          {
            label: "Start Time",
            value:
              booking.startTimeFormatted || formatDateTime(booking.startTime),
          }
        );

        if (booking.duration) {
          details.push({ label: "Duration", value: booking.duration });
        }
    }

    // Add vehicle and passenger information
    if (booking.carType) {
      details.push({ label: "Vehicle Type", value: booking.carType });
    }

    if (booking.passengerCount) {
      details.push({ label: "Passengers", value: booking.passengerCount });
    }

    if (booking.luggageCount) {
      details.push({ label: "Luggage", value: booking.luggageCount });
    }

    // Add fare information
    if (booking.fareInRupees || booking.payment?.amount) {
      details.push({
        label: "Total Fare",
        value: booking.fareInRupees
          ? `₹${booking.fareInRupees}`
          : `₹${(booking.payment.amount / 100).toFixed(2)}`,
        isFare: true,
      });
    }

    // Add payment status
    if (booking.payment?.paymentStatus) {
      details.push({
        label: "Payment Status",
        value:
          booking.payment.paymentStatus.charAt(0).toUpperCase() +
          booking.payment.paymentStatus.slice(1),
        isPaymentStatus: true,
      });
    }

    // Add creation date
    if (booking.createdAtFormatted || booking.createdAt) {
      details.push({
        label: "Booked On",
        value: booking.createdAtFormatted || formatDateTime(booking.createdAt),
      });
    }

    return details;
  };

  // Helper function to format date time
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "N/A";
    try {
      const date = new Date(dateTimeString);
      return date.toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return "N/A";
    }
  };

  // Get dynamic modal title based on service type
  const getModalTitle = (booking) => {
    if (!booking) return "Booking Details";

    const serviceType = booking.rideType?.toLowerCase();
    switch (serviceType) {
      case "hourly":
      case "hourly-rental":
        return "Hourly Rental Details";
      case "outstation":
      case "outstation-trip":
        return "Outstation Trip Details";
      case "airport-transfer":
      case "airport":
        return "Airport Transfer Details";
      case "cab-booking":
      case "cab":
        return "Cab Booking Details";
      default:
        return "Booking Details";
    }
  };

  const BookingDetailsModal = () => {
    if (!showBookingDetails || !selectedBooking) return null;

    const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) {
        setShowBookingDetails(false);
      }
    };

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
        onClick={handleBackdropClick}
      >
        <div className="bg-[#111] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white pr-4">
                {getModalTitle(selectedBooking)}
              </h3>
              <button
                onClick={() => setShowBookingDetails(false)}
                className="text-gray-400 hover:text-white transition-colors duration-200 p-1 hover:bg-gray-800 rounded-full flex-shrink-0 w-8 h-8 flex items-center justify-center"
                aria-label="Close modal"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {detailsLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B8A171] mx-auto"></div>
                <p className="text-gray-400 mt-2">Loading details...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {getServiceSpecificDetails(selectedBooking).map(
                    (detail, index) => (
                      <div key={index}>
                        <span className="text-gray-400">{detail.label}:</span>
                        {detail.isStatus ? (
                          <span
                            className={`ml-2 px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                              detail.value
                            )}`}
                          >
                            {detail.value}
                          </span>
                        ) : detail.isFare ? (
                          <p className="text-gradient font-bold text-lg">
                            {detail.value}
                          </p>
                        ) : detail.isPaymentStatus ? (
                          <span
                            className={`ml-2 px-2 py-1 text-xs font-medium rounded-full border ${
                              detail.value.toLowerCase() === "paid"
                                ? "bg-green-900/30 text-green-400 border-green-400/20"
                                : detail.value.toLowerCase() === "pending"
                                ? "bg-yellow-900/30 text-yellow-400 border-yellow-400/20"
                                : "bg-red-900/30 text-red-400 border-red-400/20"
                            }`}
                          >
                            {detail.value}
                          </span>
                        ) : (
                          <p className="text-white font-semibold">
                            {detail.value}
                          </p>
                        )}
                      </div>
                    )
                  )}
                </div>

                {/* Additional service-specific information */}
                {selectedBooking.rideType?.toLowerCase() === "outstation" &&
                  selectedBooking.stops &&
                  selectedBooking.stops.length > 0 && (
                    <div>
                      <span className="text-gray-400">
                        Stops (
                        {selectedBooking.stopsCount ||
                          selectedBooking.stops.length}
                        ):
                      </span>
                      <div className="mt-2 space-y-1">
                        {selectedBooking.stops.map((stop, index) => (
                          <p
                            key={index}
                            className="text-white bg-[#222] p-2 rounded"
                          >
                            {index + 1}.{" "}
                            {typeof stop === "string"
                              ? stop
                              : stop.location || stop.address || stop}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Add-ons information - Dynamic based on actual add-ons */}
                {selectedBooking.addOns &&
                  (() => {
                    const activeAddOns = [];

                    if (selectedBooking.addOns.placard?.required) {
                      activeAddOns.push({
                        text: `Placard Message${
                          selectedBooking.addOns.placard.text
                            ? `: ${selectedBooking.addOns.placard.text}`
                            : ""
                        }`,
                      });
                    }

                    if (
                      selectedBooking.addOns.pets?.dogs ||
                      selectedBooking.addOns.pets?.cats
                    ) {
                      const pets = [];
                      if (selectedBooking.addOns.pets.dogs) pets.push("Dogs");
                      if (selectedBooking.addOns.pets.cats) pets.push("Cats");
                      activeAddOns.push({
                        text: `Pets: ${pets.join(", ")}`,
                      });
                    }

                    if (selectedBooking.addOns.childSeat) {
                      activeAddOns.push({
                        text: "Child Seat Required",
                      });
                    }

                    if (selectedBooking.addOns.airportToll) {
                      activeAddOns.push({
                        text: "Airport Toll Included",
                      });
                    }

                    if (selectedBooking.addOns.bookForOther?.isBooking) {
                      activeAddOns.push({
                        text: `Booking for: ${
                          selectedBooking.addOns.bookForOther.otherGuestInfo ||
                          "Someone else"
                        }`,
                      });
                    }

                    return activeAddOns.length > 0 ? (
                      <div>
                        <span className="text-gray-400">Add-ons:</span>
                        <div className="mt-2 space-y-1">
                          {activeAddOns.map((addOn, index) => (
                            <p
                              key={index}
                              className="text-white bg-[#222] p-2 rounded text-sm"
                            >
                              {addOn.text}
                            </p>
                          ))}
                        </div>
                      </div>
                    ) : null;
                  })()}

                {/* Location Details - Show coordinates if available */}
                {(selectedBooking.pickUp?.location ||
                  selectedBooking.dropOff?.location) && (
                  <div>
                    <span className="text-gray-400">Location Details:</span>
                    <div className="mt-2 space-y-2">
                      {selectedBooking.pickUp?.location && (
                        <div className="text-white bg-[#222] p-2 rounded text-sm">
                          <strong>Pickup:</strong>{" "}
                          {selectedBooking.pickUp.address}
                          <br />
                          <span className="text-gray-400 text-xs">
                            Coordinates:{" "}
                            {selectedBooking.pickUp.location.coordinates[1]},{" "}
                            {selectedBooking.pickUp.location.coordinates[0]}
                          </span>
                        </div>
                      )}
                      {selectedBooking.dropOff?.location && (
                        <div className="text-white bg-[#222] p-2 rounded text-sm">
                          <strong>Drop:</strong>{" "}
                          {selectedBooking.dropOff.address}
                          <br />
                          <span className="text-gray-400 text-xs">
                            Coordinates:{" "}
                            {selectedBooking.dropOff.location.coordinates[1]},{" "}
                            {selectedBooking.dropOff.location.coordinates[0]}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Payment Details */}
                {selectedBooking.payment && (
                  <div>
                    <span className="text-gray-400">Payment Information:</span>
                    <div className="text-white bg-[#222] p-3 rounded mt-1 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Method:</span>
                        <span className="capitalize">
                          {selectedBooking.payment.paymentMethod || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <span className="text-gradient font-bold">
                          ₹
                          {selectedBooking.fareInRupees ||
                            (selectedBooking.payment.amount / 100).toFixed(2)}
                        </span>
                      </div>
                      {selectedBooking.payment.orderId && (
                        <div className="flex justify-between">
                          <span>Order ID:</span>
                          <span className="font-mono text-xs">
                            {selectedBooking.payment.orderId}
                          </span>
                        </div>
                      )}
                      {selectedBooking.payment.paymentId && (
                        <div className="flex justify-between">
                          <span>Payment ID:</span>
                          <span className="font-mono text-xs">
                            {selectedBooking.payment.paymentId}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-[#262626] rounded-[0.3rem] p-8 mt-[5.5rem]">
        <div className="text-center animate-pulse space-y-4">
          <div className="h-4 bg-gray-600 rounded w-1/4 mx-auto"></div>
          <div className="h-20 bg-gray-600 rounded"></div>
          <div className="h-20 bg-gray-600 rounded"></div>
        </div>
      </div>
    );
  }

  const currentBookings = getCurrentBookings();

  return (
    <>
      <div className="space-y-6 mt-[5.5rem]">
        <div className="bg-black rounded-[0.3rem] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-gradient mb-2">
                My Bookings
              </h2>
              <p className="text-gray-400">
                View and manage your ride bookings
              </p>
            </div>
            <PrimaryButton
              className="px-6 py-2 rounded-[0.3rem]"
              onClick={() => (window.location.href = "/")}
            >
              Book New Ride
            </PrimaryButton>
          </div>

          {/* Toggle Tabs */}
          <div className="bg-[#1a1a1a] rounded-full p-1 flex gap-2 w-fit mb-6">
            <button
              onClick={() => setView("active")}
              className={`px-4 py-1 text-sm rounded-full font-medium ${
                view === "active" ? "btn-gradient text-black" : "text-white"
              }`}
            >
              Active ({bookings.active.length})
            </button>
            <button
              onClick={() => setView("past")}
              className={`px-4 py-1 text-sm rounded-full font-medium ${
                view === "past" ? "btn-gradient text-black" : "text-white"
              }`}
            >
              Past ({bookings.past.length})
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 text-sm text-red-400 bg-red-900/20 border border-red-400/20 rounded-[0.3rem]">
              {error}
            </div>
          )}

          {currentBookings.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#B8A171] to-[#FFF2CC] rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-black"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l6.518 11.598c.75 1.335-.213 2.998-1.742 2.998H3.481c-1.529 0-2.492-1.663-1.742-2.998L8.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-.293-4.707a1 1 0 00-1.414 1.414L9.586 11h.828l.293-.293a1 1 0 00-.293-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">
                No Bookings Found
              </h3>
              <p className="text-gray-400 mb-6">
                You don’t have any {view === "active" ? "upcoming" : "past"}{" "}
                bookings.
              </p>
              <PrimaryButton
                className="px-6 py-3 rounded-[0.3rem]"
                onClick={() => (window.location.href = "/")}
              >
                Book a Ride
              </PrimaryButton>
            </div>
          ) : (
            <div className="space-y-4">
              {currentBookings.map((booking, index) => (
                <div
                  key={booking._id || index}
                  className="bg-[#111] rounded-[0.3rem] p-5 border border-gray-700 flex flex-col sm:flex-row justify-between gap-4"
                >
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-1">
                      Trip ID: {booking._id || "N/A"}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-white">
                        {booking.rideType
                          ? booking.rideType.charAt(0).toUpperCase() +
                            booking.rideType.slice(1)
                          : "Ride Booking"}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status || "Pending"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-300">
                      <div>
                        <span className="text-gray-400">From:</span>{" "}
                        {booking.pickupLocation || "N/A"}
                      </div>
                      <div>
                        <span className="text-gray-400">To:</span>{" "}
                        {booking.dropLocation || "N/A"}
                      </div>
                      <div>
                        <span className="text-gray-400">Start Time:</span>{" "}
                        {booking.startTime
                          ? new Date(booking.startTime).toLocaleDateString() +
                            " " +
                            new Date(booking.startTime).toLocaleTimeString()
                          : "N/A"}
                      </div>
                      <div>
                        <span className="text-gray-400">Duration:</span>{" "}
                        {booking.rideType === "hourly"
                          ? `${booking.durationHrs || 0} hours`
                          : booking.isRoundTrip
                          ? "Round Trip"
                          : "One Way"}
                      </div>
                    </div>

                    {booking.payment?.amount && (
                      <div className="mt-3 text-sm text-gray-400">
                        Total Fare:{" "}
                        <span className="text-gradient font-semibold">
                          ₹{(booking.payment.amount / 100).toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 justify-center">
                    <button
                      onClick={() => handleViewDetails(booking)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-[0.3rem] text-sm transition"
                    >
                      View Details
                    </button>
                    {booking.status?.toLowerCase() === "pending" && (
                      <button
                        onClick={() => handleCancelBooking(booking._id)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-[0.3rem] text-sm transition"
                      >
                        Cancel
                      </button>
                    )}
                    {booking.status?.toLowerCase() === "completed" && (
                      <button className="border-gradient-primary px-4 py-2 rounded-md text-sm transition">
                        Reload Trip →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-black rounded-[0.3rem] p-4 text-center">
            <div className="text-2xl font-bold text-gradient mb-1">
              {statistics.totalBookings || 0}
            </div>
            <div className="text-sm text-gray-400">Total Bookings</div>
          </div>
          <div className="bg-black rounded-[0.3rem] p-4 text-center">
            <div className="text-2xl font-bold text-gradient mb-1">
              {bookings.past.length}
            </div>
            <div className="text-sm text-gray-400">Completed</div>
          </div>
          <div className="bg-black rounded-[0.3rem] p-4 text-center">
            <div className="text-2xl font-bold text-gradient mb-1">
              {bookings.active.length}
            </div>
            <div className="text-sm text-gray-400">Active</div>
          </div>
        </div>
      </div>

      {/* Booking Details Modal */}
      <BookingDetailsModal />
    </>
  );
};

export default Bookings;
