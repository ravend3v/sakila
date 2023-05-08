import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sakila'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' type="image/png" href='logo.png' />
      </head>
      <body className='flex flex-col min-h-screen m-0' >
        <Header />
        <main className='flex-1'>
          {children} 
        </main>
        <Footer />
      </body>

    </html>
  )
}
