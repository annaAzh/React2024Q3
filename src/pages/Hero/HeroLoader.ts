import { LoaderFunctionArgs } from 'react-router-dom';
import { getSingleHero } from 'shared/lib/api/SearchRequest';
import { HeroResponse } from 'shared/lib/api/types';

export const loader = async ({ params }: LoaderFunctionArgs): Promise<HeroResponse | undefined> => {
  const { id } = params;
  if (id) {
    const hero = await getSingleHero(id);
    return hero;
  }
  return undefined;
};
