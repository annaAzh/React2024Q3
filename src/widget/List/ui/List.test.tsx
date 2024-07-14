import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { List } from './List';
import { MemoryRouter } from 'react-router-dom';
import createFetchMock from 'vitest-fetch-mock';

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

describe('Component List', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('List renders 2 cards', () => {
    render(
      <MemoryRouter>
        <List heroes={heroes} />
      </MemoryRouter>,
    );

    const listElement = screen.getByRole('list');
    expect(listElement).toBeInTheDocument();
  });

  it('card renders the relevant card data', () => {
    render(
      <MemoryRouter>
        <List heroes={heroes} />
      </MemoryRouter>,
    );

    heroes.forEach((hero) => {
      const cardElement = screen.getByText(hero.name);
      expect(cardElement).toBeInTheDocument();
    });
  });
});
