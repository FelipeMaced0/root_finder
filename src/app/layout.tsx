import './globals.css'
import { Inter } from 'next/font/google'
import SelectedContextProvider  from './context';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Root Finder',
  description: 'Numeric Cauculus Exercise',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

 
  return (
    <SelectedContextProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="./favicon.ico" sizes="any" />
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </SelectedContextProvider>
  )
}
