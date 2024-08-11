import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, vi } from 'vitest';
import { Loader } from './Loader';
import createFetchMock from 'vitest-fetch-mock';

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

describe('Component Loader', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

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
