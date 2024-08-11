import { combineReducers } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { favoriteReducer } from '@/app/src/features/controlFavoriteMovies';

export const rootReducer = combineReducers<StateSchema>({
  favourite: favoriteReducer,
});
