import { render, screen, waitFor } from '@testing-library/react';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import Page from '../../../heroes/(overview)/page';
import { ThemeProvider } from '../providers/themeProvider/Themecontext';
import { store } from '../../shared/lib/__mock__';
import { BASE_URL } from '../../shared/constants';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { notFound } from 'next/navigation';

vi.mock('next/navigation', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next/navigation')>();
  return {
    ...actual,
    useRouter: () => require('next-router-mock'),
    redirect: vi.fn(),
    notFound: vi.fn(),
  };
});

export const heroesResponse = {
  results: undefined,
  info: { pages: 1 },
};

export const handlers = [
  http.get(`${BASE_URL}`, async () => {
    return HttpResponse.json(heroesResponse);
  }),
];
const server = setupServer(...handlers);

describe('home page', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('redirect on notFound page', async () => {
    const searchParams = { search: '', page: '1' };

    const resolvedPage = await Page({ searchParams });

    render(
      <Provider store={store}>
        <ThemeProvider>{resolvedPage}</ThemeProvider>
      </Provider>,
    );

    waitFor(() => {
      expect(vi.mocked(notFound)).toHaveBeenCalled();
      expect(screen.getByText(/Not Found Page/i)).toBeInTheDocument();
      expect(screen.getByText(/Rick/)).not.toBeInTheDocument();
      expect(screen.getByText('No results found')).not.toBeInTheDocument();
    });
  });
});
