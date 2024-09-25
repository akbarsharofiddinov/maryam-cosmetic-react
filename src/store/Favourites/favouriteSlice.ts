import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  products: IProduct[];
  favouritesCount: number;
}

const initialState: IState = {
  products: [],
  favouritesCount: 0,
};

export const favouriteSlice = createSlice({
  name: "favouriteSlice",
  initialState,
  reducers: {
    setFavouriteProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = state.products.concat(action.payload);
    },

    removeFromFavourite: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload.id
      );
    },

    increaseFavourites: (state) => {
      state.favouritesCount--;
    },
  },
});

export const { setFavouriteProducts, increaseFavourites, removeFromFavourite } =
  favouriteSlice.actions;

export default favouriteSlice.reducer;
