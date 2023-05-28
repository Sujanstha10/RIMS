import { createAsyncThunk } from "@reduxjs/toolkit";
import Http from "../../../Helper/Http";
import Axios from "axios";
export const userLogin = createAsyncThunk(
  "user/login",
  async (datas, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header to JSON
        },
      };
      const data = await Axios.post("/login", datas, config);
      localStorage.setItem("userToken", data.data.token);
      console.log("loggin successfull", data.data);
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
export const userRegister = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header to JSON
        },
      };
      const data = await Axios.post(`/signup`, userData, config);
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
export const userAll = createAsyncThunk(
  "user/all",
  async ({ page, filter }, { rejectWithValue }) => {
    try {
      let url = `/user?page=${page}`;
      if (filter) {
        url += `&filter=${filter}`;
      }
      const data = await Http.get(url);
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
export const LoggedInUser = createAsyncThunk(
  "user/me",
  async (alluser, { rejectWithValue }) => {
    try {
      const data = await Http.get("/me");

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
export const getUserById = createAsyncThunk(
  "user/id",
  async (id, { rejectWithValue }) => {
    try {
      const data = await Http.get(`/user/userById/${id}`);
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
export const editUserById = createAsyncThunk(
  "user/edit",
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
