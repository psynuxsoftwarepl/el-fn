import React from "react";
import clsx from "clsx";

const SectionEnd = ({ className, ...props }) => {
  return (
    <>
      {/* For small screens */}
      <img
        src="/assets/Line.svg"
        alt="section end mobile"
        className={clsx("block sm:hidden max-w-[85vw] mb-10 brightness-110 hue-rotate-[-30deg] saturate-150", className)}
        {...props}
      />

      {/* For medium and larger screens */}
      <img
        src="/assets/Line.svg"
        alt="section end desktop"
        className={clsx("hidden sm:block max-w-[85vw] mb-10 brightness-110 hue-rotate-[-30deg] saturate-150", className)}
        {...props}
      />
    </>
  );
};

export default SectionEnd;
