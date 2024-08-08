import { it, describe, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';
import style from './Button.module.scss';
import userEvent from '@testing-library/user-event';
import { ThemeContext, ThemeContextType } from 'app/providers/themeProvider/Themecontext';

describe('Button component', () => {
  it('renders button with dark mode styles when isDarkMode is true', () => {
    const mockContextValue: ThemeContextType = { isDarkMode: true, toggleTheme: vi.fn() };
    render(
      <ThemeContext.Provider value={mockContextValue}>
        <Button>Select All</Button>
      </ThemeContext.Provider>,
    );
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(style.button_dark);
    expect(button).toHaveClass(style.button);
  });

  it('renders button with light mode styles when isDarkMode is false', () => {
    const mockContextValue: ThemeContextType = { isDarkMode: false, toggleTheme: vi.fn() };
    render(
      <ThemeContext.Provider value={mockContextValue}>
        <Button>Select All</Button>
      </ThemeContext.Provider>,
    );
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).not.toHaveClass(style.button_dark);
    expect(button).toHaveClass(style.button);
  });

  it('it be click on button', async () => {
    const mockClick = vi.fn();

    const mockContextValue: ThemeContextType = { isDarkMode: true, toggleTheme: vi.fn() };
    render(
      <ThemeContext.Provider value={mockContextValue}>
        <Button onClick={mockClick}>Select All</Button>
      </ThemeContext.Provider>,
    );

    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(mockClick).toHaveBeenCalled();
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
