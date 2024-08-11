import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { getSingleHero, SearchRequest } from './searchRequest';
import { heroes } from '../lib/__mock__';
import { BASE_URL, BASE_URL_HERO } from 'shared/lib/__mock__/data';

export const heroesResponse = {
  results: heroes,
  info: { pages: 1 },
};

export const handlers = [
  http.get(`${BASE_URL}`, async () => {
    return HttpResponse.json(heroesResponse);
  }),

  http.get(`${BASE_URL_HERO}`, async () => {
    return HttpResponse.json(heroesResponse.results[0]);
  }),
];
const server = setupServer(...handlers);

describe('search requests functions', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('get heroes list', async () => {
    const request = await SearchRequest();

    expect(request?.results).toEqual(heroes);
    expect(request?.results).toBeDefined();
    expect(request?.results?.[0].name).toMatch(/rick/i);
    expect(request?.results?.[1].name).toMatch(/morty/i);
  });

  it('get single heroe list', async () => {
    const id = '1';
    const request = await getSingleHero(id);
    expect(request).toEqual(heroes[0]);
  });

  it('test url without name params', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch');
    await SearchRequest();
    expect(fetchSpy).toHaveBeenCalledWith(`${BASE_URL}?page=1`);
  });

  it('test url with name params', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch');
    await SearchRequest('rick');
    expect(fetchSpy).toHaveBeenCalledWith(`${BASE_URL}?page=1&name=rick`);
  });
});
