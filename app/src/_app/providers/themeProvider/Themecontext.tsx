'use client';

import { createContext, FC, ReactNode, useState } from 'react';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeProvider };
export type { ThemeContextType };
