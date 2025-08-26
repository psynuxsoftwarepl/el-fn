import React from "react";
import clsx from "clsx";

const PrimaryButton = ({ children, className, ...props }) => {
  return (
    <button
      className={clsx(
        "relative overflow-hidden btn-gradient text-black text-center font-normal group cursor-pointer transition-transform duration-200 ease-in-out hover:scale-[1.03]",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute top-0 left-[-50%] w-[50%] h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 rotate-[20deg] transition-all duration-700 ease-in-out group-hover:left-[120%] group-hover:opacity-30 pointer-events-none"></span>
    </button>
  );
};

export default PrimaryButton;
