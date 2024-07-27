import { RootState } from 'app/providers/storeProvider';
import { FavouriteShema } from '../types/favoriteTypes';

const getFavourites = (state: RootState): FavouriteShema => {
  return state.favourite;
};

export { getFavourites };
