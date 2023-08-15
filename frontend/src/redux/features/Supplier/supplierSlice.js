

// the data returned form add supplier api aint stored in the redux because such data is not
// needed

import { createSlice } from "@reduxjs/toolkit";

import { addSupplier, supplierAll } from "./supplierAction";

const initialState = {
    loading: false,
    error: null,
    success: false,
    suppliers: [],
    supliersById: null,
};

const supplierSlice = createSlice({
    name: "suppliers",
    initialState,
    reducers: {
        clearFields: (state, { payload }) => {
            state.success = false;
            state.loading = false;
            state.error = false;
            // state.userById = null;
        },
    },
    extraReducers: {
        // register bike
        [addSupplier.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [addSupplier.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.success = true;
        },
        [addSupplier.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },

        [supplierAll.pending]: (state, { payload }) => {
            state.loading = true;
            state.error = null;
            // state.suppliers = payload
        },
        [supplierAll.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.success = true;
            state.suppliers = payload
        },
        [supplierAll.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },


    },
});
export const { clearFields } = supplierSlice.actions;
export default supplierSlice.reducer;
