import { Component } from 'react';
import style from './SearchPage.module.css';
import { SearchRequest } from 'shared/lib/api/SearchRequest';
import { HeroResponse } from 'shared/lib/api/types';
import { Loader } from 'shared/components/Loader/Loader';
import { Search } from 'widget/Search';
import { ErrorButton } from 'widget/ErrorButton/ui/ErrorButton';
import { LocaleStorage } from 'shared/utils/localeStorage/LocaleStorage';
import { List } from 'widget/List';

interface SearchPageProps {}
interface SearchPageState {
  search: string;
  heroes: Array<HeroResponse>;
  error: Error | null;
  loading: boolean;
}

class SearchPage extends Component<SearchPageProps, SearchPageState> {
  storage: LocaleStorage;
  constructor(props: SearchPageProps) {
    super(props);
    this.storage = new LocaleStorage();
    this.state = {
      search: '',
      heroes: [],
      error: null,
      loading: true,
    };
  }

  getData = async () => {
    this.setState({ loading: true, error: null });
    const { search } = this.state;

    try {
      const data = await SearchRequest.getData(search);
      if (data?.results) {
        this.setState({
          heroes: data?.results || [],
          loading: false,
        });
      }
      if (data?.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        this.setState({
          heroes: [],
          loading: false,
        });
      }
    }
  };

  componentDidMount(): void {
    this.setInitialState();
  }

  componentDidUpdate(_prevProps: Readonly<SearchPageProps>, prevState: Readonly<SearchPageState>): void {
    if (prevState.search !== this.state.search) {
      this.getData();
    }
  }

  setInitialState = () => {
    const value = this.storage.getLocaleStorage();
    if (value) {
      this.setState({ search: value, loading: true });
    } else {
      this.setState({ search: '', loading: true });
      this.getData();
    }
  };

  onSubmitSearch = (value: string) => {
    this.setState({ search: value });
  };

  onResetSearch = () => {
    this.setState({ search: '' });
  };

  render() {
    const { heroes, loading } = this.state;

    return (
      <div className={style.page}>
        <div className={style.controls_block}>
          <Search onSubmitSearch={this.onSubmitSearch} onResetSearch={this.onResetSearch} />
          <ErrorButton />
        </div>

        {loading ? (
          <Loader />
        ) : (
          <>
            {heroes.length > 0 && <List heroes={this.state.heroes} />}
            {heroes.length === 0 && <h2 className={style.title}>No results found</h2>}
          </>
        )}
      </div>
    );
  }
}

export { SearchPage };
