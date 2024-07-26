import { it, describe, expect } from 'vitest';
import { FavouriteHero, FavouriteShema } from '../types/favoriteTypes';
import { addFavourite, removeFavourite, clearFavourite } from './favoriteSlice';
import { favoriteReducer } from './favoriteSlice';

describe('favourite slice test', () => {
  const hero: FavouriteHero = {
    id: 5,
    name: 'Rick',
    status: 'alive',
    species: 'Human',
    gender: 'male',
    location: { name: 'some location' },
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  };

  const second_hero: FavouriteHero = {
    id: 6,
    name: 'Rick6',
    status: 'alive',
    species: 'Human',
    gender: 'male',
    location: { name: 'some location' },
    image: 'https://rickandmortyapi.com/api/character/avatar/6.jpeg',
  };

  it('expect state add new hero', () => {
    const initialState: FavouriteShema = { heroes: [] };
    expect(favoriteReducer(initialState, addFavourite(hero))).toEqual({ heroes: [hero] });
  });

  it('expect state remove existed hero', () => {
    const initialState: FavouriteShema = { heroes: [hero] };
    expect(favoriteReducer(initialState, removeFavourite(hero))).toEqual({ heroes: [] });
  });

  it('expect state not remove not existed hero', () => {
    const initialState: FavouriteShema = { heroes: [hero] };
    expect(favoriteReducer(initialState, removeFavourite(second_hero))).toEqual({ heroes: [hero] });
  });

  it('expect empty state not will be removed', () => {
    const initialState: FavouriteShema = { heroes: [] };
    expect(favoriteReducer(initialState, removeFavourite(second_hero))).toEqual(initialState);
  });

  it('expect state should be clear', () => {
    const initialState: FavouriteShema = { heroes: [hero, second_hero] };
    expect(favoriteReducer(initialState, clearFavourite())).toEqual({ heroes: [] });
  });
});
