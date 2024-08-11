import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ThemeProvider } from '../providers/themeProvider/Themecontext';
import Loading from '@/app/heroes/(overview)/loading';

describe('NotFound Component', () => {
  it('render not found page', async () => {
    const resolvedPage = Loading();
    render(<ThemeProvider>{resolvedPage}</ThemeProvider>);

    const loader = await screen.findByAltText(/loader/i);
    expect(loader).toBeInTheDocument();
  });
});
