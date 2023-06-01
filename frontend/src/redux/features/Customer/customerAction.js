import { createAsyncThunk } from "@reduxjs/toolkit";
import Http from "../../../Helper/Http";

export const customerRegister = createAsyncThunk(
  "customer/register",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await Http.post("/customer/create", userData);
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
      const data = await Http.get(`/customer/all`);
      return data.data.data;
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
      const data = await Http.get(`/customer/customerById/${id}`);
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
    try {
      const data = await Http.put(`/user/${item.id}`, item.formdata);
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
