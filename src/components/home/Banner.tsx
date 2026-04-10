import ReusableSwiper from "../../components/ReusableSwiper";
import slide1 from '../../assets/slides/slide1.png';
import '../../assets/styles/home.css';
import patch from '../../assets/images/patch.png';
import type { JSX } from "react";

const slides: JSX.Element[] = [
  <div className="relative h-full w-full">
    <img src={slide1} className="h-full w-full object-cover" alt="Slide 1" />
    <div className="absolute top-1/2 left-10 -translate-y-1/2 z-10 text-white">
      <h1 className="lg:text-3xl">Best Deal on icy delights</h1>
      <h1 className="lg:text-7xl mt-1 beat">BEAT</h1>
      <h1 className="lg:text-7xl stroke-white">THE HEAT</h1>
      <h3 className="lg:text-3xl">UP to 50% OFF</h3>
    </div>
  </div>,
  <div className="relative h-full w-full">
    <img src={slide1} className="h-full w-full object-cover" alt="Slide 2" />
    <div className="absolute top-1/2 left-10 -translate-y-1/2 z-10 text-white">
      <h1 className="lg:text-3xl">Best Deal on icy delights</h1>
      <h1 className="lg:text-7xl mt-1 beat">BEAT</h1>
      <h1 className="lg:text-7xl stroke-white">THE HEAT</h1>
      <h3 className="lg:text-3xl">UP to 50% OFF</h3>
    </div>
  </div>
];

const Banner = () => {


  return (
    <div className="relative">
      <ReusableSwiper
        slides={slides}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, type: 'bullets' }}
        paginationClass="home-pagination"
        navigation={false}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 1 },
        }}
        options={{
          speed: 800,
          grabCursor: true,
        }}

      />
      <img src={patch} className="h-[50px] w-[50px] lg:h-[170px] lg:w-[170px] absolute right-10 bottom-10 z-10 object-contain
             brightness-[10] " alt="" />
    </div>
  );
};

export default Banner;
