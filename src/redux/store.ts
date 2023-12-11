import { configureStore } from "@reduxjs/toolkit";
import itemSlice from "./slice/item-slice";
import requestSlice from "./slice/request-slice";

export  const store = configureStore({
    reducer: {
        items: itemSlice,
        requests:requestSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;