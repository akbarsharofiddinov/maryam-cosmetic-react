import React, { useEffect, useState } from "react";
import { formatter } from "@/utils/formatString";

// Favourite Slice actions
import {
  removeFromFavourite,
  setFavouriteProducts,
} from "@/store/Favourites/favouriteSlice";

// Store hooks
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";

// React icons
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  addToCart,
  decreaseCount,
  increaseCount,
  setCartProducts,
} from "@/store/Cart/cartSlice";

interface IProps {
  data: IProduct;
  quantity?: number;
  inCart?: boolean;
}

type LocalCart = {
  product: IProduct;
  quantity: number;
};

const ProductItem: React.FC<IProps> = ({ data, quantity, inCart }: IProps) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [showCountBox, setShowCountBox] = useState(false);
  const [count, setCount] = useState(1);

  const dispatch = useAppDispatch();
  // 'products' IProduct[] which is only favourited
  const { products } = useAppSelector((state) => state.favourite);

  // Cart Products
  const { products: cartProducts } = useAppSelector((state) => state.cart);

  // Add Favourite Function ---- FAVOURITE
  function handleAddFavouriteProduct() {
    if (isFavourite) {
      dispatch(removeFromFavourite(data));
      const localFav: IProduct[] = JSON.parse(
        localStorage.getItem("favourites") + ""
      );

      if (localFav.length > 1) {
        const filteredLocalFav = localFav.filter((item) => item.id !== data.id);
        localStorage.setItem("favourites", JSON.stringify(filteredLocalFav));
      } else {
        localStorage.removeItem("favourites");
      }
      setIsFavourite(false);
    } else {
      setIsFavourite(true);
      if (!localStorage.getItem("favourites")) {
        const newArr = [data];
        localStorage.setItem("favourites", JSON.stringify(newArr));
        dispatch(setFavouriteProducts(newArr));
      } else {
        const localFav: IProduct[] = JSON.parse(
          localStorage.getItem("favourites") + ""
        );
        const newArr = localFav.concat(data);
        localStorage.setItem("favourites", JSON.stringify(newArr));
        dispatch(setFavouriteProducts(newArr));
      }
    }
  }

  // Add to Cart Function ---- CART
  function handleAddCart() {
    dispatch(addToCart(data));
    if (!localStorage.getItem("cart")) {
      localStorage.setItem(
        "cart",
        JSON.stringify([{ product: data, quantity: count }])
      );
    } else {
      const localCart: LocalCart[] = JSON.parse(
        localStorage.getItem("cart") + ""
      );
      localCart.push({ product: data, quantity: count });
      localStorage.setItem("cart", JSON.stringify(localCart));
    }
  }

  // Handle Increase Function ---- CART
  function handleIncrease() {
    if (count < 99) {
      setCount((prev) => prev + 1);
      dispatch(increaseCount(data.id));
      const localCart: LocalCart[] = JSON.parse(
        localStorage.getItem("cart") + ""
      );

      localCart.map((item) => item.product.id === data.id && item.quantity++);
      localStorage.setItem("cart", JSON.stringify(localCart));
    }
  }

  // Handle Decrease Function ---- CART
  function handleDecrease() {
    const localCart: LocalCart[] = JSON.parse(
      localStorage.getItem("cart") + ""
    );
    if (count > 1) {
      setCount((prev) => prev - 1);
      dispatch(decreaseCount(data.id));
      localCart.map((item) => item.product.id === data.id && item.quantity--);
      localStorage.setItem("cart", JSON.stringify(localCart));
    } else if (count === 1) {
      setShowCountBox(false);
      dispatch(
        setCartProducts(localCart.filter((item) => item.product.id !== data.id))
      );
      localStorage.setItem(
        "cart",
        JSON.stringify(localCart.filter((item) => item.product.id !== data.id))
      );
    }
  }

  // Handle Delete Product from Cart

  function handleDeleteFromCart() {
    const localCart: LocalCart[] = JSON.parse(
      localStorage.getItem("cart") + ""
    );

    dispatch(
      setCartProducts(localCart.filter((item) => item.product.id !== data.id))
    );

    if (localCart.length === 1) {
      localStorage.removeItem("cart");
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify(localCart.filter((item) => item.product.id !== data.id))
      );
    }
  }

  // Make Product's Favourite button RED ---- FAVOURITE
  useEffect(() => {
    products.map((item) => {
      if (item.id === data.id) setIsFavourite(true);
    });
  }, [products]);

  // Check the Product is in Cart ---- CART
  useEffect(() => {
    cartProducts.map((item) => {
      if (item.product.id === data.id) {
        setShowCountBox(true);
        setCount(item.quantity);
      }
    });
  }, [cartProducts]);

  return (
    <>
      <div className="product-box">
        <a href={`/details/?id=${data.id}`}></a>
        <span className="discount">-20%</span>
        <button className="favourite-btn" onClick={handleAddFavouriteProduct}>
          {isFavourite ? <FaHeart style={{ color: "red" }} /> : <FaRegHeart />}
        </button>
        <div className="product-image_box">
          <img
            src={`https://maryam.webclub.uz/${data.image_url}`}
            alt="product image"
          />
        </div>
        <div className="body">
          <p className="title">
            {data.name.length > 60 ? data.name.slice(0, 60) + "..." : data.name}
          </p>
          <span>
            {/\d/.test(data.name.split(" ")[data.name.split(" ").length - 1]) &&
              data.name.split(" ")[data.name.split(" ").length - 1]}
          </span>

          <div className="price-tag">
            {/* <p className="old-price">120,000 so‘m</p> */}
            <p className="price">{formatter(data.price)} so‘m</p>
          </div>
          <button
            className={showCountBox ? "order-btn hide" : "order-btn"}
            onClick={handleAddCart}
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
            Savatchaga
          </button>
          <div
            className={showCountBox ? "count-box show" : "count-box"}
            style={inCart ? { display: "none" } : {}}
          >
            <button className="count-decreaser" onClick={handleDecrease}>
              &minus;
            </button>
            <input
              type="text"
              className="count"
              maxLength={2}
              value={quantity ? quantity : count}
              onChange={(e) => setCount(Number.parseInt(e.target.value))}
            />
            <button className="count-increaser" onClick={handleIncrease}>
              +
            </button>
          </div>
          {inCart ? (
            <div className="buttons">
              <button
                className="cart-delete_btn"
                onClick={handleDeleteFromCart}
              >
                {" "}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.1667 4H17.3334V5.66666H15.6667V16.5C15.6667 16.9602 15.2937 17.3333 14.8334 17.3333H3.16675C2.70651 17.3333 2.33341 16.9602 2.33341 16.5V5.66666H0.666748V4H4.83341V1.5C4.83341 1.03976 5.20651 0.666664 5.66675 0.666664H12.3334C12.7937 0.666664 13.1667 1.03976 13.1667 1.5V4ZM14.0001 5.66666H4.00008V15.6667H14.0001V5.66666ZM6.50008 8.16666H8.16675V13.1667H6.50008V8.16666ZM9.83341 8.16666H11.5001V13.1667H9.83341V8.16666ZM6.50008 2.33333V4H11.5001V2.33333H6.50008Z"
                    fill="#FF1C67"
                  />
                </svg>
                O‘chirish
              </button>
              <div className={showCountBox ? "count-box show" : "count-box"}>
                <button className="count-decreaser" onClick={handleDecrease}>
                  &minus;
                </button>
                <input
                  type="text"
                  className="count"
                  maxLength={2}
                  value={quantity ? quantity : count}
                  onChange={(e) => setCount(Number.parseInt(e.target.value))}
                />
                <button className="count-increaser" onClick={handleIncrease}>
                  +
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default ProductItem;
