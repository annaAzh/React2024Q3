import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import { store } from 'shared/lib/__mock__';
import { ThemeProvider } from 'app/providers/themeProvider/Themecontext';
import ErrorPage from '../../../pages/_error';

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

describe('NotFound Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('render not found page', async () => {
    const statusCode = 500;
    render(
      <Provider store={store}>
        <ThemeProvider>
          <ErrorPage statusCode={statusCode} />
        </ThemeProvider>
      </Provider>,
    );

    expect(screen.getByText(/Somethig wrong is going/i)).toBeInTheDocument();
    waitFor(() => {
      expect(screen.getByText(`An error ${statusCode} occurred on server`)).toBeInTheDocument();
    });
  });
});
