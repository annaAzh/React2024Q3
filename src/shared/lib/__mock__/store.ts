import { configureStore } from '@reduxjs/toolkit';
import { favoriteReducer } from 'features/controlFavoriteMovies';

export const store = configureStore({
  reducer: {
    favourite: favoriteReducer,
  },
});
