import { FC } from 'react';
import { HeroResponse } from 'shared/types';
import style from './Hero.module.scss';

type HeroCardProps = {
  hero: HeroResponse;
};

const HeroCard: FC<HeroCardProps> = ({ hero }) => {
  const { gender, species, status, location } = hero;
  const { name: locationName } = location;
  return (
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
  );
};

export default HeroCard;
