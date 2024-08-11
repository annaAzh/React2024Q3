import { expect, it } from 'vitest';
import { createRemixStub } from '@remix-run/testing';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'app/providers/themeProvider/Themecontext';
import MainPage, { loader } from 'app/routes/heroes';
import { json } from '@remix-run/node';
import { heroes, store } from 'shared/lib/__mock__';
import { SearchResponse } from 'shared/types';
import { Provider } from 'react-redux';

const mockResult: SearchResponse = {
  info: {
    count: 2,
    pages: 1,
    next: null,
    prev: null,
  },
  results: heroes,
};

it('testing Details server component', async () => {
  const search = '';
  const page = 1;

  const MockMainPage = createRemixStub([
    {
      path: `/`,
      Component: MainPage,
      loader(): Awaited<ReturnType<typeof loader>> {
        return json({ data: mockResult, search, page });
      },
    },
  ]);

  const { findByText } = render(
    <Provider store={store}>
      <ThemeProvider>
        <MockMainPage />
      </ThemeProvider>
    </Provider>,
  );

  const hero_one = await findByText(/Rick/i);
  expect(hero_one).toBeInTheDocument();

  const hero_second = await findByText(/Morty/i);
  expect(hero_second).toBeInTheDocument();
});
