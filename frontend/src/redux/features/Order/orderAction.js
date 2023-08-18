import { createAsyncThunk } from "@reduxjs/toolkit";
import Http from "../../../Helper/Http";
import { toast } from "react-hot-toast";

export const placeOrder = createAsyncThunk(
  "order/create",
  async (values, { rejectWithValue }) => {
    try {
      // console.log(values);
      const order = values.items
      console.log(values.items);
      console.log(order);
      const data = await Http.post(`/order/new/${values.customerId}`, { order });
      console.log(data);
      toast.success("Order placed successfully")
      return data.data;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {

        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


