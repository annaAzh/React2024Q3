import { render, waitFor } from '@testing-library/react';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { Hero } from './Hero';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { store } from 'shared/lib/__mock__';
import { ThemeContext, ThemeContextType, ThemeProvider } from 'app/providers/themeProvider/Themecontext';
import userEvent from '@testing-library/user-event';

import mockRouter from 'next-router-mock';

vi.mock('next/router', () => require('next-router-mock'));

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
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
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
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
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

  it('expect change routes on click close', async () => {
    const { findByTestId } = render(
      <Provider store={store}>
        <ThemeProvider>
          <Hero hero={heroes[0]} />
        </ThemeProvider>
      </Provider>,
    );

    const close_btn = await findByTestId(/close/i);
    expect(close_btn).toBeInTheDocument();

    await userEvent.click(close_btn);
    waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith({
        pathname: '/',
        query: { search: 'rick', page: 1 },
      });

      expect(mockRouter).toMatchObject({
        pathname: '/',
        query: { search: 'rick', page: 1 },
      });
    });
  });

  it('test dark mode for hero wrapper', async () => {
    const mockContextValue: ThemeContextType = { isDarkMode: true, toggleTheme: vi.fn() };
    const { findByTestId } = render(
      <ThemeContext.Provider value={mockContextValue}>
        <Hero hero={heroes[0]} />
      </ThemeContext.Provider>,
    );
    const wrapper = await findByTestId(/hero/i);
    expect(wrapper).toHaveClass(/wrapper_dark/i);
    expect(wrapper).toHaveClass(/wrapper/i);
  });

  it('test dark mode for hero wrapper', async () => {
    const mockContextValue: ThemeContextType = { isDarkMode: false, toggleTheme: vi.fn() };
    const { findByTestId, getByText } = render(
      <ThemeContext.Provider value={mockContextValue}>
        <Hero hero={heroes[0]} />
      </ThemeContext.Provider>,
    );
    const wrapper = await findByTestId(/hero/i);
    expect(wrapper).not.toHaveClass(/wrapper_dark/i);
    expect(wrapper).toHaveClass(/wrapper/i);
    expect(getByText(heroes[0].name)).toBeInTheDocument();
  });
});
