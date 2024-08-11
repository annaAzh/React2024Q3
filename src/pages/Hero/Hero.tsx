import { Paths } from 'shared/types';
import style from './Hero.module.scss';
import { FC } from 'react';
import HeroCard from './HeroCard';
import { useTheme } from 'app/providers/themeProvider/hook';
import { useLoaderData, useNavigate, useNavigation, useSearchParams } from '@remix-run/react';
import { loader } from 'app/routes/heroes.$id';
import { Loader } from 'shared/components/Loader/Loader';

const Hero: FC = () => {
  const { data: hero } = useLoaderData<typeof loader>() || {};
  const navigation = useNavigation();

  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const search = searchParams.get('search') || '';
  const page = searchParams.get('page') || '1';

  const handleCloseClick = () => {
    const query = new URLSearchParams({ search, page }).toString();
    navigate(`/${Paths.hero}?${query}`);
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

  if (navigation.state === 'loading') {
    return (
      <div className={isDarkMode ? `${style.wrapper} ${style.wrapper_dark}` : style.wrapper}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className={isDarkMode ? `${style.wrapper} ${style.wrapper_dark}` : style.wrapper} data-testid="hero">
        <button data-testid="close" className={style.close_btn} onClick={handleCloseClick}>
          &times;
        </button>
        <HeroCard hero={hero} />
      </div>
    </>
  );
};

export { Hero };
