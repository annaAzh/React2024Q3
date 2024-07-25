import { FC, useContext } from 'react';
import style from './Favourite.module.scss';

import { ThemeContext } from 'app/store/Themecontext';
import { Button } from 'shared/components/Button';

interface FavouriteProps {}

const Favourite: FC<FavouriteProps> = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={isDarkMode ? `${style.favourite_block} ${style.favourite_block_dark}` : style.favourite_block}>
      <div>3 items are selected</div>
      <div className={style.btns_wrapper}>
        <Button>Unselect all</Button>
        <Button>Download</Button>
      </div>
    </div>
  );
};

export { Favourite };
