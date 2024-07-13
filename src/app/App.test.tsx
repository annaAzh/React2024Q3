import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { App } from './App';

it('not render learn react link', () => {
  render(<App />);
  const element = screen.queryByText('learn react');
  expect(element).not.toBeInTheDocument();
});
