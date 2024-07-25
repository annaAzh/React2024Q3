import { FC, useEffect, useState } from 'react';
import style from './SearchPage.module.css';
import { Loader } from 'shared/components/Loader/Loader';
import { List } from 'widget/List';
import { Pagination } from 'widget/Pagination';
import { Outlet, useSearchParams } from 'react-router-dom';
import { useSearchQuery } from 'features/search/hooks/useSearchQuery';
import { Search } from 'features/search';
import { ToggleButton } from 'shared/components';
import { useGetAllHeroesQuery } from 'shared/api';
import { HeroResponse } from 'shared/types';
import { Favourite } from 'widget/Favourite';

interface SearchPageState {
  heroes: Array<HeroResponse>;
  error: Error | null;
  loading: boolean;
  totalPages: number | null;
}

const SearchPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialState: SearchPageState = {
    heroes: [],
    error: null,
    loading: true,
    totalPages: null,
  };

  const [state, setState] = useState<SearchPageState>(initialState);
  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('page') ?? 1));
  const [searchValue, setSearchValue] = useSearchQuery();
  const { data, isLoading, error } = useGetAllHeroesQuery({ searchValue, currentPage });

  useEffect(() => {
    setSearchParams({ query: searchValue.toString(), page: currentPage.toString() });
  }, [searchValue, currentPage, setSearchParams]);

  useEffect(() => {
    if (error && 'status' in error && error.status === 404) {
      setState({
        heroes: [],
        error: null,
        loading: isLoading,
        totalPages: null,
      });
      return;
    }
    if (data) {
      const totalPages = data?.info?.pages;
      setState({
        heroes: data.results || [],
        error: null,
        loading: isLoading,
        totalPages: totalPages || null,
      });
    }
  }, [data, isLoading, error]);

  const onSubmitSearch = (value: string) => {
    setSearchValue(value);
    setCurrentPage(1);
    setSearchParams({ query: value, page: '1' });
  };

  const onResetSearch = () => {
    setSearchValue('');
    setCurrentPage(1);
    setSearchParams({});
  };

  const { heroes } = state;

  const onChangePage = (page: number) => {
    setCurrentPage(page);
    setSearchParams({ query: searchValue.toString(), page: page.toString() });
  };

  return (
    <div>
      <div className={style.controls_block}>
        <Search onSubmitSearch={onSubmitSearch} onResetSearch={onResetSearch} initialValue={searchValue} />
        <ToggleButton />
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={style.wrapper}>
            {heroes.length > 0 && (
              <>
                <List heroes={heroes} />
                <Favourite />
              </>
            )}
            {heroes.length === 0 && <h2 className={style.title}>No results found</h2>}
            <Outlet />
          </div>
          <>
            {state.totalPages && heroes.length > 0 && (
              <Pagination
                totalPage={state.totalPages}
                currentPage={currentPage}
                siblings={1}
                onChangePage={onChangePage}
              />
            )}
          </>
        </>
      )}
    </div>
  );
};

export { SearchPage };
