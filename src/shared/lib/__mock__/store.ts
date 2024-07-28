import { configureStore } from '@reduxjs/toolkit';
import { favoriteReducer } from 'features/controlFavoriteMovies';
import { heroesApi } from 'shared/api';

export const store = configureStore({
  reducer: {
    [heroesApi.reducerPath]: heroesApi.reducer,
    favourite: favoriteReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(heroesApi.middleware),
});
