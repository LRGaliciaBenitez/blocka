import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTopCoins = createAsyncThunk(
  "topCoins/topCoinsFetch",
  async ({ currency, page }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: currency,
            order: "market_cap_desc",
            per_page: 10,
            page,
            sparkline: false,
            price_change_percentage: "24h",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const topCoinsSlice = createSlice({
  name: "topCoins",
  initialState: {
    results: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopCoins.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTopCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchTopCoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default topCoinsSlice.reducer;