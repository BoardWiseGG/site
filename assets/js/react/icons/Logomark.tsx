import * as React from "react";

const SvgComponent = ({ invert = false, size = 25, ...props }) => {
  const color = invert ? "rgb(255, 255, 255)" : "rgb(10 10 10)";
  const radius = 5;
  const roundedTopRightPath = `
    M ${size / 2} 0
    H ${size - radius}
    Q ${size} 0, ${size} ${radius}
    V ${size / 2}
    H ${size / 2}
    Z`;
  const roundedBottomLeftPath = `
    M 0 ${size - radius}
    Q 0 ${size}, ${radius} ${size}
    H ${size / 2}
    V ${size / 2}
    H 0
    Z`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      {...props}
    >
      <path d={roundedTopRightPath} fill={color} />
      <path d={roundedBottomLeftPath} fill={color} />
    </svg>
  );
};
export default SvgComponent;
