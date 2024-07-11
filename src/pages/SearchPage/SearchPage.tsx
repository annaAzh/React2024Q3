import { FC, useEffect, useState } from 'react';
import style from './SearchPage.module.css';
import { SearchRequest } from 'shared/lib/api/SearchRequest';
import { HeroResponse } from 'shared/lib/api/types';
import { Loader } from 'shared/components/Loader/Loader';
import { Search } from 'widget/Search';
import { getLocaleStorage } from 'shared/utils/localeStorage/LocaleStorage';
import { List } from 'widget/List';
import { Pagination } from 'widget/Pagination';
import { Outlet } from 'react-router-dom';

interface SearchPageState {
  search: string;
  heroes: Array<HeroResponse>;
  error: Error | null;
  loading: boolean;
  totalPages: number | null;
}

const SearchPage: FC = () => {
  const initialState: SearchPageState = {
    search: getLocaleStorage() ?? '',
    heroes: [],
    error: null,
    loading: true,
    totalPages: null,
  };

  const [state, setState] = useState<SearchPageState>(initialState);

  const getData = async (search?: string) => {
    setState((prevState) => ({ ...prevState, loading: true, error: null }));

    try {
      const data = await SearchRequest(search);

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
    getData(state.search);
  }, [state.search]);

  const onSubmitSearch = (value: string) => {
    setState((prevState) => ({ ...prevState, search: value }));
  };

  const onResetSearch = () => {
    setState((prevState) => ({ ...prevState, search: '' }));
  };

  const { heroes, loading } = state;

  return (
    <div>
      <div className={style.controls_block}>
        <Search onSubmitSearch={onSubmitSearch} onResetSearch={onResetSearch} />
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
          <>{state.totalPages && <Pagination count={state.totalPages} />}</>
        </>
      )}
    </div>
  );
};

export { SearchPage };
