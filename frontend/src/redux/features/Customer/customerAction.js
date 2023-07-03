import { createAsyncThunk } from "@reduxjs/toolkit";
import Http from "../../../Helper/Http";

export const customerRegister = createAsyncThunk(
  "customer/register",
  async (userData, { rejectWithValue }) => {

    console.log(userData);
    try {
      const data = await Http.post("/customer/add", userData);
      return data.data;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.errors) {
        return rejectWithValue(error.response.data.errors[0].msg);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const customerAll = createAsyncThunk(
  "customer/all",
  async (allUser, { rejectWithValue }) => {
    try {
      const data = await Http.get(`/customer`);
      console.log(data);
      return data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getCustomerById = createAsyncThunk(
  "customer/id",
  async (id, { rejectWithValue }) => {
    try {
      const data = await Http.get(`/customer/${id}`);
      // console.log(data);
      return data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const editCustomerById = createAsyncThunk(
  "customer/edit",
  async (item, { rejectWithValue }) => {
    // console.log(item);
    try {
      const data = await Http.put(`/customer/update/${item.id}`, item.values);
      // console.log(data);
      return data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
