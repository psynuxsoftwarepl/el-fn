import React from "react";

const IconMap = (props) => (
  <svg
    width={27}
    height={26}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"
      stroke="url(#mapGradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="mapGradient"
        x1="5"
        y1="2"
        x2="19"
        y2="22"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFE3E5" />
        <stop offset="1" stopColor="#BB878B" />
      </linearGradient>
    </defs>
  </svg>
);

export default IconMap;
