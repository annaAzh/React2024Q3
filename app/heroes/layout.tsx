import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | ReactQ32024',
    default: 'Heroes',
  },
  description: 'Heroes page',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
