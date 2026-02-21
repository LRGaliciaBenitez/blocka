import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCoinDetail = createAsyncThunk("coinDetail/coinDetailFetch",
    async(id) => {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);

        return response.data
    }
)

const coinDetailSlice = createSlice({
    name: "coinDetail",
    initialState: {
        results: null,
        loading: false,
        error: null,
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(fetchCoinDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCoinDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload;
            })
            .addCase(fetchCoinDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export default coinDetailSlice.reducer;