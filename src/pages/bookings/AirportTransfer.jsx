// import React, { useState } from "react";
import Navbar from "@/layouts/Navbar";
import AirportForm from "@/components/forms/AirportForm";
import Footer from "@/layouts/Footer";

const AirportTransfers = () => {
  // const [isAvailable, setIsAvailable] = useState(false);
  return (
    <div className="relative overflow-hidden bg-background">
      <Navbar />
      <AirportForm />
      <Footer bgColor="bg-[#1A1A1A]" />
    </div>
  );
};

export default AirportTransfers;
