// components/ReusableSwiper.tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';
import React from 'react';
import 'swiper/swiper-bundle.css';

interface ReusableSwiperProps {
  slides: React.ReactNode[];
  loop?: boolean;
  autoplay?: boolean | object;
  pagination?: boolean | object;
  navigation?: boolean;
  spaceBetween?: number;
  slidesPerView?: number;
 breakpoints?: SwiperOptions['breakpoints'];
  options?: Omit<SwiperOptions, 'breakpoints' | 'slides'>;
  paginationClass?: string; // ✅ new
}

const ReusableSwiper: React.FC<ReusableSwiperProps> = ({
  slides,
  loop = true,
  autoplay = true,
  pagination = true,
  navigation = true,
  spaceBetween = 20,
  slidesPerView = 1,
  breakpoints = {},
  options = {},
  paginationClass = 'custom-swiper-pagination', // ✅ default
}) => {
  const paginationConfig =
    pagination && typeof pagination === 'object'
      ? { ...pagination, el: `.${paginationClass}` }
      : pagination
      ? { clickable: true, el: `.${paginationClass}` }
      : false;

  return (
    <div className="" style={{ position: 'relative' }}>
      {pagination && <div className={paginationClass} />} 
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop={loop}
        autoplay={autoplay}
        pagination={paginationConfig}
        navigation={navigation}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        breakpoints={breakpoints}
        {...options}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>{slide}</SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
};

export default ReusableSwiper;
