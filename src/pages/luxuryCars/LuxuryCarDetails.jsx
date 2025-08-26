import React from "react";
import { useParams } from "react-router-dom";
import carData from "./luxuryCarData"; 
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
import PricingTable from "./PricingTable"; 

const LuxuryCarDetails = () => {
  const { id } = useParams();
  const car = carData.find((c) => c.id === parseInt(id));

  if (!car) {
    return <div className="text-white text-center mt-10">Car not found</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 pt-28 pb-16">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
          <img
            src={car.img}
            alt={car.name}
            className="w-full max-w-md md:w-1/2" 
          />
          <h1 className="text-4xl md:text-5xl font-bold text-center md:text-left">
            {car.name}
          </h1>
        </div>

       
        <PricingTable
          title="City Rental"
          columns={car.cityRental.columns}
          values={car.cityRental.values}
        />

       
        <PricingTable
          title="Wedding"
          columns={car.wedding.columns}
          values={car.wedding.values}
        />
      </div>

      <Footer bgColor="bg-[#1A1A1A]" />
    </div>
  );
};

export default LuxuryCarDetails;