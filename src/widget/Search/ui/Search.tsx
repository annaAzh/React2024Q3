import { Component, createRef } from 'react';
import style from './Search.module.scss';
import { LocaleStorage } from 'shared/utils/localeStorage/LocaleStorage';

interface SearchProps {
  onSubmitSearch: (value: string) => void;
  onResetSearch: () => void;
}
interface SearchState {
  searchValue: string;
}

class Search extends Component<SearchProps, SearchState> {
  storage: LocaleStorage;
  constructor(props: SearchProps) {
    super(props);
    this.storage = new LocaleStorage();
    this.state = {
      searchValue: '',
    };
  }

  inputRef = createRef<HTMLInputElement>();

  componentDidMount(): void {
    this.setInitialState();
  }

  setInitialState = () => {
    const value = this.storage.getLocaleStorage();
    if (value) {
      this.setState({ searchValue: value });
    } else {
      this.setState({ searchValue: '' });
    }
  };

  handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    this.setState({ searchValue: value });
  };

  handleSubmitSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.storage.setLocaleStorage(this.state.searchValue);
    this.props.onSubmitSearch(this.state.searchValue);
  };

  handleResetForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.setState({ searchValue: '' }, () => {
      this.inputRef.current?.focus();
      this.props.onResetSearch();
      this.storage.setLocaleStorage(this.state.searchValue);
    });
  };

  render() {
    const { searchValue } = this.state;

    return (
      <form className={style.search_block} onSubmit={this.handleSubmitSearch} onReset={this.handleResetForm}>
        <label className={style.label}>
          <input
            ref={this.inputRef}
            type="text"
            placeholder="search..."
            value={searchValue}
            className={style.search_input}
            onChange={this.handleChangeSearchValue}
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
  }
}

export { Search };
