import { ThemeContext } from 'app/store/Themecontext';
import { FC, ReactNode, useContext } from 'react';
import style from './Button.module.scss';

interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ children, onClick }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <button className={isDarkMode ? `${style.button} ${style.button_dark}` : style.button} onClick={onClick}>
      {children}
    </button>
  );
};

export { Button };
