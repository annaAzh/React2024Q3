import { favoriteReducer } from 'features/controlFavoriteMovies/slices/favoriteSlice';

export interface StateSchema {
  favourite: typeof favoriteReducer;
}
