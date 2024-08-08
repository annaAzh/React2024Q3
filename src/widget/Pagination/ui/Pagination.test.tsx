import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Pagination } from './Pagination';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from 'shared/lib/__mock__';
import { ThemeProvider } from 'app/providers/themeProvider/Themecontext';
import { useState } from 'react';

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    query: {},
  }),
}));

const onChangePage = vi.fn();

describe('Pagination Component', () => {
  it('render pagination component', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Pagination totalPage={10} currentPage={1} siblings={1} onChangePage={onChangePage} />
        </ThemeProvider>
      </Provider>,
    );

    const paginationItems = screen.getAllByRole('button');
    expect(paginationItems).toHaveLength(9);
  });

  it('updates URL query parameter when page changes', async () => {
    const TestComponent = () => {
      const [currentPage, setCurrentPage] = useState(1);

      return (
        <>
          <Pagination
            totalPage={10}
            currentPage={currentPage}
            siblings={1}
            onChangePage={(page) => {
              onChangePage(page);
              setCurrentPage(page);
            }}
          />
          <div data-testid="current-page">{currentPage}</div>
        </>
      );
    };

    render(
      <Provider store={store}>
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      </Provider>,
    );

    expect(screen.getByTestId('current-page').textContent).toBe('1');

    const nextPageButtons = screen.getAllByRole('button', { name: /2/i });
    await userEvent.click(nextPageButtons[0]);
    expect(screen.getByTestId('current-page').textContent).toBe('2');
    expect(onChangePage).toHaveBeenCalledWith(2);

    const nextNextPageButtons = screen.getAllByRole('button', { name: /3/i });
    await userEvent.click(nextNextPageButtons[0]);
    expect(screen.getByTestId('current-page').textContent).toBe('3');
    expect(onChangePage).toHaveBeenCalledWith(3);

    const previousPageButtons = screen.getAllByRole('button', { name: /1/i });
    await userEvent.click(previousPageButtons[0]);
    expect(screen.getByTestId('current-page').textContent).toBe('1');
    expect(onChangePage).toHaveBeenCalledWith(1);
  });

  it('handle prev click button', () => {
    const TestComponent = () => {
      const [currentPage, setCurrentPage] = useState(5);

      return (
        <>
          <Pagination
            totalPage={10}
            currentPage={currentPage}
            siblings={1}
            onChangePage={(page) => {
              onChangePage(page);
              setCurrentPage(page);
            }}
          />
          <div data-testid="current-page">{currentPage}</div>
        </>
      );
    };

    render(
      <Provider store={store}>
        <ThemeProvider>
          <TestComponent />
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
});
