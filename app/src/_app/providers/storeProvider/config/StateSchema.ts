import { favoriteReducer } from '@/app/src/features/controlFavoriteMovies';

export interface StateSchema {
  favourite: typeof favoriteReducer;
}
