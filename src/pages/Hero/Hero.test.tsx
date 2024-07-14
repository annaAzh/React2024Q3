import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import createFetchMock from 'vitest-fetch-mock';
import userEvent from '@testing-library/user-event';
import { List } from 'widget/List';

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

const heroes = [
  {
    id: 1,
    name: 'Rick',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth' },
    location: { name: 'Mars' },
    image: 'string',
    episode: ['Episode 1', 'Episode 2'],
    url: 'string',
    created: '2021-01-01T00:00:00.000Z',
  },
  {
    id: 2,
    name: 'Morty',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth' },
    location: { name: 'Mars' },
    image: 'string',
    episode: ['Episode 1', 'Episode 2'],
    url: 'string',
    created: '2021-01-01T00:00:00.000Z',
  },
];

describe('Component Hero', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('testing clicking on a card opens a detailed card component', async () => {
    render(
      <MemoryRouter>
        <List heroes={heroes} />
      </MemoryRouter>,
    );

    heroes.forEach(async (hero) => {
      const cardElement = screen.getByText(hero.name);
      expect(cardElement).toBeInTheDocument();

      await userEvent.click(cardElement);
      const male = await screen.findByText(/male/i);
      expect(male).toBeInTheDocument();
    });
  });

  it('testing clicking on close button hides the component', async () => {
    render(
      <MemoryRouter>
        <List heroes={heroes} />
      </MemoryRouter>,
    );

    heroes.forEach(async (hero) => {
      const cardElement = screen.getByText(hero.name);
      expect(cardElement).toBeInTheDocument();

      await userEvent.click(cardElement);

      const male = await screen.findByText(/male/i);
      expect(male).toBeInTheDocument();

      const close = screen.getByTestId('close');
      await userEvent.click(close);
      expect(window.location.pathname).toBe('/');
    });
  });
});
