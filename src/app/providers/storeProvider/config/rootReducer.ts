import { combineReducers } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { favoriteReducer } from 'features/controlFavoriteMovies/slices/favoriteSlice';

export const rootReducer = combineReducers<StateSchema>({
  favourite: favoriteReducer,
});
