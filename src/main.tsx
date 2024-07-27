import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App.tsx';
import './index.css';
import { ErrorBoundary } from 'shared/utils/errorBoundary/index.ts';
import { StoreProvider } from 'app/providers/storeProvider/index.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <StoreProvider>
        <App />
      </StoreProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
