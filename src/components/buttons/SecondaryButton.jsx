import React from "react";
import clsx from "clsx";

const SecondaryButton = ({ children, className, ...props }) => {
  return (
    <div
      className={clsx(
        "inline-flex bg-gradient-to-r from-[#B8A171] to-[#FFF2CC] p-[1px] rounded-full",
        className
      )}
      {...props}
    >
      <div className="rounded-full bg-background hover:bg-transparent w-full hover:text-black">
        {children}
      </div>
    </div>
  );
};

export default SecondaryButton;
