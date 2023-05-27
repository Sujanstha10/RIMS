import { configureStore } from '@reduxjs/toolkit'
import authSlice from './admin/user/authSlice';



const store = configureStore({

    reducer: {
        auth: authSlice

    }
})

export default store;





