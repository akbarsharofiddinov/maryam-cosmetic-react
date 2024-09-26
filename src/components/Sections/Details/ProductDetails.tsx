import {
  removeFromFavourite,
  setFavouriteProducts,
} from "@/store/Favourites/favouriteSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { formatter } from "@/utils/formatString";

import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductDetails: React.FC = () => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [productData, setProductData] = useState<IProduct>();
  const [count, setCount] = useState(1);
  const [isInCart, setIsInCart] = useState(false);

  const dispatch = useAppDispatch();

  const { products, isError, isLoading } = useAppSelector(
    (state) => state.products
  );

  const { products: favProducts } = useAppSelector((state) => state.favourite);
  const { products: cartProducts } = useAppSelector((state) => state.cart);

  const params = Number.parseInt(window.location.search.slice(4));

  // Add Favourite Function ---- FAVOURITE
  function handleAddFavouriteProduct() {
    console.log("first");
    if (isFavourite) {
      dispatch(removeFromFavourite(productData!));
      const localFav: IProduct[] = JSON.parse(
        localStorage.getItem("favourites") + ""
      );

      if (localFav.length > 1) {
        const filteredLocalFav = localFav.filter(
          (item) => item.id !== productData?.id
        );
        localStorage.setItem("favourites", JSON.stringify(filteredLocalFav));
      } else {
        localStorage.removeItem("favourites");
      }
      setIsFavourite(false);
    } else {
      setIsFavourite(true);
      if (!localStorage.getItem("favourites")) {
        const newArr = [productData!];
        localStorage.setItem("favourites", JSON.stringify(newArr));
        dispatch(setFavouriteProducts(newArr));
      } else {
        const localFav: IProduct[] = JSON.parse(
          localStorage.getItem("favourites") + ""
        );
        const newArr = localFav.concat(productData!);
        localStorage.setItem("favourites", JSON.stringify(newArr));
        dispatch(setFavouriteProducts(newArr));
      }
    }
  }

  useEffect(() => {
    if (products.length > 0) {
      products.map((item) => {
        if (item.id === params) {
          setProductData(item);
        }
      });
    }
  }, [params, products]);

  useEffect(() => {
    if (productData) {
      cartProducts.map((item) => {
        if (item.product.id === productData.id) {
          setIsInCart(true);
        }
      });
    }
  }, [productData]);

  useEffect(() => {
    favProducts.map((item) => {
      if (item.id === productData?.id) setIsFavourite(true);
    });
  }, [favProducts, productData]);

  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : isError ? (
        <div>Error</div>
      ) : (
        <div className="product-details">
          <div className="left product-image">
            <img
              src={`https://maryam.webclub.uz/${productData?.image_url}`}
              alt="product image"
            />
          </div>
          <div className="right details">
            <div className="similar-colors">
              <div className="image-box">
                <img
                  src={`https://maryam.webclub.uz/${productData?.image_url}`}
                  alt="simi color image"
                />
              </div>
              <div className="image-box none">
                <img
                  src={`https://maryam.webclub.uz/${productData?.image_url}`}
                  alt="simi color image"
                />
              </div>
              <div className="image-box">
                <img
                  src={`https://maryam.webclub.uz/${productData?.image_url}`}
                  alt="simi color image"
                />
              </div>
              <div className="image-box">
                <img
                  src={`https://maryam.webclub.uz/${productData?.image_url}`}
                  alt="simi color image"
                />
              </div>
            </div>
            <div className="more-details">
              <div className="top">
                <div className="rating">
                  <svg
                    width="20"
                    height="19"
                    viewBox="0 0 20 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.0003 15.2167L4.12246 18.5068L5.43524 11.8999L0.489746 7.32651L7.17895 6.53339L10.0003 0.416672L12.8217 6.53339L19.5108 7.32651L14.5654 11.8999L15.8782 18.5068L10.0003 15.2167Z"
                      fill="#FFE70D"
                    />
                  </svg>

                  <p>
                    Рейтинг: <span>(4,5)</span>
                  </p>
                </div>
                <div className="comments">
                  <p>
                    Комментарии: <span>(268)</span>
                  </p>
                </div>
                <div className="orders">
                  <svg
                    width="16"
                    height="18"
                    viewBox="0 0 16 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.6706 17.3333H1.33724C0.877006 17.3333 0.503906 16.9603 0.503906 16.5V1.50001C0.503906 1.03977 0.877006 0.666672 1.33724 0.666672H14.6706C15.1308 0.666672 15.5039 1.03977 15.5039 1.50001V16.5C15.5039 16.9603 15.1308 17.3333 14.6706 17.3333ZM5.50391 4.00001H3.83724V5.66667C3.83724 7.96784 5.70272 9.83334 8.00392 9.83334C10.3051 9.83334 12.1706 7.96784 12.1706 5.66667V4.00001H10.5039V5.66667C10.5039 7.04738 9.38459 8.16667 8.00392 8.16667C6.62317 8.16667 5.50391 7.04738 5.50391 5.66667V4.00001Z"
                      fill="#0ACF83"
                    />
                  </svg>
                  <p>5 200 шт. заказов</p>
                </div>
                <div className="favourite" onClick={handleAddFavouriteProduct}>
                  {isFavourite ? (
                    <FaHeart style={{ color: "red" }} />
                  ) : (
                    <FaRegHeart />
                  )}
                  <p>Избранное</p>
                </div>
              </div>
              <div className="info">
                <h3 className="title">{productData?.name}</h3>
                <div className="about-product">
                  <h4>Описание продукта:</h4>
                  <ul>
                    <li>Подходит для всех типов кожи/волос</li>
                    <li>
                      Разработан с использованием высококачественных
                      ингредиентов
                    </li>
                    <li>Продукты прошли дерматологические испытания</li>
                    <li>Идеально для ежедневного ухода</li>
                    <li>Легкий в применении и впитывании</li>
                    <li>Подходит для чувствительной кожи/волос</li>
                    <li>Эффективное увлажнение и защита</li>
                  </ul>
                  <div className="price-tag">
                    {/* <p className="old-price">
                    <span>120,000 so‘m</span>
                    <span className="discount">-20%</span>
                  </p> */}
                    <p className="current-price">
                      {formatter(productData?.price!) + " сумм"}
                    </p>
                  </div>
                </div>
                {isInCart ? (
                  <div className="ordering-box">
                    <div className="count-box">
                      <button
                        className="count-decreaser"
                        onClick={() =>
                          setCount((prev) => (prev > 1 ? prev - 1 : prev))
                        }
                      >
                        &minus;
                      </button>

                      <input
                        type="number"
                        className="count"
                        value={count}
                        min="1"
                        max="99"
                        onChange={(e) =>
                          setCount(Number.parseInt(e.target.value))
                        }
                      />
                      <button
                        className="count-increaser"
                        onClick={() => setCount((prev) => prev + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button className="order-btn">
                      <svg
                        width="19"
                        height="21"
                        viewBox="0 0 19 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.50488 6.99975V4.99975C4.50488 2.23833 6.74346 -0.000244141 9.5049 -0.000244141C12.2663 -0.000244141 14.5049 2.23833 14.5049 4.99975V6.99975H17.5049C18.0572 6.99975 18.5049 7.44747 18.5049 7.99975V19.9998C18.5049 20.552 18.0572 20.9998 17.5049 20.9998H1.50488C0.952603 20.9998 0.504883 20.552 0.504883 19.9998V7.99975C0.504883 7.44747 0.952603 6.99975 1.50488 6.99975H4.50488ZM4.50488 8.99975H2.50488V18.9998H16.5049V8.99975H14.5049V10.9998H12.5049V8.99975H6.50488V10.9998H4.50488V8.99975ZM6.50488 6.99975H12.5049V4.99975C12.5049 3.3429 11.1617 1.99975 9.5049 1.99975C7.848 1.99975 6.50488 3.3429 6.50488 4.99975V6.99975Z"
                          fill="white"
                        />
                      </svg>
                      Купить
                    </button>
                  </div>
                ) : (
                  <button
                    className={isInCart ? "order-btn hide" : "order-btn"}
                    onClick={() => setIsInCart(true)}
                  >
                    <svg
                      width="19"
                      height="21"
                      viewBox="0 0 19 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.50488 6.99975V4.99975C4.50488 2.23833 6.74346 -0.000244141 9.5049 -0.000244141C12.2663 -0.000244141 14.5049 2.23833 14.5049 4.99975V6.99975H17.5049C18.0572 6.99975 18.5049 7.44747 18.5049 7.99975V19.9998C18.5049 20.552 18.0572 20.9998 17.5049 20.9998H1.50488C0.952603 20.9998 0.504883 20.552 0.504883 19.9998V7.99975C0.504883 7.44747 0.952603 6.99975 1.50488 6.99975H4.50488ZM4.50488 8.99975H2.50488V18.9998H16.5049V8.99975H14.5049V10.9998H12.5049V8.99975H6.50488V10.9998H4.50488V8.99975ZM6.50488 6.99975H12.5049V4.99975C12.5049 3.3429 11.1617 1.99975 9.5049 1.99975C7.848 1.99975 6.50488 3.3429 6.50488 4.99975V6.99975Z"
                        fill="white"
                      />
                    </svg>
                    В корзину
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
