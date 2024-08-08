import { FC } from 'react';
import { HeroResponse } from 'shared/types';
import style from './Hero.module.scss';
import Image from 'next/image';

type HeroCardProps = {
  hero: HeroResponse;
};

const HeroCard: FC<HeroCardProps> = ({ hero }) => {
  const { gender, species, status, location } = hero;
  const { name: locationName } = location;
  return (
    <>
      <div>
        <Image
          src={hero?.image}
          className={style.hero_img}
          alt={hero?.name}
          width={0}
          height={0}
          sizes="100vw"
          style={{ maxWidth: '300px', height: 'auto' }}
        />
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
