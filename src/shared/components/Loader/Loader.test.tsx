import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Loader } from './Loader';
import createFetchMock from 'vitest-fetch-mock';
import { Provider } from 'react-redux';
import { store } from 'shared/lib/__mock__';
import { ThemeProvider } from 'app/providers/themeProvider/Themecontext';

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

describe('Component Loader', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('renders loader', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Loader />
        </ThemeProvider>
      </Provider>,
    );

    const loader = screen.getByAltText('loader');
    expect(loader).toBeInTheDocument();
  });
});
