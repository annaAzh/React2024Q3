import { render, screen } from '@testing-library/react';
import { describe, expect, it, afterAll, beforeAll } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from './SearchPage';
import { Provider } from 'react-redux';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { store } from 'shared/lib/__mock__';

const mockResult = { info: { pages: 1 }, results: [] };

export const BASE_URL: string = 'https://rickandmortyapi.com/api/character';

const handlers = [
  http.get(`${BASE_URL}`, async () => {
    return HttpResponse.json(mockResult);
  }),
];

const server = setupServer(...handlers);

describe('', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('testing test', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchPage />
        </MemoryRouter>
      </Provider>,
    );

    const noResultsMessage = await screen.findByText(/No results found/i);
    expect(noResultsMessage).toBeInTheDocument();
  });
});
