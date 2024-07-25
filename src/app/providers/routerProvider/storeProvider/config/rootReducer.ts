import { combineReducers } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { heroesApi } from 'shared/api';

export const rootReducer = combineReducers<StateSchema>({
  [heroesApi.reducerPath]: heroesApi.reducer,
});
