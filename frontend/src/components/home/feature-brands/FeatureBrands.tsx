import type { JSX } from 'react';
import ReusableSwiper from '../../ReusableSwiper';
import { MdKeyboardArrowRight } from 'react-icons/md';

const slides: JSX.Element[] = [
  <div className='relative h-[200px] bg-[#00603A] w-full rounded-lg text-white inline-block text-center '>
    <div className='absolute bottom-7 left-5'>
      <p className="text-[13px] mt-3  py-2 rounded-md ">Cook Exotic Dishes</p>
      <h1 className='font-bold text-2xl mt-3'>UP to 20% OFF</h1>
    </div>
  </div>,
  <div className='relative h-[200px] bg-[#102861] w-full rounded-lg text-white inline-block text-center '>
    <div className='absolute bottom-7 left-5'>
      <p className="text-[13px] mt-3  py-2 rounded-md bg-[#2A4D97]">World’s No.1 Rice</p>
      <h1 className='font-bold text-2xl mt-3'>UP to 40% OFF</h1>
    </div>
  </div>,
  <div className='relative h-[200px] bg-[#00603A] w-full rounded-lg text-white inline-block text-center '>
    <div className='absolute bottom-7 left-5'>
      <p className="text-[13px] mt-3  py-2 rounded-md ">Green Tastea!</p>
      <h1 className='font-bold text-2xl mt-3'>UP to 25% OFF</h1>
    </div>
  </div>,

];

const FeatureBrands = () => {
  return (
    <section className="pt-10 lg:pt-20">
      <div className="max-w-[90%] lg:max-w-[95%] mx-auto w-full">
        <div className="flex items-start justify-between">
          <div className="flex justify-between w-full">
            <div className="w-fit">
              <h1 className="text-green font-bold text-lg pb-2">Featured Brands</h1>
              <div className="border-b-[2px] border-[#00603A]"></div>
            </div>
            <button className="text-sm flex items-center cursor-pointer text-[#00603A]">View All <MdKeyboardArrowRight className="text-lg" /></button>
          </div>
        </div>
        {/* Swiper */}
        <div className="relative mt-5">
          <ReusableSwiper
            slides={slides}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, type: 'bullets' }}
            paginationClass="feature-pagination"
            navigation={false}
            breakpoints={{
              480: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
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

export default FeatureBrands;
