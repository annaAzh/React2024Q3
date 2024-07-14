import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useSearchParams } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { Pagination } from './Pagination';
import userEvent from '@testing-library/user-event';

const onChangePage = vi.fn();

describe('Pagination Component', () => {
  it('render pagination component', () => {
    render(
      <MemoryRouter>
        <Pagination totalPage={10} currentPage={1} siblings={1} onChangePage={onChangePage} />
      </MemoryRouter>,
    );

    const paginationItems = screen.getAllByRole('button');
    expect(paginationItems).toHaveLength(9);
  });

  it('updates URL query parameter when page changes', async () => {
    const TestComponent = () => {
      const [searchParams, setSearchParams] = useSearchParams();
      const currentPage = Number(searchParams.get('page') ?? 1);

      return (
        <>
          <Pagination
            totalPage={10}
            currentPage={currentPage}
            siblings={1}
            onChangePage={(page) => {
              setSearchParams({ page: page.toString() });
              onChangePage(page);
            }}
          />
          <div data-testid="current-page">{currentPage}</div>
        </>
      );
    };

    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <Routes>
          <Route path="/" element={<TestComponent />} />
        </Routes>
      </MemoryRouter>,
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
});
