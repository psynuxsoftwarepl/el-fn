import React, { useRef, useEffect, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";

const AutocompleteInput = ({ 
  value, 
  onChange, 
  placeholder, 
  className, 
  icon: Icon,
  name,
  onPlaceSelect,
  isLoaded = true
}) => {
  const autocompleteRef = useRef(null);
  const [inputValue, setInputValue] = useState(value || "");

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      
      if (place.geometry && place.formatted_address) {
        const addressData = {
          address: place.formatted_address,
          coordinates: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
          placeId: place.place_id
        };

        setInputValue(place.formatted_address);
        
        if (onChange) {
          const event = {
            target: {
              name: name,
              value: place.formatted_address
            }
          };
          onChange(event);
        }

        if (onPlaceSelect) {
          onPlaceSelect(addressData);
        }
      }
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    if (onChange) {
      const event = {
        target: {
          name: name,
          value: newValue
        }
      };
      onChange(event);
    }
  };

  if (!isLoaded) {
    return (
      <div className="relative w-full">
        {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />}
        <input
          type="text"
          name={name}
          value={inputValue}
          onChange={handleInputChange}
          className={className}
          placeholder={placeholder}
          disabled
        />
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 z-10" />}
      <Autocomplete
        onLoad={(autocomplete) => {
          autocompleteRef.current = autocomplete;
          autocomplete.setOptions({
            types: ["establishment", "geocode"],
            componentRestrictions: { country: "IN" },
          });
        }}
        onPlaceChanged={onPlaceChanged}
      >
        <input
          type="text"
          name={name}
          value={inputValue}
          onChange={handleInputChange}
          className={className}
          placeholder={placeholder}
        />
      </Autocomplete>
    </div>
  );
};

export default AutocompleteInput;
