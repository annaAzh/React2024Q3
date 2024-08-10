import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Search } from './Search';
import { Provider } from 'react-redux';
import { store } from 'app/src/shared/lib/__mock__';
import { ThemeProvider } from 'app/src/_app/providers/themeProvider/Themecontext';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';

vi.mock('next/navigation', () => require('next-router-mock'));

describe('search component', () => {
  it('render search component without initial value', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Search />
        </ThemeProvider>
      </Provider>,
    );

    expect(screen.getByText(/search/i)).toBeInTheDocument();
  });

  it('render search component without initial value', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Search />
        </ThemeProvider>
      </Provider>,
    );
    const input = await screen.findByPlaceholderText(/search/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('onSubmit works', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Search />
        </ThemeProvider>
      </Provider>,
    );

    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, 'react');
    await userEvent.click(screen.getByText(/search/i));

    waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith({
        pathname: '/',
        query: { search: 'rick', page: 1 },
      });
    });
  });

  it('onReset works', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Search />
        </ThemeProvider>
      </Provider>,
    );

    const input = screen.getByPlaceholderText(/Search/i);
    await userEvent.type(input, 'react');
    await userEvent.click(screen.getByLabelText(/reset/i));
    expect(input).toHaveValue('');

    waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith({
        pathname: '/',
        query: { search: '', page: 1 },
      });
    });
  });
});
