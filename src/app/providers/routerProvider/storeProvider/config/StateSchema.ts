import { heroesApi } from 'shared/api';

export interface StateSchema {
  [heroesApi.reducerPath]: typeof heroesApi.reducer;
}
