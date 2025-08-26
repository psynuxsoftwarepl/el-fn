import Footer from "@/layouts/Footer";
import React from "react";

const NotFound = () => {
  return (
    <>
      <div className="flex items-center justify-center w-full text-5xl md:text-8xl h-screen text-gradient">
        Page Not Found
      </div>
      <Footer bgColor={"bg-[#1A1A1A]"} />
    </>
  );
};

export default NotFound;
