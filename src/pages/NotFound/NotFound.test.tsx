import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NotFound } from './NotFound';
import { MemoryRouter } from 'react-router-dom';

describe('NotFound Component', () => {
  it('render not found page', async () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const noResultsMessage = await screen.findByText(/Not found page/i);
    expect(noResultsMessage).toBeInTheDocument();
  });
});
