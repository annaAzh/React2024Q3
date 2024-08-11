import { FC } from 'react';
import { HeroResponse } from 'shared/types';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { addFavourite, getFavourites, removeFavourite } from 'features/controlFavoriteMovies';
import { useTheme } from 'app/providers/themeProvider/hook';
import { Link, useSearchParams } from '@remix-run/react';
import style from './List.module.scss';

interface ListProps {
  heroes: Array<HeroResponse>;
}

const List: FC<ListProps> = ({ heroes }) => {
  const { isDarkMode } = useTheme();
  const dispatch = useAppDispatch();
  const favourites = useSelector(getFavourites);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const page = searchParams.get('page') || '1';

  const query = new URLSearchParams({
    search,
    page,
  }).toString();

  return (
    <>
      <ul className={style.search_list}>
        {heroes.map((hero) => (
          <Link
            to={`${hero.id}?${query}`}
            data-testid={`card-${hero.id}`}
            key={hero.id}
            className={isDarkMode ? `${style.card} ${style.card_dark}` : style.card}
          >
            <div>
              <img src={hero.image} className={style.hero_img} alt={hero.name} />
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
          </Link>
        ))}
      </ul>
    </>
  );
};

export { List };
