import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'shared/constants';
import { SearchResponse } from 'shared/lib/api/types';

export interface GetHeroesSearchParams {
  searchValue?: string;
  currentPage: number;
}

export const heroesApi = createApi({
  reducerPath: 'heroesApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getAllHeroes: builder.query<SearchResponse, GetHeroesSearchParams>({
      query: ({ searchValue = '', currentPage }) => `?page=${currentPage}${searchValue ? `&name=${searchValue}` : ''}`,
    }),
  }),
});

export const { useGetAllHeroesQuery } = heroesApi;
