import React from "react";
import clsx from "clsx";

const HeroSection = ({ children, className, ...props }) => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div
        className={clsx(
          "absolute inset-0 bg-cover bg-no-repeat z-0",
          className
        )}
        {...props}
      ></div>

      <div
        className="hidden md:flex absolute top-0 left-0 w-full h-[183px] pointer-events-none z-10"
        style={{
          background: `linear-gradient(180deg, #000000 0%, rgba(9, 9, 9, 0.79) 52.4%, rgba(14, 14, 14, 0.38) 78.37%, rgba(18, 18, 18, 0) 100%)`,
        }}
      ></div>

      <div
        className="absolute bottom-0 left-0 w-full h-[341px] pointer-events-none z-10"
        style={{
          background: `linear-gradient(0deg, #141414 0%, rgba(9, 9, 9, 0.91) 51.44%, rgba(13, 13, 13, 0.54) 73.56%, rgba(18, 18, 18, 0) 100%)`,
        }}
      ></div>

      <div className="absolute bottom-0 z-20 flex flex-col items-center justify-center w-full h-[341px] px-4 text-center">
        {children}
      </div>
    </div>
  );
};

export default HeroSection;
