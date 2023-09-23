import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import Navigation from '../components/Navigation';
import 'react-toastify/dist/ReactToastify.css';

import './globals.css';

const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Eliftech',
  description: 'Test task for Eliftech',
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${roboto.className} flex flex-col w-full h-screen pb-4`}>
        <header className='container mx-auto py-4 px-2'>
          <Navigation />
        </header>
        <main className='container flex-grow w-full mx-auto px-2 overflow-y-auto'>{children}</main>
        <ToastContainer
          autoClose={2000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={false}
          draggable={false}
        />
      </body>
    </html>
  );
}
