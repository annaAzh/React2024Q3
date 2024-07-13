import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Loader } from './Loader';

describe('Component Loader', () => {
  it('renders loader', () => {
    render(
      <MemoryRouter>
        <Loader />
      </MemoryRouter>,
    );

    const loader = screen.getByAltText('loader');
    expect(loader).toBeInTheDocument();
  });
});
