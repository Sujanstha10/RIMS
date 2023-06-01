import { createSlice } from "@reduxjs/toolkit";
import {
  customerRegister,
  customerAll,
  getCustomerById,
  editCustomerById,
} from "./customerAction";

const initialState = {
  loading: false,
  error: null,
  success: false,
  customers: [],
  customerById: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    clearFields: (state, { payload }) => {
      state.success = false;
      state.loading = false;
      state.error = false;
      state.customerById = null;
    },
  },
  extraReducers: {
    // register customer
    [customerRegister.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [customerRegister.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful
    },
    [customerRegister.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    //all the users

    [customerAll.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [customerAll.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.customers = payload;
    },
    [customerAll.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    //all the users by id
    [getCustomerById.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getCustomerById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.customerById = payload;
    },
    [getCustomerById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    //update user
    [editCustomerById.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [editCustomerById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [editCustomerById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { clearFields } = customerSlice.actions;

export default customerSlice.reducer;
