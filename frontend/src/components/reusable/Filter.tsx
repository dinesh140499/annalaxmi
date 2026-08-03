import { useState } from "react";
import { CiFilter } from "react-icons/ci";

interface FilterProps {
  categoriesList: string[];
  onFilterChange: (category: string) => void;
}

const Filter = ({ categoriesList, onFilterChange }: FilterProps) => {
  const [activeKey, setActive] = useState<string>("All");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleFilter = (id: string) => {
    setActive(id);
    onFilterChange(id);
    setIsOpen(false); // close dropdown on selection (mobile)
  };

  return (
    <div className="relative">
      {/* Desktop View */}
      <div className="hidden lg:flex gap-5">
        {categoriesList.map((item, i) => (
          <button
            key={i}
            className={`text-sm cursor-pointer ${
              activeKey === item ? "text-green font-semibold" : "text-[#BFBFBF]"
            }`}
            onClick={() => handleFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Mobile View */}
      <div className="flex items-center gap-2 lg:hidden" onClick={() => setIsOpen(!isOpen)}>
        <h1 className="text-md text-green">{activeKey}</h1>
        <CiFilter className="text-xl cursor-pointer" />
      </div>

      {/* Dropdown for Mobile */}
      {isOpen && (
        <div className="lg:hidden absolute top-10 left-0 w-[160px] bg-white shadow-md rounded-md z-20">
          {categoriesList.map((item, i) => (
            <button
              key={i}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                activeKey === item ? "text-green font-medium" : "text-gray-600"
              }`}
              onClick={() => handleFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
