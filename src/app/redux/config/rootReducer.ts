import { combineReducers } from '@reduxjs/toolkit';
import { StateSchema } from './stateSchema';
import { formsReducer } from '../slices/formsSlice';
import { countriesReducer } from '../slices/countrySlice';

export const rootReducer = combineReducers<StateSchema>({
  forms: formsReducer,
  countries: countriesReducer,
});
