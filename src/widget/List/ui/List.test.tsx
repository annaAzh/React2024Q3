import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { List } from './List';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import createFetchMock from 'vitest-fetch-mock';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { heroes, store } from 'shared/lib/__mock__';

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

describe('Component List', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('List renders 2 cards', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <List heroes={heroes} />
        </MemoryRouter>
      </Provider>,
    );

    const listElement = screen.getByRole('list');
    expect(listElement).toBeInTheDocument();
  });

  it('card renders the relevant card data', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <List heroes={heroes} />
        </MemoryRouter>
      </Provider>,
    );

    heroes.forEach((hero) => {
      const cardElement = screen.getByText(hero.name);
      expect(cardElement).toBeInTheDocument();
    });
  });

  it('click on card ', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <List heroes={heroes} />
        </BrowserRouter>
      </Provider>,
    );

    const card = getByTestId(/card-1/i);
    expect(card).toBeInTheDocument();
    await userEvent.click(card);
    expect(location.pathname).toBe('/heroes/1');
  });

  it('checked on change checkbox', async () => {
    const { getAllByRole } = render(
      <Provider store={store}>
        <BrowserRouter>
          <List heroes={heroes} />
        </BrowserRouter>
      </Provider>,
    );

    const checkbox = getAllByRole('checkbox')[0];
    expect(checkbox).toBeInTheDocument();
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
