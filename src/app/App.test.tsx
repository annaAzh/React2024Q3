import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from 'shared/lib/__mock__';

it('not render learn react link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  const element = screen.queryByText('learn react');
  expect(element).not.toBeInTheDocument();
});
