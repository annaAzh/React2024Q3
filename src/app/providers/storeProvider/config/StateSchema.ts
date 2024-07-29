import { favoriteReducer } from 'features/controlFavoriteMovies/slices/favoriteSlice';
import { heroesApi } from 'shared/api';

export interface StateSchema {
  [heroesApi.reducerPath]: typeof heroesApi.reducer;
  favourite: typeof favoriteReducer;
}
