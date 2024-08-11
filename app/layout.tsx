import { Metadata } from 'next';
import { ThemeProvider } from '@/app/src/_app/providers/themeProvider/Themecontext';
import { inter } from '@/app/ui/fonts';
import '@/app/ui/styles/global.scss';
import { Layout as LayoutWrapper } from '@/app/src/widget/Layout/Layout';
import { StoreProvider } from './src/_app/providers/storeProvider';

export const metadata: Metadata = {
  title: 'ReactQ32024',
  description: 'The project for course at RS School Fronten-end/React 2024',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <StoreProvider>
          <ThemeProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
