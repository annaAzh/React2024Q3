import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NotFound from '@/app/heroes/(overview)/not-found';
import { ThemeProvider } from '../providers/themeProvider/Themecontext';

describe('NotFound Component', () => {
  it('render not found page', async () => {
    const resolvedPage = NotFound();
    render(<ThemeProvider>{resolvedPage}</ThemeProvider>);

    const noResultsMessage = await screen.findByText(/Not found page/i);
    expect(noResultsMessage).toBeInTheDocument();
  });
});
