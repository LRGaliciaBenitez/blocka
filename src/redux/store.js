import { configureStore } from "@reduxjs/toolkit";
import topCoinsReducer from "./topCoinsSlice";
import trendingReducer from "./trendingSlice";
import currencyReducer from "./currencySlice";
import searchCoinsReducer from "./searchCoinsSlice";
import coinDetailReducer from "./coinDetailSlice";
import favoritesReducer from "./favoritesSlice";
import allCoinsReducer from "./allCoinsSlice";

const store = configureStore({
    reducer: {
        topCoins: topCoinsReducer,
        trending: trendingReducer,
        currency: currencyReducer,
        searchCoins: searchCoinsReducer,
        coinDetail: coinDetailReducer,
        favorites: favoritesReducer,
        allCoins: allCoinsReducer,
    }
})

export default store