import { expect, it } from 'vitest';
import { createRemixStub } from '@remix-run/testing';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'app/providers/themeProvider/Themecontext';
import HeroPage, { loader } from 'app/routes/heroes.$id';
import { json } from '@remix-run/node';
import { heroes } from 'shared/lib/__mock__';

it('testing Details server component', async () => {
  const MockDetailsPage = createRemixStub([
    {
      path: `/`,
      Component: HeroPage,
      loader(): Awaited<ReturnType<typeof loader>> {
        return json({ data: heroes[0] });
      },
    },
  ]);

  const { findByTestId, findByText } = render(
    <ThemeProvider>
      <MockDetailsPage />
    </ThemeProvider>,
  );

  const close = await findByTestId(/close/i);
  expect(close).toBeInTheDocument();

  const details = await findByText(/Rick/i);
  expect(details).toBeInTheDocument();
});
