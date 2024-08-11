import { favoriteReducer } from '@/app/src/features/controlFavoriteMovies';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    favourite: favoriteReducer,
  },
});
