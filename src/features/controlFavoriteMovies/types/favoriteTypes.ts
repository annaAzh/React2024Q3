export interface FavouriteShema {
  heroes: FavouriteHero[];
}

export interface FavouriteHero {
  id: number;
  name: string;
  status?: string;
  species?: string;
  gender?: string;
  location?: { name: string };
  image?: string;
}
