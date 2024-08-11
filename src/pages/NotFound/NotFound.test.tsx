import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NotFound } from './NotFound';

describe('NotFound Component', () => {
  it('render not found page', async () => {
    render(<NotFound />);

    const noResultsMessage = await screen.findByText(/Not found page/i);
    expect(noResultsMessage).toBeInTheDocument();
  });
});
