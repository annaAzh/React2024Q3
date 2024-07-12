import { FC } from 'react';
import { Hero, Layout, NotFound, SearchPage } from 'pages';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Paths } from 'shared/types';
import { loader as loaderHeroes } from '../../../pages/Hero/Hero';

const router = createBrowserRouter(
  [
    {
      path: Paths.base,
      element: <Layout />,
      children: [
        {
          path: Paths.base,
          element: <SearchPage />,
          children: [
            {
              path: `${Paths.hero}:id`,
              element: <Hero />,
              loader: loaderHeroes,
            },
          ],
        },
        {
          path: Paths.notFound,
          element: <NotFound />,
        },
      ],
    },
  ],
  {
    basename: '/React2024Q3',
  },
);

const RouteProvider: FC = () => {
  return <RouterProvider router={router} />;
};

export { RouteProvider };
