'use client';

import { FC, SyntheticEvent } from 'react';
import style from './List.module.scss';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { HeroResponse, Paths } from '@/app/src/shared/types';
import { useTheme } from '@/app/src/_app/providers/themeProvider/hook';
import { addFavourite, getFavourites, removeFavourite } from '@/app/src/features/controlFavoriteMovies';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/app/src/shared/hooks/useAppDispatch/useAppDispatch';

interface ListProps {
  heroes: Array<HeroResponse>;
  params?: {
    search: string;
    page: string | number;
  };
}

const List: FC<ListProps> = ({ heroes, params }) => {
  const { isDarkMode } = useTheme();
  const dispatch = useAppDispatch();
  const favourites = useSelector(getFavourites);

  const router = useRouter();

  const page = params?.page.toString() || '1';
  const search = params?.search || '';

  const handleCardClick = (e: SyntheticEvent, id: number) => {
    e.stopPropagation();

    const query = new URLSearchParams({
      search,
      page,
      id: id.toString(),
    }).toString();
    router.push(`/${Paths.hero}?${query}`);
  };

  return (
    <>
      <ul className={style.search_list}>
        {heroes.map((hero) => (
          <li
            data-testid={`card-${hero.id}`}
            key={hero.id}
            className={isDarkMode ? `${style.card} ${style.card_dark}` : style.card}
            onClick={(e) => handleCardClick(e, hero.id)}
          >
            <div>
              <Image
                src={hero.image}
                className={style.hero_img}
                width={0}
                height={0}
                sizes="100vw"
                style={{ maxWidth: '300px', height: 'auto' }}
                alt={hero.name}
                priority
              />
            </div>
            <h3 data-testid="cardItem" className={style.hero_desc}>
              {hero.name}
            </h3>
            <p className={style.hero_desc}>Location: {hero.location.name}</p>
            <div className={style.checkbox_wrapper}>
              <input
                type="checkbox"
                className={style.checkbox}
                checked={favourites?.heroes?.some((item) => hero.id === item.id)}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onChange={() => {
                  const checked = favourites.heroes.some((item) => hero.id === item.id);
                  const item = {
                    id: hero.id,
                    name: hero.name,
                    status: hero.status,
                    species: hero.species,
                    gender: hero.gender,
                    location: { name: hero.location.name },
                    image: hero.image,
                  };
                  checked ? dispatch(removeFavourite(item)) : dispatch(addFavourite(item));
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export { List };
