import React, { useEffect, useState } from "react";
import {
  Announcement,
  Comments,
  GiftSertifications,
  NavigationBar,
  ProductDetails,
} from "@/components";
import { Swiper, SwiperSlide } from "swiper/react";

// Required Swiper modules
import { FreeMode, Pagination } from "swiper/modules";
import { DiscountedItem } from "@/components/index";
import { useGetAllProductsQuery } from "@/store/RTKQuery";

const Details: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { isSuccess, data } = useGetAllProductsQuery({ page: 1 });

  useEffect(() => {
    if (isSuccess) {
      setProducts(data.data);
    }
  }, [isSuccess]);

  return (
    <>
      <section className="details-page section-detail">
        <div className="container">
          <NavigationBar />
          <ProductDetails />
          <Comments />
          {/* Section Recommendation */}
          <section className="section-recommendation">
            <div className="container">
              <div className="section-title">
                <h3 className="title">Рекомендуем</h3>
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
        </div>
        <Announcement />
        <div className="container" style={{ padding: 0 }}>
          <GiftSertifications />
        </div>
      </section>
    </>
  );
};

export default Details;
