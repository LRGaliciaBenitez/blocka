import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTrending = createAsyncThunk("trending/fetchTrending",
    async () => {
        const response = await axios.get(`https://api.coingecko.com/api/v3/search/trending`);
        return response.data.coins || [];
    }
)


const trendingSlice = createSlice({
    name: "trending",
    initialState: {
        results: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrending.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTrending.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload;
            })
            .addCase(fetchTrending.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export default trendingSlice.reducer