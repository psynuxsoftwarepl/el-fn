import React from "react";

const FeaturesCard = () => {
  const features = [
    {
      img: "/assets/Frame 256.svg",
      title: "No cancellations",
      description: "Guaranteed Rides. Every Time.",
    },
    {
      img: "/assets/Frame 255.svg",
      title: "Experience Luxury at ₹750/Hr",
      description: "One Rate, Multiple Stops, 10Kms of Elegance",
    },
    {
      img: "/assets/Frame 258.svg",
      title: "24/7 Available",
      description: "Always On, Always Available, At your Doorstep",
    },
    {
      img: "/assets/Frame 257.svg",
      title: "Live Support",
      description: "No Scripts, No Bots, Just Real Response",
    },
    {
      img: "/assets/Frame 254.svg",
      title: "Professional Chauffeurs",
      description: "Courteous, Reliable, Always Punctual",
    },
    {
      img: "/assets/Frame 253.svg",
      title: "Pet Friendly Rides",
      description: "Because every family member matters",
    },
  ];

  return (
    <div className="my-container my-20">
      {/* Updated grid to be 2 columns from the 'sm' breakpoint and up */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 p-[0.5rem]">
        {features.map((feature, index) => (
          <div
            key={index}
            className="rounded-[12px] bg-gradient-to-r from-[#444444] to-[#5F5F5F] p-[1px] transition-transform duration-300 ease-in-out hover:scale-105"
          >
            {/* Increased padding and content size to make cards feel fuller */}
            <div className="flex w-full items-center rounded-[12px] bg-gradient-to-r from-[#1E1E1E] to-[#303030] p-6">
              <img
                src={feature.img}
                alt={feature.title}
                className="h-14 w-14 object-contain rounded-lg text-[#B8A171]"
              />
              <div className="ml-5 flex flex-col items-start justify-center">
                <h3 className="text-gradient font-semibold text-xl">
                  {feature.title}
                </h3>
                <p className="text-base text-gray-300 mt-1">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesCard;
