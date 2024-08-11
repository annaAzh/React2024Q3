import { json } from '@remix-run/node';
import { Hero } from 'pages';
import { LoaderFunctionArgs } from 'react-router-dom';
import { getSingleHero } from 'shared/api/searchRequest';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id;

  if (!id) {
    throw new Error('Hero ID is required');
  }
  const data = await getSingleHero(id);
  return json({ data });
};

export default function HeroPage() {
  return <Hero />;
}
