import React from "react";
import Navbar from "@/layouts/Navbar";
import HourlyRentalForm from "@/components/forms/HourlyRentalForm";
import Footer from "@/layouts/Footer";
const HourlyRental = () => {
  return (
    <>
      <div className="relative overflow-hidden bg-background">
        <Navbar />
        <HourlyRentalForm />
        <Footer bgColor={"bg-[#1A1A1A]"} />
      </div>
    </>
  );
};

export default HourlyRental;
