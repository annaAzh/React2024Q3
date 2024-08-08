import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import DefaultPage from '../../../pages';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'app/providers/themeProvider/Themecontext';
import { store } from 'shared/lib/__mock__';

const searchValue_test = 'test-localeStorage';

vi.mock('shared/utils/localeStorage/LocaleStorage', () => ({
  getLocaleStorage: () => searchValue_test,
}));

vi.mock('next/router', () => require('next-router-mock'));

describe('test default page', () => {
  it('it renders loader on default page', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <DefaultPage />
        </ThemeProvider>
      </Provider>,
    );
    const loader = screen.getByAltText(/loader/i);
    expect(loader).toBeInTheDocument();
  });
});
