import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'

import './globals.css'

export const metadata: Metadata = {
  title: 'Fulfillment — Личный кабинет',
  description: 'Быстрый расчет, полный цикл фулфилмента и автоматизация оплаты доставки в одном окне.',
}

export const viewport: Viewport = {
  themeColor: '#0066CC',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className="font-sans antialiased">
        {children}
        <Toaster richColors position="top-center" closeButton />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
