import { FetchParams, SearchResponse } from './types';

class SearchRequest {
  private static baseUrl: string = 'https://rickandmortyapi.com/api/character';
  private static params: FetchParams = {
    method: 'GET',
  };

  static getData = async (searchValue?: string, page: number = 1): Promise<SearchResponse | undefined> => {
    const searchPath = searchValue ? `&name=${searchValue}` : '';
    const url = `${this.baseUrl}?page=${page}${searchPath}`;

    try {
      const res = await fetch(url, this.params);
      if (!res.ok) {
        throw new Error(`Request failed with status code ${res.status} ${res.statusText}`);
      } else {
        const data = (await res.json()) as SearchResponse;
        return data;
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unexpected error occured');
    }
  };
}

export { SearchRequest };
