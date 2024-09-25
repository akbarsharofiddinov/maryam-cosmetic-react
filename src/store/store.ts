import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./Products/productSlice";
import { productAPI } from "./RTKQuery";
import favouriteSlice from "./Favourites/favouriteSlice";
import maryamSlice from "./maryamSlice/maryamSlice";
import cartSlice from "./Cart/cartSlice";

export const store = configureStore({
  reducer: {
    products: productSlice,
    maryam: maryamSlice,
    favourite: favouriteSlice,
    cart: cartSlice,
    [productAPI.reducerPath]: productAPI.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
