import { Component } from 'react';
import style from './SearchPage.module.css';
import { LocaleStorage } from '../shared/utils/localeStorage/LocaleStorage';
import { SearchRequest } from '../shared/lib/api/SearchRequest';
import { HeroResponse } from '../shared/lib/api/types';

interface SearchPageProps {}
interface SearchPageState {
  searchValue: string;
  search: string;
  heroes: Array<HeroResponse> | [];
}

class SearchPage extends Component<SearchPageProps, SearchPageState> {
  storage: LocaleStorage;

  constructor(props: SearchPageProps) {
    super(props);
    this.storage = new LocaleStorage();
    this.state = {
      searchValue: '',
      search: '',
      heroes: [],
    };
  }

  getData = async () => {
    const { search } = this.state;
    const data = await SearchRequest.getData(search);
    if (data) {
      this.setState({
        heroes: data?.results,
      });
    }
  };

  componentDidMount(): void {
    this.setInitialState();
    this.getData();
  }

  componentDidUpdate(_prevProps: Readonly<SearchPageProps>, prevState: Readonly<SearchPageState>): void {
    if (prevState.search !== this.state.search) {
      this.getData();
    }
  }

  setInitialState = () => {
    const value = this.storage.getLocaleStorage();
    if (value) {
      this.setState({ searchValue: value, search: value });
    } else {
      this.setState({ searchValue: '', search: '' });
    }
  };

  handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    this.setState({ searchValue: value });
  };

  handleSubmitSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.storage.setLocaleStorage(this.state.searchValue);
    this.setState({ search: this.state.searchValue });
  };

  render() {
    const { heroes } = this.state;
    return (
      <>
        <form className={style.search_block} onSubmit={this.handleSubmitSearch}>
          <input
            type="text"
            value={this.state.searchValue}
            className={style.search_input}
            onChange={this.handleChangeSearchValue}
          ></input>
          <button className={style.search_button} type="submit">
            Search
          </button>
        </form>
        <div className={style.search_list}>
          {heroes.map((hero) => (
            <div key={hero.id} className={style.card}>
              <div>
                <img src={hero.image} className={style.hero_img} alt={hero.name} />
              </div>
              <h3 className={style.hero_desc}>{hero.name}</h3>
              <p className={style.hero_desc}>Location: {hero.location.name}</p>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export { SearchPage };
