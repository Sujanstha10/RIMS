import { createSlice } from "@reduxjs/toolkit";
import jwt from "jwt-decode";
import { userLogin } from "./authAction";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const userData = userToken ? jwt(userToken) : null;

const initialState = {
  loading: false,
  error: null,
  success: false,
  userToken,
  userData,
};

const authSlice = createSlice({
  name: "user",
  initialState: initialState,

  reducers: {
    logout: (state, { payload }) => {
      localStorage.removeItem("userToken");
      state.loading = false;
      state.userToken = null;
      state.error = null;
      state.userData = null;
    },
    clearFields: (state, { payload }) => {
      state.success = false;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: {
    //user Login
    [userLogin.fulfilled]: (state, { payload }) => {
      // console.log(state);
      state.success = payload.message;
      state.error = null;
      state.userToken = payload.token;
      state.loading = false;
      localStorage.setItem("userToken", payload.token);
      const userData = jwt(payload.token);
      state.userData = userData;
    },
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [userLogin.rejected]: (state, { payload }) => {
      console.log(payload);
      state.error = payload;
      state.loading = false;
      // console.log(state);
      state.success = false;
    },
  },
});

// export const {}
export default authSlice.reducer;
export const { setError, logout, clearFields } = authSlice.actions;
