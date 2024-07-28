import { FavouriteHero } from 'features/controlFavoriteMovies/types/favoriteTypes';

export const hero: FavouriteHero = {
  id: 5,
  name: 'Rick',
  status: 'alive',
  species: 'Human',
  gender: 'male',
  location: { name: 'some location' },
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
};

export const second_hero: FavouriteHero = {
  id: 6,
  name: 'Rick6',
  status: 'alive',
  species: 'Human',
  gender: 'male',
  location: { name: 'some location' },
  image: 'https://rickandmortyapi.com/api/character/avatar/6.jpeg',
};

export const heroes = [
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
