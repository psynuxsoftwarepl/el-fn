import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TripHistory = () => {
  const [bookings, setBookings] = useState({
    active: [],
    past: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("active");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const baseURL =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

      const { data } = await axios.get(`${baseURL}/api/v1/bookings`, {
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
    } finally {
      setLoading(false);
    }
  };

  const data = bookings[tab] || [];

  if (loading) {
    return (
      <div className="my-container py-10">
        <div className="text-center animate-pulse space-y-4">
          <div className="h-4 bg-gray-600 rounded w-1/4 mx-auto"></div>
          <div className="h-20 bg-gray-600 rounded"></div>
          <div className="h-20 bg-gray-600 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-container py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gradient">All Trips</h2>
        <div className="bg-[#1a1a1a] rounded-full p-1 flex gap-1">
          <button
            onClick={() => setTab("active")}
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              tab === "active" ? "btn-gradient text-black" : "text-white"
            }`}
          >
            Active ({bookings.active.length})
          </button>
          <button
            onClick={() => setTab("past")}
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              tab === "past" ? "btn-gradient text-black" : "text-white"
            }`}
          >
            Past ({bookings.past.length})
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 text-sm text-red-400 bg-red-900/20 border border-red-400/20 rounded-lg">
          {error}
        </div>
      )}

      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[300px]">
          <div className="text-5xl mb-4">⚠️</div>
          <p className="text-lg text-gray-400">
            No {tab === "active" ? "Upcoming" : "Past"} Rides
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((trip) => (
            <div
              key={trip._id}
              className="bg-[#111] rounded-lg p-5 flex justify-between items-center shadow-md"
            >
              <div>
                <p className="text-sm text-gray-500">Trip ID: {trip._id}</p>
                <h3 className="text-lg font-medium mt-1">
                  {trip.rideType
                    ? trip.rideType.charAt(0).toUpperCase() +
                      trip.rideType.slice(1)
                    : "Ride"}{" "}
                  -{trip.pickupLocation} to {trip.dropLocation}
                </h3>
                <p className="text-sm text-gray-400">
                  {trip.startTime
                    ? new Date(trip.startTime).toLocaleDateString() +
                      " - " +
                      new Date(trip.startTime).toLocaleTimeString()
                    : "Time not specified"}
                </p>
                <p className="text-sm text-gray-300 mt-1">
                  Total Fare:{" "}
                  <span className="text-white">
                    ₹
                    {trip.payment?.amount
                      ? (trip.payment.amount / 100).toFixed(2)
                      : "N/A"}
                  </span>
                </p>
                <span
                  className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                    trip.status === "completed"
                      ? "bg-green-900/30 text-green-400"
                      : trip.status === "pending"
                      ? "bg-yellow-900/30 text-yellow-400"
                      : trip.status === "cancelled"
                      ? "bg-red-900/30 text-red-400"
                      : "bg-gray-900/30 text-gray-400"
                  }`}
                >
                  {trip.status || "Pending"}
                </span>
              </div>
              <button className="border-gradient-primary px-4 py-2 rounded-md text-sm hover:scale-105 transition-all">
                View Details →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripHistory;
