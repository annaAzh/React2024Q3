import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import { Favourite } from './Favourite';
import userEvent from '@testing-library/user-event';
import { List } from 'widget/List';
import { BrowserRouter } from 'react-router-dom';
import style from './Favourite.module.scss';
import { ThemeContext } from 'app/providers/themeProvider/Themecontext';
import { heroes, store } from 'shared/lib/__mock__';

global.URL.createObjectURL = vi.fn(() => 'fake-url');
const mockContextValue = { isDarkMode: false, toggleTheme: vi.fn() };

describe('Favourite component', () => {
  it('renders Favourite component', async () => {
    const { getAllByRole } = render(
      <ThemeContext.Provider value={mockContextValue}>
        <Provider store={store}>
          <BrowserRouter>
            <List heroes={heroes} />
            <Favourite />
          </BrowserRouter>
        </Provider>
      </ThemeContext.Provider>,
    );

    const checkbox = getAllByRole('checkbox')[0];
    expect(checkbox).toBeInTheDocument();
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    waitFor(() => {
      const favourite_block = screen.getByTestId(/favourite_block/i);
      expect(favourite_block).toBeInTheDocument();
      expect(favourite_block).not.toHaveClass(style.favourite_block_dark);
      expect(favourite_block).toHaveClass(style.favourite_block);

      const download_button = screen.getByText(/Download/i);
      expect(download_button).toBeInTheDocument();

      const unselect_button = screen.getByText(/Unselect all/i);
      expect(unselect_button).toBeInTheDocument();
    });

    waitFor(() => {
      const unselect_button = screen.getByText(/Unselect all/i);
      expect(unselect_button).toBeInTheDocument();
      userEvent.click(unselect_button);
      expect(screen.getAllByText(/0 items are selected/i)).toBeInTheDocument();
      expect(checkbox).not.toBeChecked();
    });
  });
});
