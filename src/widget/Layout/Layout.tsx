import { FC, ReactNode } from 'react';
import style from './Layout.module.scss';
import { useTheme } from 'app/providers/themeProvider/hook';

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  const { isDarkMode } = useTheme();

  return (
    <div data-testid="layout" className={isDarkMode ? `${style.page} ${style.page_dark}` : style.page}>
      {children}
    </div>
  );
};

export { Layout };
