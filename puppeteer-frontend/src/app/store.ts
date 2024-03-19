import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import etsyReducer from "../features/etsy/etsySlice";


export const store = configureStore({
    reducer: {
        etsy: etsyReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch