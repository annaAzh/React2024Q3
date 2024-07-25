import { FC, useContext } from 'react';
import style from './Favourite.module.scss';

import { ThemeContext } from 'app/store/Themecontext';
import { Button } from 'shared/components/Button';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { clearFavourite } from 'features/controlFavoriteMovies/slices/favoriteSlice';
import { useSelector } from 'react-redux';
import { getFavourites } from 'features/controlFavoriteMovies';

interface FavouriteProps {}

const Favourite: FC<FavouriteProps> = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const dispatch = useAppDispatch();
  const favourites = useSelector(getFavourites);

  const handleUnselectFavourite = () => {
    dispatch(clearFavourite());
  };

  return (
    <div className={isDarkMode ? `${style.favourite_block} ${style.favourite_block_dark}` : style.favourite_block}>
      <div>
        {favourites.heroes.length} {favourites.heroes.length === 1 ? 'item is' : 'items are'} selected
      </div>
      <div className={style.btns_wrapper}>
        <Button onClick={handleUnselectFavourite}>Unselect all</Button>
        <Button>Download</Button>
      </div>
    </div>
  );
};

export { Favourite };
