import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Egypt Herbs Wholesale | Premium Dried Herbs from Egypt',
  description: 'Bulk dried herbs, seeds and botanicals sourced from Egypt for distributors, wholesalers and commercial buyers.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
