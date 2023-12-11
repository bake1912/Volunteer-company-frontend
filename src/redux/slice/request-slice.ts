import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItem } from "../../modules/items/component/Item";

export interface IRequest {
    id: number;
    description: string;
    items: IItem[];
}

const requestSlice = createSlice({
    name: "request",
    initialState: {
        requests: [] as IRequest[]
    },
    reducers: {
        setRequests(state, payload: PayloadAction<IRequest[]>) {
            return { ...state, requests: payload.payload };
        },
        addRequest(state, payload: PayloadAction<IRequest>) {
            return { ...state, requests: [...state.requests, payload.payload] }
        }
    }
})

export const { addRequest, setRequests } = requestSlice.actions

export default requestSlice.reducer;