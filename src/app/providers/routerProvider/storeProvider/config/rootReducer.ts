import { combineReducers } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { heroesApi } from 'shared/api';
import { favoriteReducer } from 'features/controlFavoriteMovies/slices/favoriteSlice';

export const rootReducer = combineReducers<StateSchema>({
  [heroesApi.reducerPath]: heroesApi.reducer,

  favourite: favoriteReducer,
});
