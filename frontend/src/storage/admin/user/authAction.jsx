import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from '../../../API';


export const userLogin = createAsyncThunk('user/login',
    async (values, { rejectWithValue }) => {

        console.log(values);



        try {

            const res = await axios.post(`${API}/login`, values)
            console.log(res);

            return res.data.token

        }

        catch (error) {
            // console.log(error);

            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                console.log(error);
                return rejectWithValue(error.message);
            }

        }

    }


)




