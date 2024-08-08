import { render, screen, waitFor } from '@testing-library/react';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import { heroes, store } from 'shared/lib/__mock__';
import { ThemeProvider } from 'app/providers/themeProvider/Themecontext';
import Home, { getServerSideProps } from '../../../pages/heroes';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { BASE_URL } from 'shared/constants';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';

vi.mock('next/router', () => require('next-router-mock'));

describe('home page', () => {
  it('renders the search bar', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Home
            data={{ results: [], info: { pages: 0, count: 0, next: null, prev: null } }}
            currentHero={null}
            currentPage={1}
            initialSearch=""
          />
        </ThemeProvider>
      </Provider>,
    );

    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it('reneders list of heroes', () => {
    const heroesMock = heroes;

    <Provider store={store}>
      <ThemeProvider>
        <Home
          data={{ results: heroesMock, info: { pages: 10, count: 2, next: null, prev: null } }}
          currentHero={null}
          currentPage={1}
          initialSearch=""
        />
      </ThemeProvider>
    </Provider>;

    waitFor(() => {
      expect(screen.getByText(heroes[0].name)).toBeInTheDocument();
      expect(screen.getByText(heroes[1].name)).toBeInTheDocument();
    });
  });
});

export const heroesResponse = {
  results: heroes,
  info: { pages: 1 },
};

export const handlers = [
  http.get(`${BASE_URL}`, async () => {
    return HttpResponse.json(heroesResponse);
  }),
];
const server = setupServer(...handlers);

describe('server side props', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('', async () => {
    const context = {
      query: {
        page: '1',
        search: 'rick',
        id: '1',
      } as ParsedUrlQuery,
    };
    const result = getServerSideProps(context as GetServerSidePropsContext);

    waitFor(() => {
      expect(result).toEqual({
        props: {
          data: heroes[1],
          currentHero: heroes.find((hero) => hero.id === 1) || null,
          currentPage: 1,
          initialSearch: 'rick',
        },
      });
    });
  });

  it('then wrong page it redirect on /page=1&search=', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Home
            data={{ results: [], info: { pages: +'', count: 0, next: null, prev: null } }}
            currentHero={null}
            currentPage={1}
            initialSearch=""
          />
        </ThemeProvider>
      </Provider>,
    );

    const context = {
      query: {
        page: '',
        search: '',
        id: '1',
      } as ParsedUrlQuery,
    };
    const result = getServerSideProps(context as GetServerSidePropsContext);

    waitFor(() => {
      expect(result).toEqual({
        redirect: {
          destination: '/?page=1&search=',
          permanent: false,
        },
      });
    });
  });
});

describe('Home Component', () => {
  it('should navigate on search submit', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Home
            data={{ results: [], info: { pages: 0, count: 0, next: null, prev: null } }}
            currentHero={null}
            currentPage={1}
            initialSearch=""
          />
        </ThemeProvider>
      </Provider>,
    );

    const searchInput = screen.getByPlaceholderText(/search/i);
    const searchButton = screen.getByText(/search/i);

    await userEvent.type(searchInput, 'rick');
    await userEvent.click(searchButton);

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

  it('should navigate on reset search', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Home
            data={{ results: [], info: { pages: 0, count: 0, next: null, prev: null } }}
            currentHero={null}
            currentPage={1}
            initialSearch=""
          />
        </ThemeProvider>
      </Provider>,
    );

    const resetButton = screen.getByTestId(/reset/i);

    await userEvent.click(resetButton);

    waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith({
        pathname: '/',
        query: { search: '', page: 1 },
      });
    });
  });

  it('should navigate on page change', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Home
            data={{ results: heroes, info: { pages: 5, count: 2, next: null, prev: null } }}
            currentHero={null}
            currentPage={1}
            initialSearch=""
          />
        </ThemeProvider>
      </Provider>,
    );

    const paginationButton = screen.getByTestId(/next-arrow/i);

    await userEvent.click(paginationButton);

    waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith({
        pathname: '/',
        query: { search: '', page: 2 },
      });
    });
  });
});
