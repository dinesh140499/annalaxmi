import { Link } from 'react-router-dom';
import type { JSX } from 'react';
import pulse from '../../../assets/images/products/pulse.png';
import spices from '../../../assets/images/products/spices.png';
import oils from '../../../assets/images/products/oils.png';
import grains from '../../../assets/images/products/grains.png';
import dryfruit from '../../../assets/images/products/dry-fruit.png';
import ReusableSwiper from '../../ReusableSwiper';

// Category data array
const categories = [
  { name: 'Pulses', image: pulse },
  { name: 'Spices', image: spices },
  { name: 'Oils', image: oils },
  { name: 'Grains', image: grains },
  { name: 'Dry Fruits', image: dryfruit },
];

// Repeat categories if needed (e.g., to fill the slider with more items)
const repeatedCategories = [...categories, ...categories]; // optional repetition

const slides: JSX.Element[] = repeatedCategories.map((category, index) => (
  <Link to="/categories" key={index} className="inline-block text-center cursor-pointer">
    <img
      src={category.image}
      className=" h-20 w-20 rounded-full object-cover lg:rounded-md lg:w-full lg:h-[200px]"
      alt={`${category.name} category`}
    />
    <h1 className="text-sm mt-3">{category.name}</h1>
  </Link>
));

const TopCategory = () => {
  return (
    <section className="pt-10 lg:pt-20">
      <div className="max-w-[90%] lg:max-w-[95%] mx-auto w-full">
        <div className="w-fit">
          <h1 className="text-green font-bold text-lg pb-2">Shop From Top Categories</h1>
          <div className="border-b-[2px] border-[#00603A]"></div>
        </div>

        {/* Swiper */}
        <div className="relative mt-5">
          <ReusableSwiper
            slides={slides}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, type: 'bullets' }}
            paginationClass="home-pagination"
            navigation={false}
            slidesPerView={4}
            breakpoints={{
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 4 },
            }}
            options={{
              speed: 300,
              grabCursor: true,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default TopCategory;
