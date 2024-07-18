import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import './globals.css';

// Configura la fuente Poppins con las opciones que necesitas
const pop = Poppins({
  subsets: ['latin'], 
  weight: ['400'], 
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
         <script src="https://kit.fontawesome.com/79aabc3f90.js"></script>
      </head>

      <body className={pop.className}>
        
        {children}
      </body>
    </html>
  );
}
