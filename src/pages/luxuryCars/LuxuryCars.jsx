import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import CabBookingForm from "@/components/forms/CabBookingForm";

const LuxuryCars = () => {
  const cars = [
    {
      id: 1,
      img: "/assets/LC 1.png",
      name: "Mercedes Benz E250",
      capacity: "Max Seating Capacity - 4 + 1 Driver",
    },
    {
      id: 2,
      img: "/assets/LC 2.png",
      name: "Audi A6",
      capacity: "Max Seating Capacity - 4 + 1 Driver",
    },
    {
      id: 3,
      img: "/assets/LC 3.png",
      name: "Jaguar XF",
      capacity: "Max Seating Capacity - 4 + 1 Driver",
    },
    {
      id: 4,
      img: "/assets/LC 4.png",
      name: "Audi A4",
      capacity: "Max Seating Capacity - 4 + 1 Driver",
    },
    {
      id: 5,
      img: "/assets/LC 5.png",
      name: "Audi Q3",
      capacity: "Max Seating Capacity - 4 + 1 Driver",
    },
    {
      id: 6,
      img: "/assets/LC 6.png",
      name: "Bmw 3 Series",
      capacity: "Max Seating Capacity - 4 + 1 Driver",
    },
  ];

  return (
    <>
      <div className="relative overflow-hidden bg-background">
        <Navbar />

        <div className="my-container text-center min-h-screen mb-20 flex flex-col items-center mt-30">
          <h2 className="text-gradient mb-8 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
            Luxury Cars Variants
          </h2>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 max-w-6xl mx-auto">
            {cars.map((car) => (
              <div
                key={car.id}
                className="bg-[#25262C] rounded-[0.5rem] shadow-lg overflow-hidden flex flex-col h-full w-full max-w-[410px] mx-auto"
              >
                <div className="w-full aspect-[410/246] bg-black flex items-center justify-center">
                  <img
                    src={car.img}
                    alt={car.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div className="p-4 flex flex-col items-center flex-1">
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white mb-1 lg:mb-2">
                    {car.name}
                  </h3>
                  <p className="text-[#C8C8C8] text-xs sm:text-sm md:text-base lg:text-lg mb-4">
                    {car.capacity}
                  </p>

                  <Link to={`/luxury-cars/${car.id}`} className="w-full">
                    <PrimaryButton className="py-2 px-4 text-xs sm:text-sm md:text-base lg:text-lg font-semibold rounded-full w-full">
                      Book Now
                    </PrimaryButton>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <CabBookingForm />
        <Footer bgColor={"bg-[#1A1A1A]"} />
      </div>
    </>
  );
};

export default LuxuryCars;
