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

        <p className="price">{formatter(data.price)} so‘m</p>
        <button className="order-btn">Sotib olish</button>
      </div>
    </>
  );
};

export default DiscountedItem;
