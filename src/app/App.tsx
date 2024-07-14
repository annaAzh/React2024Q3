import { FC } from 'react';
import './styles/variables/global.scss';
import './App.css';
import { RouteProvider } from './providers/routerProvider/routeProvider';

const App: FC = () => {
  return <RouteProvider />;
};

export { App };
