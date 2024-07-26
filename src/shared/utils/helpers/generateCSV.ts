import { FavouriteHero } from 'features/controlFavoriteMovies/types/favoriteTypes';

export const generateCSV = (heroes: FavouriteHero[] | []) => {
  const headers = ['id', 'name', 'status', 'species', 'gender', 'image'];
  const rows = heroes.map((hero) => {
    const { id, name, status, species, gender, image } = hero;
    return `"${id}", "${name}", "${status}", "${species}", "${gender}", "${image}"`;
  });

  return [headers.join(','), ...rows].join('\n');
};
