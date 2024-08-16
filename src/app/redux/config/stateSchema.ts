import { formsReducer } from '../slices/formsSlice';
import { countriesReducer } from '../slices/countrySlice';

export interface StateSchema {
  forms: typeof formsReducer;
  countries: typeof countriesReducer;
}
