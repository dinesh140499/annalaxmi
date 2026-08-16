import ReusableSwiper from "../../components/ReusableSwiper";
import slide1 from '../../assets/slides/slide1.png';
import '../../assets/styles/home.css';
import { FaLeaf, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { JSX } from "react";

const slides: JSX.Element[] = [
  <div key="slide1" className="relative h-[320px] sm:h-[400px] lg:h-[480px] w-full rounded-3xl overflow-hidden shadow-lg">
    <img src={slide1} className="h-full w-full object-cover" alt="GrainPulse Organic Harvest" />
    
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/60 to-transparent flex items-center p-6 sm:p-12 lg:p-16">
      <div className="max-w-xl text-white">
        <div className="inline-flex items-center gap-2 bg-emerald-800/80 backdrop-blur-xs border border-emerald-500/40 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full mb-3 shadow-xs">
          <FaLeaf className="text-xs" />
          <span>100% Certified Organic Harvest</span>
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
          Pure Grains, Unpolished Dals & Cold-Pressed Oils
        </h1>
        <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 max-w-md leading-relaxed hidden sm:block">
          Direct from regenerative farmers to your kitchen. Zero chemical polish, zero pesticides, maximum bioavailability.
        </p>
        <div className="flex items-center gap-3 mt-5">
          <Link
            to="/categories"
            className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl text-xs sm:text-sm transition duration-150 flex items-center gap-2 shadow-md"
          >
            <span>Shop Harvest Deals</span>
            <FaArrowRight className="text-xs" />
          </Link>
          <span className="text-xs sm:text-sm text-amber-300 font-semibold bg-emerald-900/60 px-3 py-2 rounded-xl border border-emerald-700/50">
            Up to 40% OFF
          </span>
        </div>
      </div>
    </div>
  </div>,
  <div key="slide2" className="relative h-[320px] sm:h-[400px] lg:h-[480px] w-full rounded-3xl overflow-hidden shadow-lg">
    <img src={slide1} className="h-full w-full object-cover" alt="Ancient Millets & Heirlooms" />
    
    <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/60 to-transparent flex items-center p-6 sm:p-12 lg:p-16">
      <div className="max-w-xl text-white">
        <div className="inline-flex items-center gap-2 bg-emerald-800/80 backdrop-blur-xs border border-emerald-500/40 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full mb-3 shadow-xs">
          <FaLeaf className="text-xs" />
          <span>Heritage Native Nutrition</span>
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
          Heirloom Millets & Desi Superfoods
        </h1>
        <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 max-w-md leading-relaxed hidden sm:block">
          Nutrient-dense ancient grains with high dietary fiber, low glycemic index, and rich iron content.
        </p>
        <div className="flex items-center gap-3 mt-5">
          <Link
            to="/categories"
            className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl text-xs sm:text-sm transition duration-150 flex items-center gap-2 shadow-md"
          >
            <span>Explore Millets</span>
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </div>
    </div>
  </div>
];

const Banner = () => {
  return (
    <div className="max-w-[95%] mx-auto my-4 relative">
      <ReusableSwiper
        slides={slides}
        loop={true}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
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
    </div>
  );
};

export default Banner;
