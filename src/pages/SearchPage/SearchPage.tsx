import { FC, useEffect, useState } from 'react';
import style from './SearchPage.module.css';
import { SearchRequest } from 'shared/lib/api/SearchRequest';
import { HeroResponse } from 'shared/lib/api/types';
import { Loader } from 'shared/components/Loader/Loader';
import { List } from 'widget/List';
import { Pagination } from 'widget/Pagination';
import { Outlet, useSearchParams } from 'react-router-dom';
import { useSearchQuery } from 'features/search/hooks/useSearchQuery';
import { Search } from 'features/search';
import { ToggleButton } from 'shared/components';

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

  useEffect(() => {
    setSearchParams({ query: searchValue.toString(), page: currentPage.toString() });
  }, [searchValue, currentPage, setSearchParams]);

  const getData = async (search?: string, page?: number) => {
    setState((prevState) => ({ ...prevState, loading: true, error: null }));

    try {
      const data = await SearchRequest(search, page);

      const totalPages = data?.info?.pages;
      if (totalPages) {
        setState((prevState) => ({ ...prevState, totalPages }));
      }

      if (data?.results) {
        setState((prevState) => ({ ...prevState, heroes: data?.results || [], loading: false }));
      }
      if (data?.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        setState((prevState) => ({ ...prevState, heroes: [], loading: false }));
      }
    }
  };

  useEffect(() => {
    getData(searchValue.toString(), currentPage);
  }, [searchValue, currentPage]);

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

  const { heroes, loading } = state;

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

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={style.wrapper}>
            {heroes.length > 0 && (
              <>
                <List heroes={heroes} />
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
