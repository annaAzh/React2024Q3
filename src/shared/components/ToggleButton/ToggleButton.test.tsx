import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeContext } from 'app/store/Themecontext';
import { ToggleButton } from './ToggleButton';
import style from './ToggleButton.module.scss';
import userEvent from '@testing-library/user-event';

describe('ToggleButton component', () => {
  it('renders button with appropriate class based on isDarkMode', () => {
    const mockContextValue = { isDarkMode: true, setIsDarkMode: vi.fn() };
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
    const mockContextValue = { isDarkMode: true, setIsDarkMode: setIsDarkModeMock };
    render(
      <ThemeContext.Provider value={mockContextValue}>
        <ToggleButton />
      </ThemeContext.Provider>,
    );

    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(setIsDarkModeMock).toHaveBeenCalledWith(false);
  });

  it('renders button with appropriate class when isDarkMode is false', () => {
    const mockContextValue = { isDarkMode: false, setIsDarkMode: vi.fn() };
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
    const mockContextValue = { isDarkMode: false, setIsDarkMode: setIsDarkModeMock };
    render(
      <ThemeContext.Provider value={mockContextValue}>
        <ToggleButton />
      </ThemeContext.Provider>,
    );

    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(setIsDarkModeMock).toHaveBeenCalledWith(true);
  });
});
