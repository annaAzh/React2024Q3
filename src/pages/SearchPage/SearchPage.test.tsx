import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, Mock } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from './SearchPage';
import { SearchRequest } from 'shared/lib/api/SearchRequest';

vi.mock('shared/lib/api/SearchRequest', () => ({
  SearchRequest: vi.fn(),
}));

const mockSearchRequest = SearchRequest as Mock;

describe('SearchPage Component', () => {
  it('displays "No results found" when no heroes are found', async () => {
    mockSearchRequest.mockResolvedValue({
      info: { pages: 1 },
      results: [],
    });

    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>,
    );

    const noResultsMessage = await screen.findByText(/No results found/i);
    expect(noResultsMessage).toBeInTheDocument();
  });
});
