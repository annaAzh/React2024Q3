import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Loader } from './Loader';
import createFetchMock from 'vitest-fetch-mock';
import { SearchResponse } from 'shared/lib/api/types';
import { SearchPage } from 'pages';

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

describe('Component Loader', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('renders loader', () => {
    render(
      <MemoryRouter>
        <Loader />
      </MemoryRouter>,
    );

    const loader = screen.getByAltText('loader');
    expect(loader).toBeInTheDocument();
  });

  it('loading indicator is displayed while fetching data', async () => {
    const mockResponse: SearchResponse = {
      results: [
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
      ],
      info: { count: 1, next: null, prev: null, pages: 1 },
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<SearchPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByAltText(/loader/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/loader/i)).not.toBeInTheDocument();
      expect(screen.getByText(/rick/i)).toBeInTheDocument();
    });
  });
});
