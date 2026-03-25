import type {Metadata} from 'next'
import {Geist, Geist_Mono} from 'next/font/google'
import {SiteHeader} from '@/components/SiteHeader'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Anand Thakkar',
    template: '%s · Anand Thakkar',
  },
  description:
    'Software developer. Portfolio and blog — built as a first Sanity project with Next.js.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
        <SiteHeader />
        {children}
      </body>
    </html>
  )
}
