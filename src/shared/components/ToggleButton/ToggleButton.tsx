import { FC } from 'react';
import style from './ToggleButton.module.scss';
import { useTheme } from 'app/providers/themeProvider/hook';

const ToggleButton: FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const handleClick = () => {
    toggleTheme();
  };

  return (
    <button className={isDarkMode ? `${style.button} ${style.on}` : style.button} onClick={handleClick}>
      <span className={isDarkMode ? `${style.pin} ${style.pin_dark}` : style.pin}></span>
    </button>
  );
};

export { ToggleButton };
