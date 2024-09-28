import React from "react";
// =========================== Images
// Banner
import banner1 from "@/images/banner/Image 1.png";
import banner2 from "@/images/banner/Image 2.png";
import banner3 from "@/images/banner/Image 3.png";
import mobileBanner from "@/images/banner/mobile/Image 1.png";
// Brands
import brand1 from "@/images/brands/LOGO-1.png";
import brand2 from "@/images/brands/LOGO-2.png";
import brand3 from "@/images/brands/LOGO-3.png";
import brand4 from "@/images/brands/LOGO-4.png";
import brand5 from "@/images/brands/LOGO-5.png";
import { Swiper, SwiperSlide } from "swiper/react";

// Required Swiper modules
import { EffectCoverflow, Pagination } from "swiper/modules";
// Styles

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
            effect={"coverflow"}
            centeredSlides={true}
            slidesPerView={"auto"}
            loop={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            initialSlide={10}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="banner-swiper"
          >
            <SwiperSlide>
              <img src={banner1} alt="banner image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={mobileBanner} alt="banner image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={banner3} alt="banner image" />
            </SwiperSlide>
          </Swiper>

          <Swiper
            className="mini-banner brands"
            slidesPerView={5}
            spaceBetween={15}
            loop={true}
            breakpoints={{
              900: {
                slidesPerView: 5,
                spaceBetween: 15,
              },
              340: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
            }}
          >
            <SwiperSlide className="brand-item">
              <img src={brand1} alt="brand image" />
            </SwiperSlide>
            <SwiperSlide className="brand-item">
              <img src={brand2} alt="brand image" />
            </SwiperSlide>
            <SwiperSlide className="brand-item">
              <img src={brand3} alt="brand image" />
            </SwiperSlide>
            <SwiperSlide className="brand-item">
              <img src={brand4} alt="brand image" />
            </SwiperSlide>
            <SwiperSlide className="brand-item">
              <img src={brand5} alt="brand image" />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Banner;
