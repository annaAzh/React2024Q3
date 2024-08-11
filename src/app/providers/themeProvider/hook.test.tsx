import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ThemeProvider } from './Themecontext';
import { useTheme } from './hook';

describe('useTheme hook', () => {
  it('should return the current theme and toggle function', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    });
    const { isDarkMode, toggleTheme } = result.current;
    expect(isDarkMode).toBe(true);
    expect(toggleTheme).toBeDefined();
    expect(typeof toggleTheme).toBe('function');
  });
});
