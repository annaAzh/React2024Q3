import { useLocation, useNavigate } from 'react-router-dom';
import { HeroResponse, Paths } from 'shared/types';
import style from './Hero.module.scss';
import { FC, useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'app/store/Themecontext';
import { useGetHeroQuery } from 'shared/api';

const Hero: FC = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const locationPath = useLocation();
  const parse = locationPath.pathname.split('/');
  const id = parse[parse.length - 1];

  const [hero, setHero] = useState<HeroResponse>();
  const { data, isLoading } = useGetHeroQuery(id);

  useEffect(() => {
    if (data) {
      setHero(data);
    }
  }, [locationPath, data]);

  const handleCloseClick = () => {
    navigate(Paths.base + locationPath.search);
  };

  if (!hero) {
    return (
      <div className={isDarkMode ? `${style.wrapper} ${style.wrapper_dark}` : style.wrapper}>
        <button className={style.close_btn} onClick={handleCloseClick}>
          &times;
        </button>
        {isLoading && <div>Loading...</div>}
      </div>
    );
  }

  const { gender, species, status, location } = hero;
  const { name: locationName } = location;

  return (
    <>
      <div className={isDarkMode ? `${style.wrapper} ${style.wrapper_dark}` : style.wrapper} data-testid="hero">
        <button data-testid="close" className={style.close_btn} onClick={handleCloseClick}>
          &times;
        </button>
        {hero && (
          <>
            <div>
              <img src={hero?.image} className={style.hero_img} alt={hero?.name} />
            </div>
            <h3 className={style.hero_desc}>{hero?.name}</h3>
            {locationName && (
              <p className={style.hero_info}>
                <b>Location:</b> {locationName}
              </p>
            )}
            {gender && (
              <p className={style.hero_info}>
                <b>Gender:</b> {gender}
              </p>
            )}
            {species && (
              <p className={style.hero_info}>
                <b>Species:</b> {species}
              </p>
            )}
            {status && (
              <p className={style.hero_info}>
                <b>Status:</b> {status}
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export { Hero };
