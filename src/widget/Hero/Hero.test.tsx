import { render } from '@testing-library/react';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { Hero } from './Hero';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { store } from 'shared/lib/__mock__';
import { ThemeProvider } from 'app/providers/themeProvider/Themecontext';

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

vi.mock('next/router', () => require('next-router-mock'));

describe('Component Hero', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('render hero card', async () => {
    const { findByText, getByTestId } = render(
      <Provider store={store}>
        <ThemeProvider>
          <Hero hero={heroes[0]} />
        </ThemeProvider>
      </Provider>,
    );

    const name = await findByText(heroes[0].name);
    expect(name).toBeInTheDocument();

    const closeBtn = getByTestId(/close/i);
    expect(closeBtn).toBeInTheDocument();
  });

  it('expect heroes are not at document', async () => {
    const { findByText } = render(
      <Provider store={store}>
        <ThemeProvider>
          <Hero hero={null} />
        </ThemeProvider>
      </Provider>,
    );

    const text = await findByText(/Hero not found/i);
    expect(text).toBeInTheDocument();
  });
});
