import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { Pagination } from './Pagination';
import userEvent from '@testing-library/user-event';
import { ThemeContext, ThemeContextType, ThemeProvider } from 'app/providers/themeProvider/Themecontext';
import { Provider } from 'react-redux';
import { store } from 'shared/lib/__mock__';
import style from './Pagination.module.scss';

const onChangePage = vi.fn();

describe('Pagination Component', () => {
  it('render pagination component', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Pagination totalPage={10} currentPage={1} siblings={1} />
        </MemoryRouter>
      </ThemeProvider>,
    );

    const paginationItems = screen.getAllByRole('button');
    expect(paginationItems).toHaveLength(9);
  });

  it('updates URL query parameter when page changes', async () => {
    const TestComponent = () => {
      const currentPage = 1;

      return (
        <>
          <Pagination totalPage={10} currentPage={currentPage} siblings={1} />
          <div data-testid="current-page">{currentPage}</div>
        </>
      );
    };

    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter>
            <TestComponent />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>,
    );

    expect(screen.getByTestId('current-page').textContent).toBe('1');

    const nextPageButtons = screen.getAllByRole('button', { name: /2/i });
    await userEvent.click(nextPageButtons[0]);
    waitFor(() => {
      expect(screen.getByTestId('current-page').textContent).toBe('2');
      expect(onChangePage).toHaveBeenCalledWith(2);
    });

    const nextNextPageButtons = screen.getAllByRole('button', { name: /3/i });
    await userEvent.click(nextNextPageButtons[0]);
    waitFor(() => {
      expect(screen.getByTestId('current-page').textContent).toBe('3');
      expect(onChangePage).toHaveBeenCalledWith(3);
    });

    const previousPageButtons = screen.getAllByRole('button', { name: /1/i });
    await userEvent.click(previousPageButtons[0]);
    waitFor(() => {
      expect(screen.getByTestId('current-page').textContent).toBe('1');
      expect(onChangePage).toHaveBeenCalledWith(1);
    });
  });

  it('handle prev click button', () => {
    const TestComponent = () => {
      const currentPage = 5;

      return (
        <>
          <Pagination totalPage={10} currentPage={currentPage} siblings={1} />
          <div data-testid="current-page">{currentPage}</div>
        </>
      );
    };

    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter>
            <TestComponent />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>,
    );

    const prevArrow = screen.getByTestId(/prevArrow/i);
    expect(prevArrow).toBeInTheDocument();
    userEvent.click(prevArrow);
    waitFor(() => {
      expect(onChangePage).toHaveBeenCalledWith(4);
      expect(screen.getByTestId('current-page').textContent).toBe('4');

      const activeBtn = screen.getByRole('button', { name: /4/i });
      expect(activeBtn).toHaveClass(/active/i);
    });
  });

  it('renders dots component with light mode styles when isDarkMode is false', () => {
    const mockContextValue: ThemeContextType = { isDarkMode: false, toggleTheme: vi.fn() };
    render(
      <ThemeContext.Provider value={mockContextValue}>
        <MemoryRouter>
          <Pagination totalPage={10} currentPage={6} siblings={1} />
        </MemoryRouter>
      </ThemeContext.Provider>,
    );
    const button = screen.getAllByText('...');
    expect(button[0]).toBeInTheDocument();
    expect(button[0]).not.toHaveClass(style.dots_item_dark);
  });

  it(' test disable button if current page  === total pages ', () => {
    const mockContextValue: ThemeContextType = { isDarkMode: false, toggleTheme: vi.fn() };
    render(
      <ThemeContext.Provider value={mockContextValue}>
        <MemoryRouter>
          <Pagination totalPage={1} currentPage={1} siblings={1} />
        </MemoryRouter>
      </ThemeContext.Provider>,
    );
    const button = screen.getByText(/1/i);
    expect(button).toBeInTheDocument();
    waitFor(() => {
      expect(button).toBeDisabled();
    });
  });

  it('handle click on pagination button', () => {
    const TestComponent = () => {
      const currentPage = 5;

      return (
        <>
          <Pagination totalPage={10} currentPage={currentPage} siblings={1} />
          <div data-testid="current-page">{currentPage}</div>
        </>
      );
    };

    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter>
            <TestComponent />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>,
    );

    const six_btn = screen.getByText(/6/i);
    expect(six_btn).toBeInTheDocument();
    userEvent.click(six_btn);
    waitFor(() => {
      expect(onChangePage).toHaveBeenCalledWith(6);
      expect(screen.getByTestId('current-page').textContent).toBe('6');

      const activeBtn = screen.getByRole('button', { name: /6/i });
      expect(activeBtn).toHaveClass(/active/i);
    });
  });
});
