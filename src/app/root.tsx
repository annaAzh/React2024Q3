import { Links, Meta, redirect, Scripts, ScrollRestoration } from '@remix-run/react';
import { Layout } from 'pages';
import type { LoaderFunction } from '@remix-run/node';
import './styles/global.scss';
import { ThemeProvider } from './providers/themeProvider/Themecontext';
import StoreProvider from './providers/storeProvider/ui/storeProvider';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  if (url.pathname === '/') {
    return redirect('/heroes');
  }

  return null;
};

export default function Root() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React2024Q3</title>
        <Meta />
        <Links />
      </head>

      <body>
        <div id="root">
          <StoreProvider>
            <ThemeProvider>
              <Layout />
            </ThemeProvider>
          </StoreProvider>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
