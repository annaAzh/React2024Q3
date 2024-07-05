import { Component } from 'react';
import style from './List.module.css';
import { HeroResponse } from 'shared/lib/api/types';

interface ListProps {
  heroes: Array<HeroResponse>;
}
interface ListState {}

class List extends Component<ListProps, ListState> {
  constructor(props: ListProps) {
    super(props);
  }

  render() {
    const { heroes } = this.props;

    return (
      <>
        <div className={style.search_list}>
          {heroes.map((hero) => (
            <div key={hero.id} className={style.card}>
              <div>
                <img src={hero.image} className={style.hero_img} alt={hero.name} />
              </div>
              <h3 className={style.hero_desc}>{hero.name}</h3>
              <p className={style.hero_desc}>Location: {hero.location.name}</p>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export { List };
