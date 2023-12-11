import { createSlice } from "@reduxjs/toolkit";
import { IItem } from "../../modules/items/component/Item";
import { PayloadAction } from "@reduxjs/toolkit";

const itemSlice = createSlice({
    name: "item",
    initialState: { items: [] as IItem[] },
    reducers: {
        setItems(state, payload: PayloadAction<IItem[]>) {
            return { ...state, items: payload.payload };
        },
        addItem(state, payload: PayloadAction<IItem>) {
            return { ...state, items: [...state.items, payload.payload] }
        }
    }
})

export const { setItems,addItem } = itemSlice.actions

export default itemSlice.reducer;