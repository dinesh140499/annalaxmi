import { useState } from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

import pulse from "../../../assets/images/products/pulse.png";
import spices from "../../../assets/images/products/spices.png";
import oils from "../../../assets/images/products/oils.png";
import grains from "../../../assets/images/products/grains.png";
import dryfruit from "../../../assets/images/products/dry-fruit.png";
import ReusableSwiper from "../../ReusableSwiper";
import Filter from "../../reusable/Filter";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import freeimg from '../../../assets/images/products/freeimg.png'

type SlideData = {
  category: string;
  label: string;
  image: string;
};

const slideData: SlideData[] = [
  { category: "Pulses", label: "Pulses", image: pulse },
  { category: "Spices", label: "Spices", image: spices },
  { category: "Oils", label: "Oils", image: oils },
  { category: "Grains", label: "Grains", image: grains },
  { category: "Grains", label: "Grains", image: grains },
  { category: "Dry Fruits", label: "Dry Fruits", image: dryfruit },
  { category: "Dry Fruits", label: "Dry Fruits", image: dryfruit },
  { category: "Dry Fruits", label: "Dry Fruits", image: pulse },
  { category: "Dry Fruits", label: "Dry Fruits", image: dryfruit },
];

const categories = ["All", "Pulses", "Spices", "Oils", "Grains", "Dry Fruits"];

const FeaturedProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredSlides = slideData.filter((item) =>
    selectedCategory === "All" ? true : item.category === selectedCategory
  );

  const slides = filteredSlides.map((item, idx) => (
    <div key={idx}>
      <div className="h-[200px] lg:h-[150px] w-full">
        <img
          src={item.image}
          className="rounded-t-md rounded-r-md h-full w-full object-cover"
          alt={`${item.label} category`}
        />
      </div>
      <p className="text-[13px] text-[#ADADAD] font-light mt-1">Vegetables</p>
      <h1 className="text-sm mt-1 text-left">{item.label}</h1>
      <div>
        <div className="flex items-center gap-1 mt-2">
          <FaStar className="text-[#FDC040] text-sm" />
          <FaStar className="text-[#FDC040] text-sm" />
          <FaStar className="text-[#FDC040] text-sm" />
          <FaStar className="text-[#FDC040] text-sm" />
          <CiStar className="text-[#D4D4D4] text-sm" />
          <span className="text-[13px] text-[#D4D4D4]">(4)</span>
        </div>
        <h1 className="text-[13px]"><span className="text-[#D4D4D4]">By</span> Mr.food</h1>
        <div className="flex items-center justify-between mt-3">
          <p className="text-md">$2 <span className="text-[#ADADAD]">$3.99</span></p>
          <button className="w-[90px] flex items-center justify-center bg-[#FFD75E] text-[#323C64] gap-1 py-1 rounded-sm cursor-pointer"><MdOutlineLocalGroceryStore className="text-[#323C64] text-sm" /> Add</button>
        </div>
      </div>
    </div>
  ));

  return (
    <section className="pt-10 lg:pt-20">
      <div className="max-w-[90%] lg:max-w-[95%] mx-auto w-full">
        <div>
          <div className="flex items-start justify-between">
            <div className="w-fit">
              <h1 className="text-green font-bold text-lg pb-2">Featured Products</h1>
              <div className="border-b-[2px] border-[#00603A]"></div>
            </div>
            <Filter categoriesList={categories} onFilterChange={setSelectedCategory} />
          </div>
          <div className="relative mt-5">
            <ReusableSwiper
              slides={slides}
              loop={true}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true, type: "bullets" }}
              paginationClass="home-pagination"
              navigation={false}
              breakpoints={{
                480: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
              }}
              options={{
                speed: 800,
                grabCursor: true,
              }}
            />
          </div>
        </div>
        <div className="lg:flex items-center gap-3 pt-10 lg:pt-10">
          <div className="lg:flex-1 bg-[#FFF5E1D9] p-5 rounded-md">
            <div className="lg:flex items-center">
              <div className="w-full">
                <span className="capitalize bg-[#FFD75E] rounded-sm py-2 px-1 text-sm">Free Delivery</span>
                <h1 className="capitalize text-lg font-bold lg:my-3 mt-5">Free delivery over $50 </h1>
                <p className="text-sm">Shop $50 product and get free delivery anywhere.</p>
                <button className="flex items-center gap-1 text-md bg-[#00603A] text-white rounded-sm py-2 px-2 mt-5 cursor-pointer">Shop Now <FaArrowRightLong /></button>
              </div>
              <img src={freeimg} className="mt-3 lg:mt-0 lg:w-[250px] lg:h-[300px] rounded-md" alt="" />
            </div>
          </div>
         <div className="lg:flex-1 bg-[#9DCFBB] mt-5 lg:mt-0 p-5 rounded-md">
            <div className="lg:flex items-center">
              <div className="w-full">
                <span className="capitalize rounded-sm py-2 px-1 text-sm">60% Off</span>
                <h1 className="capitalize text-lg font-bold lg:my-3 mt-5">Organic Food</h1>
                <p className="text-sm">Save up to 60% off on your first order</p>
                <button className="flex items-center gap-1 text-md bg-[#00603A] text-white rounded-sm py-2 px-2 mt-5 cursor-pointer">Order Now <FaArrowRightLong /></button>
              </div>
              <img src={freeimg} className="mt-3 lg:mt-0 lg:w-[250px] lg:h-[300px] rounded-md" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
