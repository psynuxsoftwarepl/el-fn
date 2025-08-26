import React, { useEffect, useState } from "react";
import { LoadScript } from "@react-google-maps/api";

const libraries = ["places"];

const GoogleMapsProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadAttempted, setLoadAttempted] = useState(false);

  useEffect(() => {
    // Check if Google Maps API is fully loaded with all required components
    const checkGoogleMapsReady = () => {
      return (
        window.google &&
        window.google.maps &&
        window.google.maps.Map &&
        window.google.maps.Geocoder &&
        window.google.maps.DirectionsService &&
        window.google.maps.places
      );
    };

    if (checkGoogleMapsReady()) {
      setIsLoaded(true);
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector(
      'script[src*="maps.googleapis.com"]'
    );
    if (existingScript && !loadAttempted) {
      setLoadAttempted(true);

      const handleLoad = () => {
        // Wait a bit for all APIs to be ready
        setTimeout(() => {
          if (checkGoogleMapsReady()) {
            setIsLoaded(true);
          }
        }, 100);
        existingScript.removeEventListener("load", handleLoad);
      };

      existingScript.addEventListener("load", handleLoad);

      return () => {
        existingScript.removeEventListener("load", handleLoad);
      };
    }
  }, [loadAttempted]);

  // Only render children if Google Maps is fully loaded
  if (isLoaded) {
    return <>{children}</>;
  }

  // If we haven't attempted to load yet, or if there's no existing script, use LoadScript
  if (!loadAttempted) {
    return (
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
        onLoad={() => {
          // Double-check that all APIs are ready
          setTimeout(() => {
            const checkGoogleMapsReady = () => {
              return (
                window.google &&
                window.google.maps &&
                window.google.maps.Map &&
                window.google.maps.Geocoder &&
                window.google.maps.DirectionsService &&
                window.google.maps.places
              );
            };

            if (checkGoogleMapsReady()) {
              setIsLoaded(true);
            }
          }, 100);
        }}
        onError={(error) => {
          console.error("Google Maps script loading error:", error);
          setLoadAttempted(false); // Allow retry
        }}
        preventGoogleFontsLoading
        loadingElement={
          <div className="flex items-center justify-center h-96 text-white">
            Loading Google Maps...
          </div>
        }
      >
        {children}
      </LoadScript>
    );
  }

  // Show loading while waiting for Google Maps to be ready
  return (
    <div className="flex items-center justify-center h-96 text-white">
      Loading Google Maps...
    </div>
  );
};

export default GoogleMapsProvider;
