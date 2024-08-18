import { RootState } from '../config/store';
import { CountryState } from '../slices/countrySlice';

export const getCountries = (state: RootState): CountryState => {
  return state.countries;
};
