import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { App } from './App';
import { Provider } from 'react-redux';
import { heroesApi } from 'shared/api';
import { configureStore } from '@reduxjs/toolkit';

it('not render learn react link', () => {
  const store = configureStore({
    reducer: {
      [heroesApi.reducerPath]: heroesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(heroesApi.middleware),
  });

  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  const element = screen.queryByText('learn react');
  expect(element).not.toBeInTheDocument();
});
