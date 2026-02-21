import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
    name: "currency",
    initialState: {
        value: "usd",
    },
    reducers: {
        toggleCurrency: (state) => {
            state.value = state.value === "usd" ? "mxn" : "usd";
        }
    },
})

export const { toggleCurrency } = currencySlice.actions;
export default currencySlice.reducer;