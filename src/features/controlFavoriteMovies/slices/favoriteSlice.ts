import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavouriteHero, FavouriteShema } from '../types/favoriteTypes';

const initialState: FavouriteShema = {
  heroes: [],
};

export const favoriteSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    addFavourite(state: FavouriteShema, action: PayloadAction<FavouriteHero>) {
      state.heroes = [...state.heroes, action.payload];
    },
    removeFavourite(state: FavouriteShema, action: PayloadAction<FavouriteHero>) {
      state.heroes = state.heroes.filter((heroe) => heroe.id !== action.payload.id);
    },
    clearFavourite(state: FavouriteShema) {
      state.heroes = [];
    },
  },
});

export const { reducer: favoriteReducer } = favoriteSlice;
export const { addFavourite, removeFavourite, clearFavourite } = favoriteSlice.actions;
