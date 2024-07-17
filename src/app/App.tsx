import { FC } from 'react';
import './styles/variables/global.scss';
import './App.css';
import { RouteProvider } from './providers/routerProvider/routeProvider';
import { ThemeProvider } from './store/Themecontext';

const App: FC = () => {
  return (
    <>
      <ThemeProvider>
        <RouteProvider />
      </ThemeProvider>
    </>
  );
};

export { App };
