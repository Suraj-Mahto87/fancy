import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import { DashboardProvider } from '@/lib/context';
import LayoutWrapper from '@/components/LayoutWrapper';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--fd',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--fb',
});

export const metadata: Metadata = {
  title: 'Fancy Command Dashboard',
  description: 'Internal internal command portal for Fancy.global',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorantGaramond.variable} ${dmSans.variable} font-sans`}>
        <DashboardProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </DashboardProvider>
      </body>
    </html>
  );
}
