import type { Metadata } from 'next';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import '@/styles/globals.scss';
import { PERSONAL_DETAILS } from '@/config/PERSONAL_DETAILS_CONFIG';

export const metadata: Metadata = {
  title: PERSONAL_DETAILS.meta.title,
  description: PERSONAL_DETAILS.meta.description,
  keywords: PERSONAL_DETAILS.meta.keywords,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
