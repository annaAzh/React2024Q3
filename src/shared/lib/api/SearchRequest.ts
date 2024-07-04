import { FetchParams, SearchResponse } from './types';

class SearchRequest {
  private static baseUrl: string = 'https://rickandmortyapi.com/api/character';
  private static params: FetchParams = {
    method: 'GET',
  };

  static getData = async (searchValue?: string, page: number = 1): Promise<SearchResponse | undefined> => {
    const searchPath = searchValue ? `&name=${searchValue}` : '';
    const url = `${this.baseUrl}?page=${page}${searchPath}`;
    const res = await fetch(url, this.params);
    const data = (await res.json()) as SearchResponse;
    return data;
  };
}

export { SearchRequest };
