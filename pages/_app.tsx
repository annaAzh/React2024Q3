import React, { FC } from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from 'app/providers/storeProvider/config/wrapper';
import { ThemeProvider } from 'app/providers/themeProvider/Themecontext';
import '../src/app/styles/global.scss';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const { store } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
