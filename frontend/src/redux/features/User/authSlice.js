import { createSlice } from "@reduxjs/toolkit";
import {
  userLogin,
  userRegister,
  userAll,
  LoggedInUser,
  editUserById,
  getUserById,
} from "./authAction";
import jwt from "jwt-decode";
// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;
const userInfo = userToken ? jwt(userToken) : null;
const initialState = {
  loading: false,
  userInfo,
  userToken,
  error: null,
  success: false,
  users: [],
  userById: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken");
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
      state.users = [];
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload.data;
    },
    clearFields: (state, { payload }) => {
      state.success = false;
      state.loading = false;
      state.error = false;
      state.userById = null;
    },
  },
  extraReducers: {
    // login user
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      const user = jwt(payload.token);
      state.loading = false;
      state.userInfo = user;
      state.userToken = payload.token;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // get logged in  user
    [LoggedInUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [LoggedInUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
    },
    [LoggedInUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // register user
    [userRegister.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userRegister.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful
    },
    [userRegister.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    //all the users

    [userAll.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userAll.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.users = payload;
    },
    [userAll.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    //all the users by id
    [getUserById.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getUserById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userById = payload;
    },
    [getUserById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    //update user
    [editUserById.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [editUserById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [editUserById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { logout, setCredentials, clearFields } = authSlice.actions;
export default authSlice.reducer;
