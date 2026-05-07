import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ladle Crane Training – Đào Tạo Cầu Trục Rót Thép',
  description: 'Hệ thống đào tạo kỹ thuật cầu trục luyện kim chuyên nghiệp cho kỹ sư và nhân viên kinh doanh ngành thép.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="bg-white border-t border-amber-200 py-8 mt-16">
            <div className="max-w-7xl mx-auto px-4 text-center text-stone-500 text-sm">
              <p>© 2026 Ladle Crane Training Portal</p>
              <p className="mt-1">Built with Claude Code · Deployed on Railway</p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  )
}
