import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../storage/admin/user/authSlice";
import productSlice from "../redux/features/Products/productSlice";
import customerSlice from "../redux/features/Customer/customerSlice";
import supplierSlice from "./features/Supplier/supplierSlice";
import orderSlice from "./features/Order/orderSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productSlice,
    customers: customerSlice,
    suppliers: supplierSlice,
    orders: orderSlice
  },
});
