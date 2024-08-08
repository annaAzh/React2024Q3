import { HeroResponse } from 'shared/types';
import style from './Hero.module.scss';
import { FC } from 'react';
import { useTheme } from 'app/providers/themeProvider/hook';
import { useRouter } from 'next/router';
import HeroCard from './HeroCard';

type HeroProps = {
  hero: HeroResponse | null;
};

const Hero: FC<HeroProps> = (props) => {
  const { hero } = props;
  const { isDarkMode } = useTheme();
  const router = useRouter();

  const handleCloseClick = () => {
    const { search, page } = router.query;
    router.push({
      pathname: router.pathname,
      query: { search, page },
    });
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
