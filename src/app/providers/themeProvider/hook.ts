import { useContext } from 'react';
import { ThemeContext } from './Themecontext';

const useTheme = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error('No theme context');
  }
  return themeContext;
};

export { useTheme };
