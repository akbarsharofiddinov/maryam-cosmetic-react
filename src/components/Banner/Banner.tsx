import React from "react";
// =========================== Images
// Banner
import banner1 from "@/images/banner/Image 1.png";
import banner2 from "@/images/banner/Image 2.png";
import banner3 from "@/images/banner/Image 3.png";
// Brands
import brand1 from "@/images/brands/LOGO-1.png";
import brand2 from "@/images/brands/LOGO-2.png";
import brand3 from "@/images/brands/LOGO-3.png";
import brand4 from "@/images/brands/LOGO-4.png";
import brand5 from "@/images/brands/LOGO-5.png";
import { Swiper, SwiperSlide } from "swiper/react";

// Required Swiper modules
import { Pagination } from "swiper/modules";

const Banner: React.FC = () => {
  return (
    <>
      <section className="section-banner">
        <div className="container">
          <div className="banner-images">
            <img src={banner1} alt="banner image" />
            <img src={banner2} alt="banner image" />
            <img src={banner3} alt="banner image" />
          </div>
          {
            // Mobile
            /* <div className="swiper banner-swiper">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <img src="./src/images/banner/Image 1.png" alt="banner image" />
              </div>
              <div className="swiper-slide">
                <img
                  src="./src/images/banner/mobile/Image 2.png"
                  alt="banner image"
                />
              </div>
              <div className="swiper-slide">
                <img src="./src/images/banner/Image 3.png" alt="banner image" />
              </div>
            </div>
            <div className="swiper-pagination"></div>
          </div> */
          }

          <Swiper
            pagination={true}
            modules={[Pagination]}
            className="banner-swiper"
            slidesPerView={1}
            spaceBetween={0}
          >
            <SwiperSlide>
              <img src={banner1} alt="banner image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={banner2} alt="banner image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={banner3} alt="banner image" />
            </SwiperSlide>
          </Swiper>

          <div className="mini-banner brands">
            <div className="brand-item">
              <img src={brand1} alt="brand image" />
            </div>
            <div className="brand-item">
              <img src={brand2} alt="brand image" />
            </div>
            <div className="brand-item">
              <img src={brand3} alt="brand image" />
            </div>
            <div className="brand-item">
              <img src={brand4} alt="brand image" />
            </div>
            <div className="brand-item">
              <img src={brand5} alt="brand image" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
