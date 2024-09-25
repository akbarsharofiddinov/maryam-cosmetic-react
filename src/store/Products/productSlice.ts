import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  products: IProduct[];
  currentPage: number;
  pagesLength: number;
  categories: ICategory[];
  lastPage: number;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

const initialState: IState = {
  products: [],
  currentPage: 1,
  pagesLength: 1,
  categories: [],
  lastPage: 0,
  isLoading: false,
  isError: false,
  isSuccess: false,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = [...action.payload];
    },

    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    setPagesLength: (state, action: PayloadAction<number>) => {
      state.pagesLength = action.payload;
    },

    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
    },

    setLastPage: (state, action: PayloadAction<number>) => {
      state.lastPage = action.payload;
    },

    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setIsError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },

    setIsSuccess: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload;
    },
  },
});

export const {
  setProducts,
  setCurrentPage,
  setPagesLength,
  setCategories,
  setLastPage,
  setIsLoading,
  setIsError,
  setIsSuccess
} = productSlice.actions;

export default productSlice.reducer;
