'use client';

import style from './Hero.module.scss';
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import HeroCard from './HeroCard';
import { HeroResponse, Paths } from '../../shared/types';
import { useTheme } from '../../_app/providers/themeProvider/hook';

type HeroProps = {
  hero: HeroResponse | null;
  params?: {
    search: string;
    page: string | number;
  };
};

const Hero: FC<HeroProps> = (props) => {
  const { hero } = props;
  const { isDarkMode } = useTheme();
  const router = useRouter();

  const page = props.params?.page.toString() || '1';
  const search = props.params?.search || '';

  const handleCloseClick = () => {
    const query = new URLSearchParams({ search, page }).toString();
    router.push(`/${Paths.hero}?${query}`);
  };

  if (!hero) {
    return (
      <div className={isDarkMode ? `${style.wrapper} ${style.wrapper_dark}` : style.wrapper}>
        <button className={style.close_btn} onClick={handleCloseClick}>
          &times;
        </button>
        <div>Hero not found</div>
      </div>
    );
  }

  return (
    <>
      <div className={isDarkMode ? `${style.wrapper} ${style.wrapper_dark}` : style.wrapper} data-testid="hero">
        <button data-testid="close" className={style.close_btn} onClick={handleCloseClick}>
          &times;
        </button>
        {hero && <HeroCard hero={hero} />}
      </div>
    </>
  );
};

export { Hero };
