import React from "react";

const AmenitiesSection = () => {
  const amenities = [
    {
      id: 1,
      label: "Comfort Seats",
      icon: "/assets/Vector-1.svg",
    },
    {
      id: 2,
      label: "Chilled AC",
      icon: "/assets/Vector-2.svg",
    },
    {
      id: 3,
      label: "Extra Clean",
      icon: "/assets/Group-2.svg",
    },
    {
      id: 4,
      label: "Sweet Treats",
      icon: "/assets/Group.svg",
    },
    {
      id: 5,
      label: "Water Bottle",
      icon: "/assets/Vector.svg",
    },
    {
      id: 6,
      label: "Magazines",
      icon: "/assets/Vector-3.svg",
    },
    {
      id: 7,
      label: "Paper Towels",
      icon: "/assets/Group-1.svg",
    },
    {
      id: 8,
      label: "Charging Points",
      icon: "/assets/Vector-4.svg",
    },
    {
      id: 9,
      label: "Your Music",
      icon: "/assets/Group-3.svg",
    },
  ];

  return (
    <>
      {/* Explore Our In-car Amenities */}
      <div className="my-container mb-15 text-center">
        <h2 className="text-gradient mb-6 text-2xl font-medium sm:text-3xl md:text-4xl">
          Explore Our In-car Amenities
        </h2>
        <div className="grid grid-cols-3 gap-x-4 gap-y-8 rounded-lg bg-[#111111] p-6 sm:gap-x-8 sm:gap-y-10 sm:p-8 md:gap-y-12 md:p-12">
          {amenities.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-start gap-2 text-white transition-transform duration-300 ease-in-out hover:scale-105"
            >
              {/* Icon */}
              <div className="rounded-full p-3 sm:p-4">
                <img
                  src={item.icon}
                  alt={item.label}
                  className="h-8 w-8 object-contain sm:h-10 sm:w-10 md:h-12 md:w-12"
                />
              </div>

              {/* Label */}
              <p className="mt-1 text-center text-xs font-light sm:text-sm">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AmenitiesSection;
