import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ToggleButton } from './ToggleButton';
import style from './ToggleButton.module.scss';
import userEvent from '@testing-library/user-event';
import { ThemeContext, ThemeContextType, ThemeProvider } from '@/app/src/_app/providers/themeProvider/Themecontext';

describe('ToggleButton component', () => {
  it('renders button with appropriate class based on isDarkMode', () => {
    const mockContextValue: ThemeContextType = { isDarkMode: true, toggleTheme: vi.fn() };
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
    const TestComponent = () => {
      return (
        <ThemeProvider>
          <ToggleButton />
        </ThemeProvider>
      );
    };

    render(<TestComponent />);

    const button = screen.getByRole('button');
    expect(button).not.toHaveClass('on');

    await userEvent.click(button);
    waitFor(() => {
      expect(button).toHaveClass('on');
    });

    await userEvent.click(button);
    waitFor(() => {
      expect(button).not.toHaveClass('on');
    });
  });

  it('renders button with appropriate class when isDarkMode is false', () => {
    const mockContextValue: ThemeContextType = { isDarkMode: false, toggleTheme: vi.fn() };
    render(
      <ThemeContext.Provider value={mockContextValue}>
        <ToggleButton />
      </ThemeContext.Provider>,
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(style.button);
  });
});
