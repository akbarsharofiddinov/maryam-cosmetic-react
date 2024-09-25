import {
  Announcement,
  Banner,
  Catalog,
  DiscountedProducts,
  GiftSertifications,
  Products,
  Special,
} from "@/components";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { setPagesLength, setProducts } from "@/store/Products/productSlice";
import { useGetAllProductsQuery } from "@/store/RTKQuery";
import React, { useEffect } from "react";

const Home: React.FC = () => {
  const { currentPage } = useAppSelector((state) => state.products);

  const { isSuccess, data } = useGetAllProductsQuery({ page: currentPage });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setProducts(data.data));
      dispatch(setPagesLength(data.last_page));
    }
  }, [data]);

  return (
    <>
      <Banner />
      <DiscountedProducts />
      <Special />
      <Catalog />
      <Products />
      <Announcement />
      <GiftSertifications />
    </>
  );
};

export default Home;
