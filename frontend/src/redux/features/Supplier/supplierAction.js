import { createAsyncThunk } from "@reduxjs/toolkit";
import Http from "../../../Helper/Http";
import { toast } from "react-hot-toast";

export const addSupplier = createAsyncThunk(
    "supplier/add",
    async (values, { rejectWithValue }) => {
        try {
            console.log('here');
            const data = await Http.post("/supplier/add", values);
            console.log(values);
            // toast.success("Supplier added successfully.")
            return data.data;
        } catch (error) {
            if (error.response && error.response.data.message) {

                toast.error(error.response.data.message)
                return rejectWithValue(error.response.data.message);
            } else {
                // toast.error(error.message)
                return rejectWithValue(error.message);
            }
        }
    }
);


export const supplierAll = createAsyncThunk(
    "supplier/add",
    async (values, { rejectWithValue }) => {
        try {
            console.log('here');
            const data = await Http.get("/supplier/");
            console.log(data.data);
            return data.data;
        } catch (error) {
            if (error.response && error.response.data.message) {

                toast.error(error.response.data.message)
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

