import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from 'react';

type ThemeContextType = {
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
};

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeContext = createContext<ThemeContextType>({ isDarkMode: false, setIsDarkMode: () => {} });

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  return <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeProvider };
export type { ThemeContextType };
