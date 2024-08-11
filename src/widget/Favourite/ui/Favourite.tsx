import { FC } from 'react';
import { Button } from 'shared/components/Button';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { generateCSV } from 'shared/utils/helpers';
import { useSelector } from 'react-redux';
import { clearFavourite, getFavourites } from 'features/controlFavoriteMovies';
import { useTheme } from 'app/providers/themeProvider/hook';
import style from './Favourite.module.scss';

interface FavouriteProps {}

const Favourite: FC<FavouriteProps> = () => {
  const { isDarkMode } = useTheme();
  const dispatch = useAppDispatch();
  const favourites = useSelector(getFavourites);
  const { heroes } = favourites;

  const handleUnselectFavourite = () => {
    dispatch(clearFavourite());
  };

  if (!heroes.length) {
    return null;
  }

  const handleDownloadFavourites = () => {
    const csvContent = generateCSV(heroes);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    return URL.createObjectURL(blob);
  };

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
