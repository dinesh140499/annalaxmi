import '../../assets/styles/shop.css'
import { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import PriceRangeSlider from "../../components/reusable/PriceRangeSlider";
import Rating from "../../components/shop/Rating";
import PopularTag from "../../components/shop/PopularTag";
import Discount from "../../components/shop/Discount";
import SaleProduct from "../../components/shop/SaleProduct";
import Product from '../../components/shop/Product';
import Divider from '../../components/reusable/Divider';
import { useDispatch } from 'react-redux';
import { setSearchConfig } from '../../features/commonSlice';
import { searchManager } from '../../utils/searchManager';
import { useNavigate } from 'react-router-dom';

 const products = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Orange' },
  ];

const Shop = () => {
  const [priceRange, setPriceRange] = useState({ min: 2500, max: 7500 });
  const [filterBtnToggle, setFilterBtnToggle] = useState<boolean>(false);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    "All Categories": true,
    "Price": true,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggle = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    dispatch(setSearchConfig({ items: products, getLabelKey: 'name' }));
    searchManager.setOnSelect((item) => navigate(`/categories/${item.id}`));
  }, []);

  return (
    <>
      <div className="max-w-[90%] w-full lg:max-w-[95%] mx-auto lg:relative">
        <div className="flex">
          <div className={`w-full py-3 h-full lg:h-[100vh] overflow-y-auto px-4 duration-75 fixed  left-0 top-0 z-20  overflow-auto scrollbar-hide ${filterBtnToggle ? 'translate-x-0 bg-white lg:translate-0' : '-translate-x-full lg:translate-0'} lg:w-[20%] lg:sticky lg:top-0`}>
            {/* Filter Header */}
            <h1 className="rounded-sm bg-green text-white w-fit text-sm flex items-center gap-1 py-1 px-1 mb-3" onClick={() => setFilterBtnToggle(!filterBtnToggle)}>
              Filter <IoFilter />
            </h1>

            {/* All Categories */}
            <h1 className="text-lg font-bold text-green flex items-center justify-between mb-1">
              All Categories
              <RiArrowDropDownLine
                className={`text-2xl cursor-pointer duration-200 ease-in-out transform ${openSections["All Categories"] ? "rotate-180" : ""
                  }`}
                onClick={() => handleToggle("All Categories")}
              />
            </h1>

            {openSections["All Categories"] &&
              Array.from({ length: 10 }).map((_, i) => (
                <div className="flex items-center gap-1 mb-2 last:mb-0" key={i}>
                  <input type="radio" id={`category-${i}`} name="category" className="text-sm" />
                  <label htmlFor={`category-${i}`} className="text-sm">
                    Spices <span className="text-[#808080] font-light">(134)</span>
                  </label>
                </div>
              ))}

            {/* Divider */}
            <Divider />

            {/* Price Filter */}
            <PriceRangeSlider
              min={0}
              max={10000}
              step={100}
              priceGap={1000}
              initialMin={priceRange.min}
              initialMax={priceRange.max}
              onChange={setPriceRange}
              isOpen={openSections["Price"]}
              onToggle={() => handleToggle("Price")}
            />

            {/* Divider */}
            <Divider />

            {/* Rating */}
            <Rating
              isOpen={openSections["Rating"]}
              onToggle={() => handleToggle("Rating")} />

            {/* Divider */}
            <Divider />

            {/* Popular Tag */}
            <PopularTag
              isOpen={openSections["Popular Tag"]}
              onToggle={() => handleToggle("Popular Tag")} />

            {/* Discount */}
            <Discount discount="70%" />

            {/* Sell Product */}
            <SaleProduct />
          </div>
          <div className="w-full  py-3 lg:w-[80%]">
            <Product filterBtnToggle={filterBtnToggle} setFilterBtnToggle={setFilterBtnToggle} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
