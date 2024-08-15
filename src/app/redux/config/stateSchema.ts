import { controllFormReducer } from '../slices/controllFormSlice';
import { countriesReducer } from '../slices/countrySlice';

export interface StateSchema {
  controllForm: typeof controllFormReducer;
  countries: typeof countriesReducer;
}
