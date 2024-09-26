import {
  removeFromFavourite,
  setFavouriteProducts,
} from "@/store/Favourites/favouriteSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { formatter } from "@/utils/formatString";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface IProps {
  data: IProduct;
}

const DiscountedItem: React.FC<IProps> = ({ data }) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const dispatch = useAppDispatch();

  const { products } = useAppSelector((state) => state.favourite);

  // Add Favourite Function
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

  // Make Product's Favourite button RED
  useEffect(() => {
    products.map((item) => {
      if (item.id === data.id) setIsFavourite(true);
    });
  }, [isFavourite]);

  return (
    <>
      <a href={`/details/?id=${data.id}`}></a>

      <div className="img-box">
        <span className="discount">-20%</span>
        <button className="favourite-btn" onClick={handleAddFavouriteProduct}>
          {isFavourite ? <FaHeart style={{ color: "red" }} /> : <FaRegHeart />}
        </button>
        <img
          src={`https://maryam.webclub.uz/${data.image_url}`}
          alt="product image"
        />
      </div>
      <div className="body">
        <p className="title">{data.name.slice(0, 35) + "..."}</p>
        <span>450 ml</span>

        <p className="price">{formatter(data.price)} сумм</p>
        <button className="order-btn">
          <span>Купить</span>
          <span>
            <svg
              width="18"
              height="21"
              viewBox="0 0 18 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.00488 6.99966V4.99966C4.00488 2.23824 6.24346 -0.000335693 9.0049 -0.000335693C11.7663 -0.000335693 14.0049 2.23824 14.0049 4.99966V6.99966H17.0049C17.5572 6.99966 18.0049 7.44738 18.0049 7.99966V19.9997C18.0049 20.5519 17.5572 20.9997 17.0049 20.9997H1.00488C0.452603 20.9997 0.00488281 20.5519 0.00488281 19.9997V7.99966C0.00488281 7.44738 0.452603 6.99966 1.00488 6.99966H4.00488ZM4.00488 8.99966H2.00488V18.9997H16.0049V8.99966H14.0049V10.9997H12.0049V8.99966H6.00488V10.9997H4.00488V8.99966ZM6.00488 6.99966H12.0049V4.99966C12.0049 3.34281 10.6617 1.99966 9.0049 1.99966C7.348 1.99966 6.00488 3.34281 6.00488 4.99966V6.99966Z"
                fill="white"
              />
            </svg>
          </span>
        </button>
      </div>
    </>
  );
};

export default DiscountedItem;
