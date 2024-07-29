import { it, describe, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeContext } from 'app/store/Themecontext';
import { Button } from './Button';
import style from './Button.module.scss';
import userEvent from '@testing-library/user-event';

describe('Button component', () => {
  it('renders button with dark mode styles when isDarkMode is true', () => {
    const mockContextValue = { isDarkMode: true, setIsDarkMode: () => {} };
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
    const mockContextValue = { isDarkMode: false, setIsDarkMode: () => {} };
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

  it('click on button', async () => {
    const mockClick = vi.fn();

    const mockContextValue = { isDarkMode: true, setIsDarkMode: () => {} };
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
