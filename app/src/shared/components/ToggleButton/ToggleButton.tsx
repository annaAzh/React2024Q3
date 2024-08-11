'use client';

import { FC } from 'react';
import style from './ToggleButton.module.scss';
import { useTheme } from '@/app/src/_app/providers/themeProvider/hook';

const ToggleButton: FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button className={isDarkMode ? `${style.button} ${style.on}` : style.button} onClick={() => toggleTheme()}>
      <span className={isDarkMode ? `${style.pin} ${style.pin_dark}` : style.pin}></span>
    </button>
  );
};

export { ToggleButton };
