import { createSlice } from '@reduxjs/toolkit';
import { countryList } from 'shared/types/countries';

export interface CountryState {
  countries: Array<string>;
}

const initialState: CountryState = {
  countries: countryList,
};

export const controllFormSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export const { reducer: countriesReducer } = controllFormSlice;
