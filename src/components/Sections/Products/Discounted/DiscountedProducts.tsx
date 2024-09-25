import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Required Swiper modules
import { FreeMode, Pagination } from "swiper/modules";
// Swiper Css
import "swiper/css";
import "swiper/css/free-mode";
import DiscountedItem from "./DiscountedItem";
import { useAppSelector } from "@/store/hooks/hooks";

const DiscountedProducts: React.FC = () => {
  const { products } = useAppSelector((state) => state.products);

  return (
    <>
      <section className="section-discounted-products" id="discounted">
        <div className="container">
          <div className="section-title">
            <h3 className="title">Chegirmali mahsulotlar</h3>
          </div>

          <Swiper
            slidesPerView={"auto"}
            spaceBetween={30}
            freeMode={true}
            mousewheel={true}
            modules={[FreeMode, Pagination]}
            className="swiper-products"
          >
            {products.map((product, index) => (
              <SwiperSlide key={index}>
                <DiscountedItem data={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default DiscountedProducts;
