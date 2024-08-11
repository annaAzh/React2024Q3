import { FC } from 'react';
import style from './Pagination.module.scss';
import arrow from 'assets/icons/arrow-left.svg';
import { getPaginationArray } from 'shared/utils/helpers';
import { Paths } from 'shared/types';
import { useNavigate } from '@remix-run/react';
import { useTheme } from 'app/providers/themeProvider/hook';

type PaginationProps = {
  totalPage: number;
  currentPage: number;
  siblings: number;
  searchValue?: string;
};

const Pagination: FC<PaginationProps> = (props) => {
  const { currentPage, totalPage, siblings, searchValue } = props;
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const arr = getPaginationArray(totalPage, currentPage, siblings);

  const onChangePage = (el?: number | string) => {
    const page = el || currentPage;

    const query = new URLSearchParams({ search: searchValue || '', page: page.toString() }).toString();
    navigate(`${Paths.hero}?${query}`);
  };

  return (
    <div className={style.block}>
      <button
        data-testid="prevArrow"
        className={isDarkMode ? `${style.arrow_left} ${style.arrow_left_dark}` : style.arrow_left}
        disabled={currentPage === 1}
        onClick={() => onChangePage(currentPage > 1 ? currentPage - 1 : currentPage)}
      >
        <img className={style.arrow_img} src={arrow} />
      </button>

      {arr.map((el, i) => (
        <button
          key={i}
          className={
            el === '...'
              ? isDarkMode
                ? `${style.dots_item} ${style.dots_item_dark}`
                : style.dots_item
              : currentPage === el
                ? isDarkMode
                  ? `${style.item} ${style.item_dark} ${style.active}`
                  : `${style.item} ${style.active}`
                : isDarkMode
                  ? `${style.item} ${style.item_dark}`
                  : style.item
          }
          onClick={() => {
            if (typeof el === 'number') {
              onChangePage(el);
            }
          }}
        >
          {el}
        </button>
      ))}

      <button
        className={isDarkMode ? `${style.arrow_right} ${style.arrow_right_dark}` : style.arrow_right}
        disabled={currentPage === totalPage}
        onClick={() => onChangePage(currentPage < totalPage ? currentPage + 1 : currentPage)}
      >
        <img className={style.arrow_next_img} src={arrow} />
      </button>
    </div>
  );
};

export { Pagination };
