import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  products: {
    product: IProduct;
    quantity: number;
  }[];
}

const initialState: IState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      state.products.push({ product: action.payload, quantity: 1 });
    },

    increaseCount: (state, action: PayloadAction<number>) => {
      state.products.map((item) => {
        if (item.product.id === action.payload) {
          item.quantity++;
        }
      });
    },

    decreaseCount: (state, action: PayloadAction<number>) => {
      state.products.map((item, index) => {
        if (item.product.id === action.payload) {
          if (item.quantity > 1) {
            item.quantity--;
          } else if (item.quantity === 1) {
            state.products.splice(index, 1);
          }
        }
      });
    },

    setCartProducts: (
      state,
      action: PayloadAction<{ product: IProduct; quantity: number }[]>
    ) => {
      state.products = action.payload;
    },
  },
});

export const { addToCart, decreaseCount, increaseCount, setCartProducts } =
  cartSlice.actions;

export default cartSlice.reducer;
