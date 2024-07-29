import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { StoreProvider } from './storeProvider';
import { store } from '../config/store';

describe('StoreProvider component', () => {
  it('renders children correctly', () => {
    render(
      <Provider store={store}>
        <StoreProvider>
          <div data-testid="test-child">Test Child</div>
        </StoreProvider>
      </Provider>,
    );

    const childElement = screen.getByTestId('test-child');
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Test Child');
  });
});
