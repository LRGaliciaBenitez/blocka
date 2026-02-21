import { createSlice } from "@reduxjs/toolkit";

const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

const favoritesSlice = createSlice({
    name: "favorites",
    initialState: {
        coins: savedFavorites,
    }, 
    reducers: {
        toggleFavorite: (state, action) => {
            
            const exist = state.coins.find(c => c.id === action.payload.id);

            if(exist) {
                state.coins = state.coins.filter(c => c.id !== action.payload.id);
            } else {
                state.coins.push(action.payload);
            }

            localStorage.setItem("favorites", JSON.stringify(state.coins));
        },
    },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;