import { FC, useState } from 'react';
import style from './Pagination.module.scss';
import arrow from '../../../assets/icons/arrow-left.svg';

type PaginationProps = {
  count: number;
};

const Pagination: FC<PaginationProps> = (props) => {
  const [current, setCurrent] = useState<number>(1);

  const handleArrowPrewClick = () => {
    setCurrent((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleArrowNextClick = () => {
    setCurrent((prev) => (prev < props.count ? prev + 1 : prev));
  };

  return (
    <div className={style.block}>
      <button className={style.arrow_left} disabled={current === 1} onClick={handleArrowPrewClick}>
        <img className={style.arrow_img} src={arrow} />
      </button>
      {Array.from({ length: props.count }).map((_, i) =>
        i < 5 || i === props.count - 1 ? (
          <button
            key={i + 1}
            className={current === i + 1 ? `${style.item} ${style.active}` : `${style.item}`}
            onClick={() => setCurrent(i + 1)}
          >
            {i + 1}
          </button>
        ) : null,
      )}
      <button className={style.arrow_right} disabled={current === props.count} onClick={handleArrowNextClick}>
        <img className={style.arrow_next_img} src={arrow} />
      </button>
    </div>
  );
};

export { Pagination };
