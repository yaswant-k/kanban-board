import './globals.css'
import Link from 'next/link'
import type { Metadata } from 'next'
import Providers from './providers'

export const metadata: Metadata = {
  title: 'Kanban Board',
  description: 'MyCritters onboarding project',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Providers>
          {/* Navbar */}
          <nav className="w-full bg-gray-100 dark:bg-gray-900 p-4 flex gap-6">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/countries" className="hover:underline">Countries</Link>
            <Link href="/boards" className="hover:underline">Boards</Link>
          </nav>

          {/* Page content */}
          <div className="p-6">{children}</div>
        </Providers>
      </body>
    </html>
  )
}
