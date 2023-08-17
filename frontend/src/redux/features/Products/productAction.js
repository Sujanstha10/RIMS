import { createAsyncThunk } from "@reduxjs/toolkit";
import Http from "../../../Helper/Http";

export const addProduct = createAsyncThunk(
  "bike/add",
  async (productsData, { rejectWithValue }) => {
    try {
      const data = await Http.post("/product/add", productsData);
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
export const ProductAll = createAsyncThunk(
  "bike/all",
  async (data, { rejectWithValue }) => {
    try {
      const data = await Http.get("/product");
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

export const getProductById = createAsyncThunk(
  "bike/id",
  async (id, { rejectWithValue }) => {
    try {
      const data = await Http.get(`/product/${id}`);
      console.log(data.data, "getproductbyid");
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
export const editProductById = createAsyncThunk(
  "bike/edit",
  async (item, { rejectWithValue }) => {
    try {
      console.log(item.formdata, item.id, "edit product");
      const data = await Http.put(`/product/update/${item.id}`, item.formdata);
      console.log(data.data, "editproductbyid from productAction");
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
export const deleteProduct = createAsyncThunk(
  "bike/delete",
  async (id, { rejectWithValue }) => {
    try {
      const data = await Http.delete(`/product/delete/${id}`);
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
export const addStock = createAsyncThunk(
  "bike/addstock",
  async (item, { rejectWithValue }) => {
    try {
      const data = await Http.put(`/stock/addstock/${item.id}`, item.formdata);
      console.log(data.data, "productAction-addstock");
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
