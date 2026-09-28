import './global.css';
import clsx from 'clsx';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Creepster, Caveat, Roboto, Kalam, Lora } from 'next/font/google';
import Sidebar from '../components/sidebar';
import BlobBand from '../components/blobBand';
import { Analytics } from '@vercel/analytics/react';

const kaisei = localFont({
  src: '../public/fonts/kaisei-tokumin-latin-700-normal.woff2',
  weight: '700',
  variable: '--font-kaisei',
  display: 'swap',
});

const roboto = Roboto({
  weight: ['300', '400'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

const kalam = Kalam({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-kalam',
  display: 'swap',
});

const creepster = Creepster({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-creepster',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Sagar Deep',
    template: '%s | Sagar Deep',
  },
  description: 'Full-stack dev and novice blogger.',
  // openGraph: {
  //   title: 'Sagar Deep',
  //   description: 'Full-stack dev and novice blogger.',
  //   url: 'https://sagardeep.io',
  //   siteName: 'Sagar Deep',
  //   images: [
  //     {
  //       url: 'https://sagardeep.io/og.jpg',
  //       width: 1920,
  //       height: 1080,
  //     },
  //   ],
  //   locale: 'en-US',
  //   type: 'website',
  // },
  // robots: {
  //   index: true,
  //   follow: true,
  //   googleBot: {
  //     index: true,
  //     follow: true,
  //     'max-video-preview': -1,
  //     'max-image-preview': 'large',
  //     'max-snippet': -1,
  //   },
  // },
  // twitter: {
  //   title: 'Sagar Deep',
  //   card: 'summary_large_image',
  // },
  icons: {
    shortcut: './favicon.ico',
  },
  // verification: {
  //   google: 'eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw',
  //   yandex: '14d2e73487fa6c71',
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={clsx(
        'text-black bg-[#fbfaf9] dark:text-white dark:bg-[#111010]',
        kaisei.variable,
        creepster.variable,
        caveat.variable,
        roboto.variable,
        kalam.variable,
        lora.variable
      )}
    >
      <body className='antialiased min-h-screen flex flex-col'>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === '"dark"' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <BlobBand edge='bottom' className='w-full h-[80px] md:h-[110px]' />
        <div className='flex-1 w-full max-w-6xl mx-auto flex flex-col md:flex-row px-4 md:px-0 mt-2 md:mt-6 mb-40'>
          <Sidebar />
          <main className='flex-auto min-w-0 mt-6 md:mt-0 flex flex-col px-2 w-full'>
            {children}
            <Analytics />
          </main>
        </div>
      </body>
    </html>
  );
}
