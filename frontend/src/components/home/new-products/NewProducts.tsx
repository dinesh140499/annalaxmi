import type { JSX } from 'react';
import ReusableSwiper from '../../ReusableSwiper';
import { MdKeyboardArrowRight } from 'react-icons/md';
import freeimg from "../../../assets/images/products/freeimg.png";
import { FaStar } from 'react-icons/fa';
import { CiStar } from 'react-icons/ci';
import { BsHandbag } from "react-icons/bs";

const slides: JSX.Element[] = [
  <div className="relative">
    <div className="h-[200px] w-full">
      <img
        src={freeimg}
        className="rounded-lg rounded-tr-lg h-full w-full object-cover"
        alt={`category`}
      />
      {/* Discount  */}
      {/* <p className="absolute right-0 top-0 bg-[#00603A] w-[50px] text-center rounded-tr-lg rounded-bl-lg text-white text-sm px-2 py-2">40% OFF</p> */}
    </div>
    <div className="border border-[#EDEDED] rounded-bl-lg rounded-br-lg">
      <h1 className="text-sm  text-left px-2 mt-5 mb-0 ">Green Apple</h1>
      <div>
        <div className="flex items-center justify-between pt-1 pb-3 px-2">
          <div>
            <p className="text-md">$14.99</p>
            <div className="flex items-center gap-1">
              <FaStar className="text-[#FF8A00] text-[10px]" />
              <FaStar className="text-[#FF8A00] text-[10px]" />
              <FaStar className="text-[#FF8A00] text-[10px]" />
              <FaStar className="text-[#FF8A00] text-[10px]" />
              <CiStar className="text-[#D4D4D4] text-[10px]" />

            </div>
          </div>
          <p className="cursor-pointer line-through text-[#222222] flex items-center justify-center h-[40px] w-[40px] bg-[#F2F2F2] rounded-full text-lg hover:bg-[#FFD75E] hover:text-white"><BsHandbag /></p>

        </div>
      </div>

    </div>
  </div>,

];

const NewProducts = () => {
  return (
    <section className="pt-10 lg:pt-20 relative">
      <div className="max-w-[90%] lg:max-w-[95%] mx-auto w-full">
        <div className="flex items-start justify-between">
          <div className="flex justify-between w-full">
            <div className="w-fit">
              <h1 className="text-green font-bold text-lg pb-2 mb-1">Newest Products</h1>
            </div>
            <button className="text-sm flex items-center cursor-pointer text-[#00603A]">View All <MdKeyboardArrowRight className="text-lg " /></button>
          </div>
        </div>
        <div className={`${slides.length > 5 && 'mt-5 '}`}>
          <ReusableSwiper
            slides={slides}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, type: 'bullets' }}
            paginationClass="new-products-pagination"
            navigation={false}
            breakpoints={{
              480: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 5 },
            }}
            options={{
              speed: 800,
              grabCursor: true,
            }}
          />

        </div>
      </div>
    </section>
  );
};

export default NewProducts;
