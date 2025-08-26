import React from "react";

const HexAvatar = ({ size = 120, initial = "R" }) => {
  const width = size;
  const height = (Math.sqrt(3) / 2) * width;

  const points = `
    ${width * 0.25},0 
    ${width * 0.75},0 
    ${width},${height / 2} 
    ${width * 0.75},${height} 
    ${width * 0.25},${height} 
    0,${height / 2}
  `;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B8A171" />
          <stop offset="100%" stopColor="#FFF2CC" />
        </linearGradient>
        <filter id="hexShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="2.5" floodColor="#000" floodOpacity="0.35" />
        </filter>
      </defs>

      <polygon
        points={points}
        fill="url(#goldGradient)"
        filter="url(#hexShadow)"
        stroke="#e5d3a4"
        strokeWidth="1.5"
        style={{ rx: "10px" }}
      />

      <text
        x="50%"
        y="54%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={width * 0.35}
        fontWeight="bold"
        fill="#000"
        fontFamily="Inter, sans-serif"
      >
        {initial}
      </text>
    </svg>
  );
};

export default HexAvatar;
