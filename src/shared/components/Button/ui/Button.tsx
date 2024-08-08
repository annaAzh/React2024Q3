import { FC, ReactNode } from 'react';
import style from './Button.module.scss';
import { useTheme } from 'app/providers/themeProvider/hook';

interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ children, onClick }) => {
  const { isDarkMode } = useTheme();

  return (
    <button className={isDarkMode ? `${style.button} ${style.button_dark}` : style.button} onClick={onClick}>
      {children}
    </button>
  );
};

export { Button };
