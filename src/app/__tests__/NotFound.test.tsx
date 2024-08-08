import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Provider } from 'react-redux';
import { store } from 'shared/lib/__mock__';
import { ThemeProvider } from 'app/providers/themeProvider/Themecontext';
import Custom404 from '../../../pages/404';

describe('NotFound Component', () => {
  it('render not found page', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Custom404 />
        </ThemeProvider>
      </Provider>,
    );

    const noResultsMessage = await screen.findByText(/Not found page/i);
    expect(noResultsMessage).toBeInTheDocument();
  });
});
