import { FC } from 'react';
import style from './Layout.module.scss';
import { Outlet } from '@remix-run/react';
import { useTheme } from 'app/providers/themeProvider/hook';

const Layout: FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div data-testid="layout" className={isDarkMode ? `${style.page} ${style.page_dark}` : style.page}>
      <Outlet />
    </div>
  );
};

export { Layout };
