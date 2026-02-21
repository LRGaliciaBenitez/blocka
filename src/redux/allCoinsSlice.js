import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllCoins = createAsyncThunk(
  "allCoins/fetchAllCoins",
  async (_, { getState }) => {
    const { currency, allCoins } = getState();

    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: currency.value,
          order: "market_cap_desc",
          per_page: 10,
          page: allCoins.page,
          sparkline: false,
          price_change_percentage: "24h",
        },
      }
    );

    return response.data;
  }
);

const allCoinsSlice = createSlice({
  name: "allCoins",
  initialState: {
    results: [],
    page: 1,
    loading: false,
    error: null,
  },
  reducers: {
    nextPage: (state) => {
      state.page += 1;
    },
    prevPage: (state) => {
      if (state.page > 1) state.page -= 1;
    },
    resetPage: (state) => {
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCoins.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchAllCoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { nextPage, prevPage, resetPage } = allCoinsSlice.actions;
export default allCoinsSlice.reducer;
