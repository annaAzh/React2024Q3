import { FC, useEffect, useRef, useState } from 'react';
import style from './Search.module.scss';

import { getLocaleStorage, setLocaleStorage } from 'shared/utils/localeStorage/LocaleStorage';
import { Paths } from 'shared/types';
import { useNavigate } from '@remix-run/react';
import { useTheme } from 'app/providers/themeProvider/hook';

interface SearchProps {
  initialValue?: string | null;
}

const Search: FC<SearchProps> = () => {
  const { isDarkMode } = useTheme();
  const [searchValue, setSearchValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedValue = getLocaleStorage() || '';
    if (storedValue) setSearchValue(storedValue);
  }, []);

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setSearchValue(value);
  };

  const handleSubmitSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocaleStorage(searchValue);
    const query = new URLSearchParams({ search: searchValue, page: '1' }).toString();

    navigate(`/heroes?${query}`);
  };

  const handleResetForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchValue('');
    setLocaleStorage('');
    inputRef.current?.focus();
    const query = new URLSearchParams({ search: '', page: '1' }).toString();
    navigate(`/${Paths.hero}?${query}`);
  };

  return (
    <form className={style.search_block} onSubmit={handleSubmitSearch} onReset={handleResetForm}>
      <label className={style.label}>
        <input
          ref={inputRef}
          type="text"
          placeholder="search..."
          value={searchValue}
          className={isDarkMode ? `${style.search_input} ${style.search_input_dark}` : style.search_input}
          onChange={handleChangeSearchValue}
        ></input>
        <button
          type="reset"
          aria-label="reset"
          className={searchValue ? `${style.clear_btn} ${style.clear_btn_visible}` : `${style.clear_btn}`}
        >
          &times;
        </button>
      </label>

      <button className={style.search_button} type="submit">
        Search
      </button>
    </form>
  );
};

export { Search };
