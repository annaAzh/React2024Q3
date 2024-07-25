import { ThemeContext } from 'app/store/Themecontext';
import { FC, ReactNode, useContext } from 'react';
import style from './Button.module.scss';

interface ButtonProps {
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ children }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return <button className={isDarkMode ? `${style.button} ${style.button_dark}` : style.button}>{children}</button>;
};

export { Button };
