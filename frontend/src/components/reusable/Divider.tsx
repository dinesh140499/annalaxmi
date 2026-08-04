import React from 'react';

interface Line {
  height?: number;
  marginY?: string;
  marginX?: string;
  bgColor?: string;
}

const Divider: React.FC<Line> = ({
  height = 1,
  marginY = 'my-5',
  marginX = 'mx-0',
  bgColor = 'bg-[#E6E6E6]'
}) => {
  return (
    <div
      className={`w-full ${marginY} ${marginX} ${bgColor}`}
      style={{ height: `${height}px` }}
    />
  );
};

export default Divider;
