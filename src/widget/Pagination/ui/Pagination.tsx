import { FC } from 'react';
import style from './Pagination.module.scss';
import arrow from 'assets/icons/arrow-left.svg';
import { getPaginationArray } from 'shared/utils/helpers';

type PaginationProps = {
  totalPage: number;
  currentPage: number;
  siblings: number;
  onChangePage: (page: number) => void;
};

const Pagination: FC<PaginationProps> = (props) => {
  const { currentPage, totalPage, siblings, onChangePage } = props;

  const arr = getPaginationArray(totalPage, currentPage, siblings);

  return (
    <div className={style.block}>
      <button
        className={style.arrow_left}
        disabled={currentPage === 1}
        onClick={() => onChangePage(currentPage > 1 ? currentPage - 1 : currentPage)}
      >
        <img className={style.arrow_img} src={arrow} />
      </button>

      {arr.map((el, i) => (
        <button
          key={i}
          className={
            el === '...' ? style.dots_item : currentPage === el ? `${style.item} ${style.active}` : `${style.item}`
          }
          onClick={() => {
            if (typeof el === 'number') {
              props.onChangePage(el);
            }
          }}
        >
          {el}
        </button>
      ))}

      <button
        className={style.arrow_right}
        disabled={currentPage === totalPage}
        onClick={() => onChangePage(currentPage < totalPage ? currentPage + 1 : currentPage)}
      >
        <img className={style.arrow_next_img} src={arrow} />
      </button>
    </div>
  );
};

export { Pagination };
