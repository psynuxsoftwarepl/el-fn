import React, { useEffect, useState, useCallback } from "react";
import {
  GoogleMap,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 20.5937,
  lng: 78.9629,
};

const Map = ({
  pickupAddress,
  dropAddress,
  stopAddresses = [],
  setDistance,
  setDuration,
  setFare,
}) => {
  const [directions, setDirections] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mapsLoaded, setMapsLoaded] = useState(false);

  // Check if Google Maps API is loaded
  useEffect(() => {
    const checkMapsLoaded = () => {
      if (
        window.google &&
        window.google.maps &&
        window.google.maps.Map &&
        window.google.maps.Geocoder &&
        window.google.maps.DirectionsService
      ) {
        setMapsLoaded(true);
      } else {
        // Wait a bit and check again, but don't check forever
        const checkCount = checkMapsLoaded.checkCount || 0;
        if (checkCount < 50) {
          // Max 5 seconds of checking
          checkMapsLoaded.checkCount = checkCount + 1;
          setTimeout(checkMapsLoaded, 100);
        } else {
          console.warn("Google Maps API failed to load completely");
        }
      }
    };
    checkMapsLoaded();
  }, []);

  const geocodeAddress = (address) => {
    return new Promise((resolve) => {
      if (
        !address ||
        address.trim() === "" ||
        !window.google ||
        !window.google.maps
      ) {
        resolve(null);
        return;
      }

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK" && results[0]) {
          resolve({
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
            address: results[0].formatted_address,
          });
        } else {
          console.warn(
            `Geocoding failed for address: ${address}, Status: ${status}`
          );
          resolve(null);
        }
      });
    });
  };

  const calculateRoute = useCallback(async () => {
    if (
      !pickupAddress ||
      !dropAddress ||
      !mapsLoaded ||
      !window.google ||
      !window.google.maps
    ) {
      setDirections(null);
      return;
    }

    setLoading(true);

    try {
      const pickupLocation = await geocodeAddress(pickupAddress);
      const dropLocation = await geocodeAddress(dropAddress);

      if (!pickupLocation || !dropLocation) {
        console.warn("Could not geocode pickup or drop location");
        setLoading(false);
        return;
      }

      const stopLocations = [];
      for (const stopAddress of stopAddresses) {
        if (stopAddress && stopAddress.trim() !== "") {
          const stopLocation = await geocodeAddress(stopAddress);
          if (stopLocation) {
            stopLocations.push(stopLocation);
          }
        }
      }

      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: { lat: pickupLocation.lat, lng: pickupLocation.lng },
          destination: { lat: dropLocation.lat, lng: dropLocation.lng },
          waypoints: stopLocations.map((loc) => ({
            location: { lat: loc.lat, lng: loc.lng },
          })),
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);

            const route = result.routes[0].legs;
            const totalDistance = route.reduce(
              (sum, leg) =>
                sum + parseFloat(leg.distance.text.replace(" km", "")),
              0
            );
            const totalDuration = route.reduce(
              (sum, leg) =>
                sum + parseFloat(leg.duration.text.replace(" mins", "")),
              0
            );

            if (setDistance) setDistance(totalDistance.toFixed(1));
            if (setDuration) setDuration(totalDuration.toFixed(1));

            const mockFare = (
              50 +
              totalDistance * 12 +
              totalDuration * 2
            ).toFixed(2);
            if (setFare) setFare(mockFare);
          } else {
            console.error("Directions request failed due to " + status);
            setDirections(null);
          }
          setLoading(false);
        }
      );
    } catch (error) {
      console.error("Error calculating route:", error);
      setLoading(false);
    }
  }, [
    pickupAddress,
    dropAddress,
    stopAddresses,
    mapsLoaded,
    setDistance,
    setDuration,
    setFare,
  ]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (mapsLoaded) {
        calculateRoute();
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [calculateRoute, mapsLoaded]);

  return (
    <div className="space-y-4">
      <div className="bg-[linear-gradient(132.73deg,#B8A171_0%,#FFF2CC_100%)] p-[2px] rounded-lg">
        <div className="rounded-lg overflow-hidden bg-background relative">
          {loading && (
            <div className="absolute top-2 left-2 z-10 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
              Calculating route...
            </div>
          )}
          {!mapsLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white text-sm">
              Loading Google Maps...
            </div>
          )}
          {mapsLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={directions ? undefined : center}
              zoom={directions ? undefined : 5}
            >
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          ) : (
            <div
              style={containerStyle}
              className="bg-gray-800 flex items-center justify-center text-white"
            >
              <div className="text-center">
                <div className="mb-2">Loading Google Maps...</div>
                <div className="text-xs text-gray-400">
                  Please wait while the map loads
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Map;
