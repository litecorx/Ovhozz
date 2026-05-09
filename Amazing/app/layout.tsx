import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'OVHOZ | Digital Creator & Attention Architect',
  description: 'Culture-driven creator. Attention architect. Internet personality. High-retention content that defines the digital landscape.',
  keywords: ['creator', 'digital', 'content', 'social media', 'brand partnerships', 'influencer'],
  authors: [{ name: 'Ovhoz' }],
  openGraph: {
    title: 'OVHOZ | Digital Creator & Attention Architect',
    description: 'Culture-driven creator. Attention architect. Internet personality.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OVHOZ | Digital Creator & Attention Architect',
    description: 'Culture-driven creator. Attention architect. Internet personality.',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} bg-background`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
