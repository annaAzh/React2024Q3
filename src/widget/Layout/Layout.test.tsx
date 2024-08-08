import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Layout } from './Layout';
import style from './Layout.module.scss';
import { ThemeContext, ThemeContextType } from 'app/providers/themeProvider/Themecontext';

describe('Layout component', () => {
  it('renders layout with appropriate class based on isDarkMode', () => {
    const mockContextValue: ThemeContextType = { isDarkMode: true, toggleTheme: vi.fn() };
    render(
      <ThemeContext.Provider value={mockContextValue}>
        <Layout>hello</Layout>
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
        <Layout>hello</Layout>
      </ThemeContext.Provider>,
    );

    const layout = screen.getByTestId('layout');
    expect(layout).toBeInTheDocument();
    expect(layout).not.toHaveClass(style.page_dark);
    expect(layout).toHaveClass(style.page);
  });
});
