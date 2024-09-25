import {
  Home,
  Catalogs,
  Details,
  CatalogDetail,
  Favourite,
  Cart,
  Order,
  Layout,
} from "@/pages";
import {
  setIsError,
  setIsLoading,
  setIsSuccess,
  setProducts,
} from "./store/Products/productSlice";
import React, { useEffect } from "react";
import { Footer, Header } from "@/components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/hooks/hooks";
import {
  setUserNumberStore,
  setUserToken,
} from "./store/maryamSlice/maryamSlice";
import { useGetAllProductsQuery } from "./store/RTKQuery";
import { setFavouriteProducts } from "./store/Favourites/favouriteSlice";
import { setCartProducts } from "./store/Cart/cartSlice";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { currentPage } = useAppSelector((state) => state.products);

  const {
    isError,
    isLoading,
    isSuccess: getAllProductsSuccess,
    data,
  } = useGetAllProductsQuery({
    page: currentPage,
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path: "/catalogs",
          element: <Catalogs />,
        },
        {
          path: "/details",
          element: <Details />,
        },
        {
          path: "/catalog-details",
          element: <CatalogDetail />,
        },
        {
          path: "/favourite",
          element: <Favourite />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/order",
          element: <Order />,
        },
      ]
    },
  ]);

  useEffect(() => {
    dispatch(setIsLoading(isLoading));
    dispatch(setIsError(isError));
    if (getAllProductsSuccess) {
      dispatch(setIsSuccess(getAllProductsSuccess));
      dispatch(setProducts(data.data));
    }
  }, [getAllProductsSuccess]);

  useEffect(() => {
    // Get User Token
    const userInfo: { token: string; phone: string } = JSON.parse(
      localStorage.getItem("user") + ""
    );

    if (userInfo) {
      dispatch(setUserNumberStore(userInfo.phone));
      dispatch(setUserToken(userInfo.token));
    }

    // Get Favourites from LocaleStorage to State
    if (localStorage.getItem("favourites")) {
      dispatch(
        setFavouriteProducts(
          JSON.parse(localStorage.getItem("favourites") + "")
        )
      );
    }

    // Get Cart Products
    if (localStorage.getItem("cart")) {
      dispatch(setCartProducts(JSON.parse(localStorage.getItem("cart") + "")));
    }
  }, []);

  return (
    <>
      <Header />

      <div style={{ marginTop: "8%" }}>
        <RouterProvider router={router} />
      </div>

      <Footer />
      <ToastContainer />
    </>
  );
};

export default App;
