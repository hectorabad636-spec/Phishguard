import type { Metadata } from 'next'
import { IBM_Plex_Mono, Syne } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
})

const ibmMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'PhishGuard',
  description: 'Phishing Awareness Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${syne.variable} ${ibmMono.variable}`}>
        {children}
      </body>
    </html>
  )
}