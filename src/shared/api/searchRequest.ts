import { BASE_URL } from '../constants';
import { HeroResponse, SearchResponse } from '../types';

const SearchRequest = async (searchValue?: string, page: number = 1): Promise<SearchResponse | undefined> => {
  const searchPath = searchValue ? `&name=${searchValue}` : '';
  const url = `${BASE_URL}?page=${page}${searchPath}`;
  const res = await fetch(url);
  const data = (await res.json()) as SearchResponse;
  return data;
};

const getSingleHero = async (id: string): Promise<HeroResponse | undefined> => {
  const url = `${BASE_URL}/${id}`;
  const res = await fetch(url);
  const data = (await res.json()) as HeroResponse;
  return data;
};

export { SearchRequest, getSingleHero };
