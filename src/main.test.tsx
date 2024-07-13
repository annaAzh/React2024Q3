import { render, screen } from '@testing-library/react';
import { App } from 'app/App';
import React from 'react';
import { ErrorBoundary } from 'shared/utils/errorBoundary';
import { describe, expect, it, vi } from 'vitest';

vi.mock('app/App', () => ({
  App: () => <div id="app">App Component</div>,
}));

describe('Main Entry Point', () => {
  it('renders the App component without crashing', () => {
    render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>,
    );

    expect(screen.getByText(/app/i)).toBeInTheDocument();
  });

  it('renders the ErrorBoundary fallback UI when an error is thrown', () => {
    const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});

    const ErrorComponent = () => {
      throw new Error('Test Error');
    };

    render(
      <React.StrictMode>
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>
      </React.StrictMode>,
    );

    expect(screen.getByText(/Test Error/i)).toBeInTheDocument();

    consoleErrorMock.mockRestore();
  });
});
