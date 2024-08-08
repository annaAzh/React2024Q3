import { FC, SyntheticEvent } from 'react';
import style from './List.module.scss';
import { HeroResponse } from 'shared/types';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { addFavourite, removeFavourite } from 'features/controlFavoriteMovies/slices/favoriteSlice';
import { useSelector } from 'react-redux';
import { getFavourites } from 'features/controlFavoriteMovies';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useTheme } from 'app/providers/themeProvider/hook';

interface ListProps {
  heroes: Array<HeroResponse>;
}

const List: FC<ListProps> = ({ heroes }) => {
  const { isDarkMode } = useTheme();
  const dispatch = useAppDispatch();
  const favourites = useSelector(getFavourites);

  const router = useRouter();

  const handleCardClick = (e: SyntheticEvent, id: number) => {
    e.stopPropagation();

    const { search, page } = router.query;
    router.push({
      pathname: router.pathname,
      query: { search, page, id },
    });
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
