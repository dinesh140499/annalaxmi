import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaStar } from "react-icons/fa";

type RatingProps = {
  isOpen: boolean;
  onToggle: () => void;
};

const Rating: React.FC<RatingProps> = ({ isOpen, onToggle }) => {
  const ratings = [5, 4, 3, 2];

  const renderStars = (count: number) => (
    <div className="flex items-center gap-0.5 text-xs text-amber-400">
      {Array.from({ length: count }).map((_, i) => (
        <FaStar key={`filled-${i}`} />
      ))}
      {Array.from({ length: 5 - count }).map((_, i) => (
        <FaStar key={`empty-${i}`} className="text-slate-200" />
      ))}
    </div>
  );

  return (
    <div className="w-full py-2">
      <div 
        className="flex items-center justify-between cursor-pointer py-1 text-sm font-bold text-slate-900 select-none"
        onClick={onToggle}
      >
        <span className="text-emerald-950 font-heading">Customer Rating</span>
        <RiArrowDropDownLine
          className={`text-2xl transition-transform duration-200 ${
            isOpen ? "rotate-180 text-emerald-800" : "text-slate-400"
          }`}
        />
      </div>

      {isOpen && (
        <div className="mt-3 space-y-2">
          {ratings.map((rating) => (
            <label 
              key={rating} 
              className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer p-1 rounded-lg hover:bg-slate-50 transition"
              htmlFor={`rating-${rating}`}
            >
              <input
                type="checkbox"
                className="accent-emerald-700 w-3.5 h-3.5 rounded"
                id={`rating-${rating}`}
              />
              {renderStars(rating)}
              <span className="font-semibold text-slate-700">
                {rating === 5 ? "5.0 Stars" : `${rating}.0 & above`}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default Rating;
