import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ToggleButton } from './ToggleButton';
import style from './ToggleButton.module.scss';
import userEvent from '@testing-library/user-event';
import { ThemeContext } from 'app/providers/themeProvider/Themecontext';

describe('ToggleButton component', () => {
  it('renders button with appropriate class based on isDarkMode', () => {
    const mockContextValue = { isDarkMode: true, toggleTheme: vi.fn() };
    render(
      <ThemeContext.Provider value={mockContextValue}>
        <ToggleButton />
      </ThemeContext.Provider>,
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(`${style.button} ${style.on}`);
  });

  it('toggles dark mode on button click', async () => {
    const setIsDarkModeMock = vi.fn();
    const mockContextValue = { isDarkMode: true, toggleTheme: vi.fn() };
    render(
      <ThemeContext.Provider value={mockContextValue}>
        <ToggleButton />
      </ThemeContext.Provider>,
    );

    const button = screen.getByRole('button');
    await userEvent.click(button);
    waitFor(() => {
      expect(setIsDarkModeMock).toHaveBeenCalledWith(false);
    });
  });

  it('renders button with appropriate class when isDarkMode is false', () => {
    const mockContextValue = { isDarkMode: false, toggleTheme: vi.fn() };
    render(
      <ThemeContext.Provider value={mockContextValue}>
        <ToggleButton />
      </ThemeContext.Provider>,
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(style.button);
  });

  it('toggles light mode on button click', async () => {
    const setIsDarkModeMock = vi.fn();
    const mockContextValue = { isDarkMode: false, toggleTheme: vi.fn() };
    render(
      <ThemeContext.Provider value={mockContextValue}>
        <ToggleButton />
      </ThemeContext.Provider>,
    );

    const button = screen.getByRole('button');
    await userEvent.click(button);
    waitFor(() => {
      expect(setIsDarkModeMock).toHaveBeenCalledWith(true);
    });
  });
});
