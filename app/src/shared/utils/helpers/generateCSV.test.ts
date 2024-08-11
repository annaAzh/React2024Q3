import { describe, it, expect } from 'vitest';
import { generateCSV } from './generateCSV';
import { FavouriteHero } from '@/app/src/features/controlFavoriteMovies/types/favoriteTypes';

describe('generateCSV', () => {
  it('should generate a CSV string from an array of heroes', () => {
    const heroes: FavouriteHero[] = [
      {
        id: 1,
        name: 'Rick',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        image: 'hero-one.png',
      },
      {
        id: 2,
        name: 'Morty',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        image: 'hero-two.png',
      },
    ];

    const expectedCSV = [
      'id,name,status,species,gender,image',
      '"1", "Rick", "Alive", "Human", "Male", "hero-one.png"',
      '"2", "Morty", "Alive", "Human", "Male", "hero-two.png"',
    ].join('\n');

    const result = generateCSV(heroes);
    expect(result).toBe(expectedCSV);
  });

  it('should generate a CSV string with only headers if the heroes array is empty', () => {
    const heroes: FavouriteHero[] = [];

    const expectedCSV = 'id,name,status,species,gender,image';

    const result = generateCSV(heroes);
    expect(result).toBe(expectedCSV);
  });
});
