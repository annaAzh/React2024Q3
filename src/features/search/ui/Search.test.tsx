import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Search } from './Search';
import { Provider } from 'react-redux';
import { store } from 'shared/lib/__mock__';
import { ThemeProvider } from 'app/providers/themeProvider/Themecontext';

const onSubmitSearch = vi.fn();
const onResetSearch = vi.fn();
const initialValue = 'Super component';

vi.mock('next/router', () => require('next-router-mock'));

describe('search component', () => {
  it('render search component without initial value', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Search initialValue={''} onResetSearch={onResetSearch} onSubmitSearch={onSubmitSearch} />
        </ThemeProvider>
      </Provider>,
    );

    expect(screen.getByText(/search/i)).toBeInTheDocument();
  });

  it('render search component with initial value', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Search initialValue={initialValue} onResetSearch={onResetSearch} onSubmitSearch={onSubmitSearch} />
        </ThemeProvider>
      </Provider>,
    );
    expect(screen.getByDisplayValue(/super/i)).toBeInTheDocument();
  });

  it('render search component without initial value', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Search initialValue={''} onResetSearch={onResetSearch} onSubmitSearch={onSubmitSearch} />
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
          <Search initialValue={''} onResetSearch={onResetSearch} onSubmitSearch={onSubmitSearch} />
        </ThemeProvider>
      </Provider>,
    );

    const input = screen.getByPlaceholderText(/Search/i);
    await userEvent.type(input, 'react');
    await userEvent.click(screen.getByText(/search/i));

    expect(onSubmitSearch).toHaveBeenCalledTimes(1);
    expect(onSubmitSearch).toHaveBeenCalledWith('react');
  });

  it('onReset works', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Search initialValue={''} onResetSearch={onResetSearch} onSubmitSearch={onSubmitSearch} />
        </ThemeProvider>
      </Provider>,
    );

    const input = screen.getByPlaceholderText(/Search/i);
    await userEvent.type(input, 'react');
    await userEvent.click(screen.getByLabelText(/reset/i));

    expect(onResetSearch).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('');
  });
});
