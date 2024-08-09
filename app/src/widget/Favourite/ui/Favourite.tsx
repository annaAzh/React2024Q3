'use client';

import { FC } from 'react';
import { useSelector } from 'react-redux';
import style from './Favourite.module.scss';
import { useTheme } from '@/app/src/_app/providers/themeProvider/hook';
import { useAppDispatch } from '@/app/src/shared/hooks/useAppDispatch/useAppDispatch';
import { clearFavourite, getFavourites } from '@/app/src/features/controlFavoriteMovies';
import { generateCSV } from '@/app/src/shared/utils/helpers';
import { Button } from '@/app/src/shared/components/Button';

interface FavouriteProps {}

const Favourite: FC<FavouriteProps> = () => {
  const { isDarkMode } = useTheme();
  const dispatch = useAppDispatch();
  const favourites = useSelector(getFavourites);
  const { heroes } = favourites;

  const handleUnselectFavourite = () => {
    dispatch(clearFavourite());
  };

  const handleDownloadFavourites = () => {
    const csvContent = generateCSV(heroes);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    return URL.createObjectURL(blob);
  };

  if (favourites.heroes.length === 0) {
    return;
  }

  return (
    <div
      data-testid="favourite_block"
      className={isDarkMode ? `${style.favourite_block} ${style.favourite_block_dark}` : style.favourite_block}
    >
      <div className={style.info}>
        {heroes.length} {heroes.length === 1 ? 'item is' : 'items are'} selected
      </div>
      <div className={style.btns_wrapper}>
        <Button onClick={handleUnselectFavourite}>Unselect all</Button>
        <Button>
          <a href={handleDownloadFavourites()} download={`${heroes.length}_heroes.csv`}>
            Download
          </a>
        </Button>
      </div>
    </div>
  );
};

export { Favourite };
