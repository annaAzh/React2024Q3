import { FetchParams, SearchResponse } from './types';

const BASE_URL: string = 'https://rickandmortyapi.com/api/character';
const params: FetchParams = {
  method: 'GET',
};

const SearchRequest = async (searchValue?: string, page: number = 1): Promise<SearchResponse | undefined> => {
  const searchPath = searchValue ? `&name=${searchValue}` : '';
  const url = `${BASE_URL}?page=${page}${searchPath}`;
  const res = await fetch(url, params);
  const data = (await res.json()) as SearchResponse;
  return data;
};

export { SearchRequest };
