import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSearchCoins = createAsyncThunk("searchCoins/searchCoinsFetch",
    async(query) => {

        const response = await axios.get(`https://api.coingecko.com/api/v3/search`,
            {
                params: { query: query }
            }
        )

        return response.data
    }
)

const searchCoinsSlice = createSlice({
    name:"searchCoins",
    initialState: {
        results: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearSearch: (state) => {
        state.results = [];
        state.loading = false;
        state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchCoins.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSearchCoins.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload.coins;
            })
            .addCase(fetchSearchCoins.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export default searchCoinsSlice.reducer;
export const { clearSearch } = searchCoinsSlice.actions;