import { createSlice } from "@reduxjs/toolkit";
import { placeOrder } from "./orderAction";

const initialState = {
  loading: false,
  error: null,
  success: false,
  allOrders: [],
  orderById: null,
  placedOrder: {}
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearFields: (state, { payload }) => {
      state.success = false;
      state.loading = false;
      state.error = false;
      state.userById = null;
    },
  },
  extraReducers: {
    //place order
    [placeOrder.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [placeOrder.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      console.log(payload)
      state.placedOrder = payload

    },
    [placeOrder.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },


  },
});
export const { clearFields } = orderSlice.actions;
export default orderSlice.reducer;
