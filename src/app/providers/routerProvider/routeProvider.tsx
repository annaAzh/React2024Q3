import { FC } from 'react';
import { Hero, Layout, NotFound, SearchPage } from 'pages';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Paths } from 'shared/types';
import { ErrorElement } from 'shared/utils/errorBoundary';

const router = createBrowserRouter([
  {
    path: Paths.base,
    element: <Layout />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: Paths.base,
        element: <SearchPage />,
        children: [
          {
            path: `${Paths.hero}:id`,
            element: <Hero />,
            errorElement: <ErrorElement />,
          },
        ],
      },
      {
        path: Paths.notFound,
        element: <NotFound />,
      },
    ],
  },
]);

const RouteProvider: FC = () => {
  return <RouterProvider router={router} />;
};

export { RouteProvider };
