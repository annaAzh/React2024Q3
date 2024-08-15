import { combineReducers } from '@reduxjs/toolkit';
import { StateSchema } from './stateSchema';
import { controllFormReducer } from '../slices/controllFormSlice';
import { countriesReducer } from '../slices/countrySlice';

export const rootReducer = combineReducers<StateSchema>({
  controllForm: controllFormReducer,
  countries: countriesReducer,
});
