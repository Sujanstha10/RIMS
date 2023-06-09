import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../storage/admin/user/authSlice";
import productSlice from "../redux/features/Products/productSlice";
import customerSlice from "../redux/features/Customer/customerSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productSlice,
    customers: customerSlice,
  },
});
