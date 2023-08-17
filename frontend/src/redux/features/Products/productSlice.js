import { createSlice } from "@reduxjs/toolkit";
import {
  ProductAll,
  addProduct,
  deleteProduct,
  editProductById,
  getProductById,
  addStock,
} from "./productAction";

const initialState = {
  loading: false,
  error: null,
  success: false,
  products: [],
  productsById: null,
};

const productSlice = createSlice({
  name: "products",
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
    // register bike
    [addProduct.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [addProduct.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful
    },
    [addProduct.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    //all the bikes
    [ProductAll.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [ProductAll.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.products = payload;
    },
    [ProductAll.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    //all the bikes by id
    [getProductById.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getProductById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.productsById = payload;
    },
    [getProductById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    //update bike
    [editProductById.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [editProductById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [editProductById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    //delete bike
    [deleteProduct.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      const id = action.meta.arg;
      if (id) {
        state.products = state.products.filter((item) => item.id !== id);
      }
      state.loading = false;
      state.success = true;
    },
    [deleteProduct.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // add stock
    //all the bikes
    [addStock.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [addStock.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; //stock added successfully
    },
    [addStock.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
export const { clearFields } = productSlice.actions;
export default productSlice.reducer;
