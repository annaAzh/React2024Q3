'use client';

import { FC, useRef, useState } from 'react';
import { useTheme } from '@/app/src/_app/providers/themeProvider/hook';
import { setLocaleStorage } from '@/app/src/shared/utils/localeStorage/LocaleStorage';
import style from './Search.module.scss';
import { useRouter } from 'next/navigation';
import { Paths } from '@/app/src/shared/types';

interface SearchProps {
  initialValue?: string | null;
}

const Search: FC<SearchProps> = () => {
  const { isDarkMode } = useTheme();

  const router = useRouter();

  const [searchValue, setSearchValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setSearchValue(value);
  };

  const handleSubmitSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocaleStorage(searchValue);
    const query = new URLSearchParams({ search: searchValue, page: '1' }).toString();
    router.push(`/${Paths.hero}?${query}`);
  };

  const handleResetForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchValue('');
    setLocaleStorage('');
    inputRef.current?.focus();
    const query = new URLSearchParams({ search: '', page: '1' }).toString();
    router.push(`/${Paths.hero}?${query}`);
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
          data-testid="reset"
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
