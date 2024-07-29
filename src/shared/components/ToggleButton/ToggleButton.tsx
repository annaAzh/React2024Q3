import { FC, useContext } from 'react';
import style from './ToggleButton.module.scss';
import { ThemeContext } from 'app/store/Themecontext';

const ToggleButton: FC = () => {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

  const handleClick = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button className={isDarkMode ? `${style.button} ${style.on}` : style.button} onClick={handleClick}>
      <span className={isDarkMode ? `${style.pin} ${style.pin_dark}` : style.pin}></span>
    </button>
  );
};

export { ToggleButton };
