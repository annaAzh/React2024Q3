import { FC, SyntheticEvent } from 'react';
import style from './List.module.scss';
import { HeroResponse } from 'shared/lib/api/types';
import { useLocation, useNavigate } from 'react-router-dom';
import { Paths } from 'shared/types';

interface ListProps {
  heroes: Array<HeroResponse>;
}

const List: FC<ListProps> = ({ heroes }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCardClick = (e: SyntheticEvent, id: number) => {
    e.stopPropagation();
    navigate(`${Paths.hero}${id}${location.search}`);
  };

  return (
    <>
      <ul className={style.search_list}>
        {heroes.map((hero) => (
          <li
            data-testid={`card-${hero.id}`}
            key={hero.id}
            className={style.card}
            onClick={(e) => handleCardClick(e, hero.id)}
          >
            <div>
              <img src={hero.image} className={style.hero_img} alt={hero.name} />
            </div>
            <h3 className={style.hero_desc}>{hero.name}</h3>
            <p className={style.hero_desc}>Location: {hero.location.name}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export { List };
