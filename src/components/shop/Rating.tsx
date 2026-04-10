import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaStar } from "react-icons/fa";

type RatingProps = {
  isOpen: boolean;
  onToggle: () => void;
};

const Rating: React.FC<RatingProps> = ({ isOpen, onToggle }) => {
  const ratings = [5, 4, 3, 2, 1];

  const renderStars = (count: number) => (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <FaStar key={`filled-${i}`} className="text-[#FF8A00]" />
      ))}
      {Array.from({ length: 5 - count }).map((_, i) => (
        <FaStar key={`empty-${i}`} className="text-[#CCCCCC]" />
      ))}
    </>
  );

  return (
    <div className="w-full">
      <h1 className="text-sm font-bold text-green flex items-center justify-between mb-3">
        Rating
        <RiArrowDropDownLine
          className={`text-2xl cursor-pointer duration-200 ease-in-out transform ${isOpen ? "rotate-180" : ""
            }`}
          onClick={onToggle}
        />
      </h1>


      {isOpen && (
        ratings.map((rating) => (
          <div key={rating} className="flex items-center gap-1 mb-3">
            <input
              type="checkbox"
              className="accent-green-600 w-4 h-4 mr-1"
              id={`rating-${rating}`}
            />
            {renderStars(rating)}
            <label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer">
              {rating === 5 ? `${rating} .0` : `${rating} .0 & up`}
            </label>
          </div>
        ))
      )}
    </div>
  );
};

export default Rating;
