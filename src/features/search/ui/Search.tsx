import { FC, useCallback, useEffect, useRef, useState } from 'react';
import style from './Search.module.scss';

interface SearchProps {
  onSubmitSearch: (value: string) => void;
  onResetSearch: () => void;
  initialValue: string | null;
}

const Search: FC<SearchProps> = (props) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const setInitialState = useCallback(() => {
    const { initialValue } = props;

    if (initialValue) {
      setSearchValue(initialValue);
    } else {
      setSearchValue('');
    }
  }, [props]);

  useEffect(() => {
    setInitialState();
  }, [setInitialState]);

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setSearchValue(value);
  };

  const handleSubmitSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmitSearch(searchValue);
  };

  const handleResetForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchValue('');
    inputRef.current?.focus();
    props.onResetSearch();
  };

  return (
    <form className={style.search_block} onSubmit={handleSubmitSearch} onReset={handleResetForm}>
      <label className={style.label}>
        <input
          ref={inputRef}
          type="text"
          placeholder="search..."
          value={searchValue}
          className={style.search_input}
          onChange={handleChangeSearchValue}
        ></input>
        <button
          type="reset"
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
