import { RootState } from '@/app/src/_app/providers/storeProvider';
import { FavouriteShema } from '../types/favoriteTypes';

const getFavourites = (state: RootState): FavouriteShema => {
  return state.favourite;
};

export { getFavourites };
