import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Main } from 'pages/Main/Main';
import { ControllForm } from 'pages/ControllForm/ControllForm';
import { UncontrollForm } from 'pages/UncontrollForm/UncontrollForm';
import { NotFound } from 'pages/NotFound/NotFound';
import { ErrorPage } from 'pages/ErrorPage/ErrorPage';
import { Path } from 'shared/types/routePaths';

const router = createBrowserRouter([
  {
    path: `${Path.main}`,
    element: <Main />,
    errorElement: <ErrorPage />,
  },
  {
    path: `${Path.controlFrom}`,
    element: <ControllForm />,
  },
  {
    path: `${Path.unControlFrom}`,
    element: <UncontrollForm />,
  },
  {
    path: `${Path.notFound}`,
    element: <NotFound />,
  },
]);

const RouteProvider: FC = () => {
  return <RouterProvider router={router} />;
};

export { RouteProvider };
