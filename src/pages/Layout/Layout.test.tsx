import { render, screen } from '@testing-library/react';
import { ThemeContext, ThemeContextType } from 'app/providers/themeProvider/Themecontext';
import { describe, it, vi } from 'vitest';
import { Layout } from './Layout';
import style from './Layout.module.scss';

describe('Layout component', () => {
  it('renders layout with appropriate class based on isDarkMode', () => {
    const mockContextValue = { isDarkMode: true, toggleTheme: vi.fn() };
    render(
      <ThemeContext.Provider value={mockContextValue}>
        <Layout />
      </ThemeContext.Provider>,
    );

    const layout = screen.getByTestId('layout');
    expect(layout).toBeInTheDocument();
    expect(layout).toHaveClass(style.page_dark);
    expect(layout).toHaveClass(style.page);
  });

  it('renders layout with appropriate class based on not isDarkMode', () => {
    const mockContextValue: ThemeContextType = { isDarkMode: false, toggleTheme: vi.fn() };
    render(
      <ThemeContext.Provider value={mockContextValue}>
        <Layout />
      </ThemeContext.Provider>,
    );

    const layout = screen.getByTestId('layout');
    expect(layout).toBeInTheDocument();
    expect(layout).not.toHaveClass(style.page_dark);
    expect(layout).toHaveClass(style.page);
  });
});
