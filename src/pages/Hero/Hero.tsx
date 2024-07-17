import { useLocation, useNavigate } from 'react-router-dom';
import { HeroResponse } from 'shared/lib/api/types';
import { Paths } from 'shared/types';
import style from './Hero.module.scss';
import { FC, useContext, useEffect, useState } from 'react';
import { getSingleHero } from 'shared/lib/api/SearchRequest';
import { ThemeContext } from 'app/store/Themecontext';

const Hero: FC = () => {
  const { isDarkMode } = useContext(ThemeContext);

  const navigate = useNavigate();
  const locationPath = useLocation();
  const [hero, setHero] = useState<HeroResponse>();
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async (id: string) => {
    try {
      setLoading(true);
      const data = await getSingleHero(id);

      setHero(data);
    } catch {
      setHero(undefined);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const parse = locationPath.pathname.split('/');
    const id = parse[parse.length - 1];
    getData(id);
  }, [locationPath]);

  const handleCloseClick = () => {
    navigate(Paths.base + locationPath.search);
  };

  if (!hero) {
    return (
      <div className={isDarkMode ? style.wrapper : style.wrapper_light}>
        <button className={style.close_btn} onClick={handleCloseClick}>
          &times;
        </button>
        {loading && <div>Loading...</div>}
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
