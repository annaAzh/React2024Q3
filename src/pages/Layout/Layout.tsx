import { FC, useContext } from 'react';
import style from './Layout.module.scss';
import { Outlet } from 'react-router-dom';
import { ThemeContext } from 'app/store/Themecontext';

const Layout: FC = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={isDarkMode ? `${style.page} ${style.page_dark}` : style.page}>
      <Outlet />
    </div>
  );
};

export { Layout };
