import {
  DiscountedItem,
  Login,
  Modal,
  ProductItem,
  Signup,
} from "@/components";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import { Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setModal } from "@/store/maryamSlice/maryamSlice";

const Cart: React.FC = () => {
  const [count, setCount] = useState(0);
  const [discount, setDiscount] = useState("");
  const { products } = useAppSelector((state) => state.products);
  const [totalPrice, setTotalPrice] = useState(0);

  const { products: cartProducts } = useAppSelector((state) => state.cart);
  const { modal, userToken } = useAppSelector((state) => state.maryam);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formationFailed = () =>
    toast(
      "Вы не зарегистрированы в системе! Нажмите, чтобы зарегистрироваться.",
      {
        type: "error",
        onClick: () => dispatch(setModal(true)),
      }
    );

  useEffect(() => {
    setCount(cartProducts.length);
    setTotalPrice(0);
    cartProducts.map((item) => {
      setTotalPrice((prev) => prev + item.product.price * item.quantity);
    });
  }, [cartProducts]);

  return (
    <>
      <div className="cart-page">
        <div className="container">
          <div className="section-title">
            <h3 className="title">Корзина</h3>
          </div>
          <div className="cart">
            <div className="products left">
              {cartProducts.length > 0 ? (
                cartProducts.map((cartProduct, index) => (
                  <ProductItem
                    key={`${cartProduct.product.id}_${cartProduct.product.category_id}_${index}`}
                    data={cartProduct.product}
                    quantity={cartProduct.quantity}
                    inCart={true}
                  />
                ))
              ) : (
                <div className="empty-box">
                  <Empty />
                  <a href="/">Вернуться к покупкам</a>
                </div>
              )}
            </div>
            <div className="info right">
              <h4 className="title">
                Товары <span>{count} шт.</span>
              </h4>
              <div className="discount-box">
                <label htmlFor="discount">Применить скидку:</label>
                <div className="discount-inputBox">
                  <svg
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.0049 17.9997C9.0049 17.1712 8.3333 16.4997 7.50488 16.4997C6.67646 16.4997 6.00488 17.1712 6.00488 17.9997H1.00488C0.452603 17.9997 0.00488281 17.5519 0.00488281 16.9997V0.99966C0.00488281 0.44738 0.452603 -0.000339508 1.00488 -0.000339508H6.00488C6.00488 0.82809 6.67646 1.49966 7.50488 1.49966C8.3333 1.49966 9.0049 0.82809 9.0049 -0.000339508H19.0049C19.5572 -0.000339508 20.0049 0.44738 20.0049 0.99966V6.49966C18.6242 6.49966 17.5049 7.619 17.5049 8.9997C17.5049 10.3804 18.6242 11.4997 20.0049 11.4997V16.9997C20.0049 17.5519 19.5572 17.9997 19.0049 17.9997H9.0049ZM7.50488 7.4997C8.3333 7.4997 9.0049 6.82809 9.0049 5.99966C9.0049 5.17124 8.3333 4.49966 7.50488 4.49966C6.67646 4.49966 6.00488 5.17124 6.00488 5.99966C6.00488 6.82809 6.67646 7.4997 7.50488 7.4997ZM7.50488 13.4997C8.3333 13.4997 9.0049 12.8281 9.0049 11.9997C9.0049 11.1712 8.3333 10.4997 7.50488 10.4997C6.67646 10.4997 6.00488 11.1712 6.00488 11.9997C6.00488 12.8281 6.67646 13.4997 7.50488 13.4997Z"
                      fill="#FF1C67"
                    />
                  </svg>
                  <input
                    type="text"
                    name="discount"
                    id="discount"
                    placeholder="Promo kod"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>
              </div>
              <div className="price-box">
                <h4 className="title">Общая сумма</h4>
                <p>{totalPrice} сумм</p>
              </div>
              {totalPrice ? (
                <button
                  className="formation-btn"
                  onClick={() => {
                    if (userToken) navigate("/order");
                    else formationFailed();
                  }}
                >
                  Оформление
                </button>
              ) : (
                <button
                  className={
                    totalPrice === 0 ? "formation-btn disable" : "formation-btn"
                  }
                  disabled
                >
                  Оформление
                </button>
              )}
            </div>
          </div>
          {/* Section Recommendation */}
          <section className="section-recommendation">
            <div className="container">
              <div className="section-title">
                <h3 className="title">Мы рекомендуем</h3>
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
      </div>

      {modal && <Modal>{userToken.length > 0 ? <Login /> : <Signup />}</Modal>}
    </>
  );
};

export default Cart;
