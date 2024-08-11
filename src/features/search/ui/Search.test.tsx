import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Search } from './Search';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'app/providers/themeProvider/Themecontext';
import { store } from 'shared/lib/__mock__';
import { MemoryRouter } from 'react-router-dom';

describe('search component', () => {
  it('render search component without initial value', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider>
            <Search />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/search/i)).toBeInTheDocument();
  });
});
