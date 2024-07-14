import { useLoaderData, useLocation, useNavigate, useNavigation } from 'react-router-dom';
import { HeroResponse } from 'shared/lib/api/types';
import { Paths } from 'shared/types';
import style from './Hero.module.scss';

const Hero = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const locationPath = useLocation();
  const hero = useLoaderData() as HeroResponse | undefined;

  const handleCloseClick = () => {
    navigate(Paths.base + locationPath.search);
  };

  if (!hero) {
    return (
      <div className={style.wrapper}>
        <button className={style.close_btn} onClick={handleCloseClick}>
          &times;
        </button>
        <h2>Hero not found</h2>
      </div>
    );
  }

  const { gender, species, status, location } = hero;
  const { name: locationName } = location;

  if (navigation.state === 'loading') {
    return (
      <div className={style.wrapper}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div className={style.overlay} onClick={handleCloseClick} />
      <div className={style.wrapper} data-testid="hero">
        <button data-testid="close" className={style.close_btn} onClick={handleCloseClick}>
          &times;
        </button>
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
      </div>
    </>
  );
};

export { Hero };
