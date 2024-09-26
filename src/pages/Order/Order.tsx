import { CustomSelect } from "@/components";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { setModal } from "@/store/maryamSlice/maryamSlice";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IMaskInput } from "react-imask";
import { toast } from "react-toastify";

import payme from "@/images/payments/payme.png";
import click from "@/images/payments/click.png";
import uzumNasiya from "@/images/payments/Uzum_Nasiya-01 1.png";
// import { useOrderProductsMutation } from "@/store/RTKQuery";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setCartProducts } from "@/store/Cart/cartSlice";

const Order: React.FC = () => {
  const [count, setCount] = useState(0);
  const [userNumber, setUserNumber] = useState("");
  const [discount, setDiscount] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [userNumberValidate, setUserNumberValidate] = useState(false);
  const [location, setLocation] = useState("Nukus shahar");
  const [fullName, setFullName] = useState("");

  const ContactNumberMask = "{00} {000}-{00}-{00}";

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { userToken, userNumber: userNumberStore } = useAppSelector(
    (state) => state.maryam
  );
  const { products: cartProducts } = useAppSelector((state) => state.cart);

  // const [postOrder, result] = useOrderProductsMutation({});

  const formationFailed = () =>
    toast("Tizimda ro'yxatdan o'tmagansiz! Ro'yxatdan o'tish uchun bosing.", {
      type: "error",
      onClick: () => dispatch(setModal(true)),
    });

  async function handleSendOrder(e: React.FormEvent<HTMLFormElement>) {
    setLocation("Город Нукус");
    e.preventDefault();
    const orderItems = cartProducts.map((item) => {
      return { product_id: item.product.id, quantity: item.quantity };
    });

    const postData = {
      address: location,
      order_items: orderItems,
      full_name: fullName,
    };

    if (userToken) {
      try {
        const response = await axios.post(
          "https://maryam.webclub.uz/api/orders/",
          postData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        if (response.status === 201) {
          toast(
            "Buyurtma muvofaqqiyatli yuborildi! Bosh sahifaga o'tish uchun bosing.",
            {
              type: "success",
              onClick: () => navigate("/"),
            }
          );

          localStorage.removeItem("cart");
          dispatch(setCartProducts([]));
        } else {
          toast("Buyurtma berishda xatolik yuz berdi.", {
            type: "error",
            onClose: () => navigate("/"),
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else formationFailed();
  }

  useEffect(() => {
    setCount(cartProducts.length);
    cartProducts.map((item) =>
      setTotalPrice(item.product.price * item.quantity)
    );
  }, [cartProducts]);

  useEffect(() => {
    setUserNumber(userNumberStore);
  }, [userToken, cartProducts]);

  return (
    <>
      <div className="order-page">
        <div className="container">
          <div className="section-title">
            <h3 className="title">Оформление заказа</h3>
          </div>
          <form onSubmit={handleSendOrder}>
            <div className="left">
              <div className="info-form">
                <h4 className="title">Получатель заказа</h4>
                <div className="input-boxes">
                  <div className="input-box">
                    <label htmlFor="location">Район</label>
                    <CustomSelect cls="location-select">
                      <div className="selected">
                        Город Нукус
                        <span>
                          <IoIosArrowDown />
                        </span>
                      </div>
                      <div className="menu">
                        <div className="item">Location-1</div>
                        <div className="item">Location-2</div>
                        <div className="item">Location-3</div>
                        <div className="item">Location-4</div>
                        <div className="item">Location-5</div>
                        <div className="item">Location-6</div>
                      </div>
                    </CustomSelect>
                  </div>
                  <div className="input-box">
                    <label htmlFor="full-name">Имя Фамилия</label>
                    <input
                      type="text"
                      name="full-name"
                      id="full-name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-box ">
                    <label htmlFor="phone">Номер телефона</label>
                    <div
                      className={
                        userNumberValidate
                          ? "phone-input_box error"
                          : "phone-input_box"
                      }
                      style={
                        userNumberValidate ? { border: "1px solid red" } : {}
                      }
                    >
                      <span>+998</span>
                      <IMaskInput
                        className="form-inputMask"
                        mask={ContactNumberMask}
                        value={userNumber}
                        placeholder="90 000-00-00"
                        onAccept={(e) => {
                          setUserNumber(e);
                          if (e.length > 1) {
                            setUserNumberValidate(false);
                          } else {
                            setUserNumberValidate(true);
                          }
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>

                <hr style={{ marginBottom: 20, opacity: ".2" }} />

                <div className="note">
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 25.5C6.09644 25.5 0.5 19.9035 0.5 13C0.5 6.09644 6.09644 0.5 13 0.5C19.9035 0.5 25.5 6.09644 25.5 13C25.5 19.9035 19.9035 25.5 13 25.5ZM11.7533 18L20.5921 9.16116L18.8244 7.3934L11.7533 14.4645L8.21776 10.9289L6.44999 12.6967L11.7533 18Z"
                      fill="#0ACF83"
                    />
                  </svg>
                  <p>
                    На указанный вами номер телефона мы отправим уведомление о
                    состоянии вашего заказа. Курьер свяжется с вами по телефону,
                    чтобы уточнить срок доставки.
                  </p>
                </div>
              </div>

              <div className="method-payments">
                <h4 className="title">Способ оплаты</h4>
                <div className="methods">
                  <div className="method payme">
                    <div className="top">
                      <img src={payme} alt="" />
                      <input
                        type="radio"
                        name="method"
                        id="method-payme"
                        required
                      />
                      <label htmlFor="method-payme"></label>
                    </div>
                    <div className="desc">
                      Совершите быстрый и удобный платеж через приложение Payme.
                    </div>
                  </div>
                  <div className="method click">
                    <div className="top">
                      <img src={click} alt="" />
                      <input
                        type="radio"
                        name="method"
                        id="method-click"
                        required
                      />
                      <label htmlFor="method-click"></label>
                    </div>
                    <div className="desc">
                      Совершите быстрый и удобный платеж через приложение
                      Click-up.
                    </div>
                  </div>
                  <div className="method uzum">
                    <div className="top">
                      <img src={uzumNasiya} alt="" />
                      <input
                        type="radio"
                        name="method"
                        id="method-uzum"
                        required
                      />
                      <label htmlFor="method-uzum"></label>
                    </div>
                    <div className="desc">
                      Совершите покупку в рассрочку через приложение Uzum Nasiya
                      на условиях халяль.
                    </div>
                  </div>
                  <div className="method cash">
                    <div className="top">
                      <svg
                        width="26"
                        height="20"
                        viewBox="0 0 26 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.0003 15C15.7616 15 18.0003 12.7614 18.0003 10C18.0003 7.23857 15.7616 5 13.0003 5C10.2388 5 8.00022 7.23857 8.00022 10C8.00022 12.7614 10.2388 15 13.0003 15ZM24.2559 0.00366211H1.75586C1.06551 0.00366211 0.505859 0.5633 0.505859 1.25366V18.7536C0.505859 19.444 1.06551 20.0036 1.75586 20.0036H24.2559C24.9463 20.0036 25.5059 19.444 25.5059 18.7536V1.25366C25.5059 0.5633 24.9463 0.00366211 24.2559 0.00366211ZM3.00586 14.5579V5.44214C4.41307 5.02125 5.52271 3.91115 5.94295 2.50366H20.0575C20.4789 3.91491 21.5933 5.02719 23.0059 5.4455V14.5545C21.5909 14.9735 20.475 16.0889 20.0553 17.5036H5.94513C5.52656 16.0927 4.41552 14.9795 3.00586 14.5579Z"
                          fill="#FF1C67"
                        />
                      </svg>
                      <input
                        type="radio"
                        name="method"
                        id="method-cash"
                        required
                      />
                      <label htmlFor="method-cash"></label>
                    </div>
                    <div className="desc">
                      <h4>Наличные</h4>
                      Оплата при получении товара
                    </div>
                  </div>
                </div>
              </div>
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
                    placeholder="Промо-код"
                    value={discount}
                    onChange={(e) => {
                      setDiscount(e.target.value);
                      if (e.target.value.length > 0) {
                        e.target.classList.add("error");
                      } else {
                        e.target.classList.remove("error");
                      }
                    }}
                  />
                </div>
              </div>
              <div className="price-box">
                <h4 className="title">Общая сумма</h4>
                <p>{totalPrice} сум</p>
              </div>
              {totalPrice ? (
                <button className="formation-btn">Оформление заказа</button>
              ) : (
                <button
                  className={
                    totalPrice === 0 ? "formation-btn disable" : "formation-btn"
                  }
                  disabled
                >
                  Оформление заказа
                </button>
              )}

              <div className="desc">
                Оформляя заказ, вы соглашаетесь на обработку персональных данных
                в соответствии с Политикой конфиденциальности и Пользовательским
                соглашением Uzum.
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Order;
