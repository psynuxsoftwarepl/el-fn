import React from "react";
import Navbar from "@/layouts/Navbar";
import OutStationForm from "@/components/forms/OutStationForm";
import Footer from "@/layouts/Footer";

const OutstationTrips = () => {
  return (
    <>
      <div className="relative overflow-hidden bg-background">
        <Navbar />
        <OutStationForm />
        <Footer bgColor={"bg-[#1A1A1A]"} />
      </div>
    </>
  );
};

export default OutstationTrips;
