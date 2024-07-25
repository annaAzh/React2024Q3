import { render } from '@testing-library/react';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Hero } from './Hero';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { heroesApi } from 'shared/api';

const heroes = [
  {
    id: 1,
    name: 'Rick',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth' },
    location: { name: 'Mars' },
    image: 'string',
    episode: ['Episode 1', 'Episode 2'],
    url: 'string',
    created: '2021-01-01T00:00:00.000Z',
  },
  {
    id: 2,
    name: 'Morty',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth' },
    location: { name: 'Mars' },
    image: 'string',
    episode: ['Episode 1', 'Episode 2'],
    url: 'string',
    created: '2021-01-01T00:00:00.000Z',
  },
];

export const BASE_URL: string = 'https://rickandmortyapi.com/api/character';
export const BASE_URL_HERO: string = 'https://rickandmortyapi.com/api/character/1';

const handlers = [
  http.get(`${BASE_URL}`, async () => {
    return HttpResponse.json(heroes[0]);
  }),
  http.get(`${BASE_URL_HERO}`, async () => {
    return HttpResponse.json(heroes[0]);
  }),
];

const server = setupServer(...handlers);

describe('Component Hero', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('testing test', async () => {
    const store = configureStore({
      reducer: {
        [heroesApi.reducerPath]: heroesApi.reducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(heroesApi.middleware),
    });

    const { getByText, findByText, getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/heroes/1']}>
          <Hero />
        </MemoryRouter>
        ,
      </Provider>,
    );

    const loading = getByText(/loading.../i);
    expect(loading).toBeInTheDocument();
    const name = await findByText(heroes[0].name);
    expect(name).toBeInTheDocument();
    expect(loading).not.toBeInTheDocument();

    const closeBtn = getByTestId(/close/i);
    expect(closeBtn).toBeInTheDocument();

    await userEvent.click(closeBtn);
  });
});
