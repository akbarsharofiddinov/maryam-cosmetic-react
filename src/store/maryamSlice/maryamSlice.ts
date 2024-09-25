import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  modal: boolean;
  userToken: string;
  userNumber: string;
}

const initialState: IState = {
  modal: false,
  userToken: "",
  userNumber: "",
};

export const maryamSlice = createSlice({
  name: "maryamSlice",
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<boolean>) => {
      state.modal = action.payload;
    },

    setUserToken: (state, action: PayloadAction<string>) => {
      state.userToken = action.payload;
    },

    setUserNumberStore: (state, action: PayloadAction<string>) => {
      state.userNumber = action.payload;
    },
  },
});

export const { setModal, setUserToken, setUserNumberStore } = maryamSlice.actions;

export default maryamSlice.reducer;
