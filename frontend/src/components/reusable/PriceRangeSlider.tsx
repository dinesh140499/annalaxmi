import React, { useState, useRef, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

type PriceRangeSliderProps = {
  min: number;
  max: number;
  step?: number;
  priceGap?: number;
  initialMin?: number;
  initialMax?: number;
  thumbColor?: string;
  onChange?: (range: { min: number; max: number }) => void;
  isOpen: boolean;
  onToggle: () => void;
};

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  min,
  max,
  step = 1,
  priceGap = 0,
  initialMin = min,
  initialMax = max,
  thumbColor = "#14b8a6", 
  onChange,
  isOpen,
  onToggle,
}) => {
  const [minVal, setMinVal] = useState(initialMin);
  const [maxVal, setMaxVal] = useState(initialMax);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressRef.current) {
      const left = (minVal / max) * 100;
      const right = 100 - (maxVal / max) * 100;
      progressRef.current.style.left = `${left}%`;
      progressRef.current.style.right = `${right}%`;
    }

    onChange?.({ min: minVal, max: maxVal });
  }, [minVal, maxVal, max, onChange]);

  const handleMinChange = (value: number) => {
    const newMin = Math.min(value, maxVal - priceGap);
    setMinVal(newMin);
  };

  const handleMaxChange = (value: number) => {
    const newMax = Math.max(value, minVal + priceGap);
    setMaxVal(newMax);
  };

  return (
    <div className="w-full">
      <h1 className="text-sm font-bold text-green flex items-center justify-between mb-3">
        Price
        <RiArrowDropDownLine
          className={`text-2xl cursor-pointer duration-200 ease-in-out transform ${
            isOpen ? "rotate-180" : ""
          }`}
          onClick={onToggle}
        />
      </h1>

      {isOpen && (
        <>
          <div className="relative h-[5px] bg-[#E6E6E6] rounded -mb-1">
            <div ref={progressRef} className="absolute h-[5px] bg-green rounded" />
          </div>

          <div className="relative h-5">
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={minVal}
              onChange={(e) => handleMinChange(Number(e.target.value))}
              className="absolute w-full appearance-none pointer-events-auto bg-transparent z-20"
            />
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={maxVal}
              onChange={(e) => handleMaxChange(Number(e.target.value))}
              className="absolute w-full appearance-none pointer-events-auto bg-transparent z-10"
            />
          </div>

          <h1 className="text-sm mt-1">
            Price: ₹{minVal} - ₹{maxVal}
          </h1>
        </>
      )}

      <style>{`
        input[type='range']::-webkit-slider-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: ${thumbColor};
          cursor: pointer;
          border: 3px solid #00603A;
          margin-top: -7px;
          transition: all 0.2s ease-in-out;
        }

        input[type='range']::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: ${thumbColor};
          cursor: pointer;
          border: 3px solid #00603A;
          transition: all 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default PriceRangeSlider;
