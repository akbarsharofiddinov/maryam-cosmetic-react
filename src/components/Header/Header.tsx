import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "@/images/IMG_2517.png";
import { FaRegHeart } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { CustomButton, CustomSelect, Login, Modal, Signup } from "..";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { setModal, setUserToken } from "@/store/maryamSlice/maryamSlice";

const Header: React.FC = () => {
  const [count, setCount] = useState(0);

  const dispatch = useAppDispatch();

  const { modal, userToken } = useAppSelector((state) => state.maryam);
  const { products } = useAppSelector((state) => state.cart);

  const handleLogOut = async () => {
    try {
      const response = await axios.post(
        "https://maryam.webclub.uz/api/logout",
        undefined,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (response.status === 200) {
        localStorage.removeItem("user");
        dispatch(setUserToken(""));
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCount(products.length);
  }, [products]);

  return (
    <header>
      <div className="container">
        <div className="header-inner">
          <div className="left-content">
            <CustomSelect cls="location-select">
              <div className="selected">
                <svg
                  width="18"
                  height="22"
                  viewBox="0 0 18 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18.8995L13.9497 13.9497C16.6834 11.2161 16.6834 6.78392 13.9497 4.05025C11.2161 1.31658 6.78392 1.31658 4.05025 4.05025C1.31658 6.78392 1.31658 11.2161 4.05025 13.9497L9 18.8995ZM9 21.7279L2.63604 15.364C-0.87868 11.8492 -0.87868 6.15076 2.63604 2.63604C6.15076 -0.87868 11.8492 -0.87868 15.364 2.63604C18.8787 6.15076 18.8787 11.8492 15.364 15.364L9 21.7279ZM9 11C10.1046 11 11 10.1046 11 9C11 7.89543 10.1046 7 9 7C7.8954 7 7 7.89543 7 9C7 10.1046 7.8954 11 9 11ZM9 13C6.79086 13 5 11.2091 5 9C5 6.79086 6.79086 5 9 5C11.2091 5 13 6.79086 13 9C13 11.2091 11.2091 13 9 13Z"
                    fill="#1ABCFE"
                  />
                </svg>
                город Нукус
                <span>
                  <FaAngleDown />
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
            <a href="/catalogs">
              <CustomButton
                cls="catalogs-btn_link customButton transparent"
                type="regular"
              >
                <svg
                  width="19"
                  height="20"
                  viewBox="0 0 19 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.25 0.5C6.59721 0.5 8.5 2.40279 8.5 4.75V9H4.25C1.90279 9 0 7.09721 0 4.75C0 2.40279 1.90279 0.5 4.25 0.5ZM6.5 7V4.75C6.5 3.50736 5.49264 2.5 4.25 2.5C3.00736 2.5 2 3.50736 2 4.75C2 5.99264 3.00736 7 4.25 7H6.5ZM4.25 11H8.5V15.25C8.5 17.5972 6.59721 19.5 4.25 19.5C1.90279 19.5 0 17.5972 0 15.25C0 12.9028 1.90279 11 4.25 11ZM4.25 13C3.00736 13 2 14.0074 2 15.25C2 16.4926 3.00736 17.5 4.25 17.5C5.49264 17.5 6.5 16.4926 6.5 15.25V13H4.25ZM14.75 0.5C17.0972 0.5 19 2.40279 19 4.75C19 7.09721 17.0972 9 14.75 9H10.5V4.75C10.5 2.40279 12.4028 0.5 14.75 0.5ZM14.75 7C15.9926 7 17 5.99264 17 4.75C17 3.50736 15.9926 2.5 14.75 2.5C13.5074 2.5 12.5 3.50736 12.5 4.75V7H14.75ZM10.5 11H14.75C17.0972 11 19 12.9028 19 15.25C19 17.5972 17.0972 19.5 14.75 19.5C12.4028 19.5 10.5 17.5972 10.5 15.25V11ZM12.5 13V15.25C12.5 16.4926 13.5074 17.5 14.75 17.5C15.9926 17.5 17 16.4926 17 15.25C17 14.0074 15.9926 13 14.75 13H12.5Z"
                    fill="#FF1C67"
                  />
                </svg>
                Каталоги
              </CustomButton>
            </a>
          </div>
          <a href="/" className="logo">
            <img src={logo} alt="logo image" />
          </a>
          <div className="right-content">
            <div className="search-icon icon">
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.031 14.6168L20.3137 18.8995L18.8995 20.3137L14.6168 16.031C13.0769 17.263 11.124 18 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18 11.124 17.263 13.0769 16.031 14.6168ZM14.0247 13.8748C15.2475 12.6146 16 10.8956 16 9C16 5.1325 12.8675 2 9 2C5.1325 2 2 5.1325 2 9C2 12.8675 5.1325 16 9 16C10.8956 16 12.6146 15.2475 13.8748 14.0247L14.0247 13.8748Z"
                  fill="#202024"
                />
              </svg>
            </div>
            <a href="/favourite" className="favourite-icon icon">
              <FaRegHeart />
            </a>
            <a href="/cart" className="cart-icon icon">
              <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.50488 0H14.5049C14.8196 0 15.116 0.14819 15.3049 0.4L18.0049 4V19C18.0049 19.5523 17.5572 20 17.0049 20H1.00488C0.452603 20 0.00488281 19.5523 0.00488281 19V4L2.70488 0.4C2.89374 0.14819 3.19013 0 3.50488 0ZM16.0049 6H2.00488V18H16.0049V6ZM15.5049 4L14.0049 2H4.00488L2.50488 4H15.5049ZM6.00488 8V10C6.00488 11.6569 7.348 13 9.0049 13C10.6617 13 12.0049 11.6569 12.0049 10V8H14.0049V10C14.0049 12.7614 11.7663 15 9.0049 15C6.24346 15 4.00488 12.7614 4.00488 10V8H6.00488Z"
                  fill="#202024"
                />
              </svg>
              <span className="count">{count}</span>
            </a>
            <div className="language-icon icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20ZM7.71002 17.6674C6.74743 15.6259 6.15732 13.3742 6.02731 11H2.06189C2.458 14.1765 4.71639 16.7747 7.71002 17.6674ZM8.0307 11C8.1811 13.4388 8.8778 15.7297 10 17.752C11.1222 15.7297 11.8189 13.4388 11.9693 11H8.0307ZM17.9381 11H13.9727C13.8427 13.3742 13.2526 15.6259 12.29 17.6674C15.2836 16.7747 17.542 14.1765 17.9381 11ZM2.06189 9H6.02731C6.15732 6.62577 6.74743 4.37407 7.71002 2.33256C4.71639 3.22533 2.458 5.8235 2.06189 9ZM8.0307 9H11.9693C11.8189 6.56122 11.1222 4.27025 10 2.24799C8.8778 4.27025 8.1811 6.56122 8.0307 9ZM12.29 2.33256C13.2526 4.37407 13.8427 6.62577 13.9727 9H17.9381C17.542 5.8235 15.2836 3.22533 12.29 2.33256Z"
                  fill="#202024"
                />
              </svg>
              Русский
              <span>
                <FaAngleDown />
              </span>
            </div>
            <div className="header-profile">
              {userToken.length > 0 ? (
                <>
                  <button className="customButton transparent">
                    {" "}
                    <svg
                      width="16"
                      height="21"
                      viewBox="0 0 16 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 21H14V19C14 17.3431 12.6569 16 11 16H5C3.34315 16 2 17.3431 2 19V21H0V19C0 16.2386 2.23858 14 5 14H11C13.7614 14 16 16.2386 16 19V21ZM8 12C4.68629 12 2 9.3137 2 6C2 2.68629 4.68629 0 8 0C11.3137 0 14 2.68629 14 6C14 9.3137 11.3137 12 8 12ZM8 10C10.2091 10 12 8.20914 12 6C12 3.79086 10.2091 2 8 2C5.79086 2 4 3.79086 4 6C4 8.20914 5.79086 10 8 10Z"
                        fill="#202024"
                      />
                    </svg>
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="customButton transparent header-profile"
                    onClick={() => dispatch(setModal(true))}
                  >
                    <svg
                      width="16"
                      height="21"
                      viewBox="0 0 16 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 21H14V19C14 17.3431 12.6569 16 11 16H5C3.34315 16 2 17.3431 2 19V21H0V19C0 16.2386 2.23858 14 5 14H11C13.7614 14 16 16.2386 16 19V21ZM8 12C4.68629 12 2 9.3137 2 6C2 2.68629 4.68629 0 8 0C11.3137 0 14 2.68629 14 6C14 9.3137 11.3137 12 8 12ZM8 10C10.2091 10 12 8.20914 12 6C12 3.79086 10.2091 2 8 2C5.79086 2 4 3.79086 4 6C4 8.20914 5.79086 10 8 10Z"
                        fill="#202024"
                      />
                    </svg>
                    Войти
                  </button>
                </>
              )}
              {userToken.length > 0 ? (
                <div className="menu">
                  <a href="/my-orders">Мои заказы</a>
                  <button onClick={handleLogOut}>
                    Выйти <FiLogOut />
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <CustomButton type="regular" cls={"header-bar_btn"}>
            <svg
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.5 0.333344H15.5V2.00001H0.5V0.333344ZM5.5 6.16668H15.5V7.83334H5.5V6.16668ZM0.5 12H15.5V13.6667H0.5V12Z"
                fill="white"
              />
            </svg>
          </CustomButton>
        </div>
      </div>
      {modal && <Modal>{userToken.length > 0 ? <Login /> : <Signup />}</Modal>}
    </header>
  );
};

export default Header;
