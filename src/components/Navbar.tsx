'use client'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'

export default function Navbar() {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-navy-900 border-b border-navy-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏗️</span>
            <div>
              <div className="text-white font-bold text-sm leading-tight">Ladle Crane</div>
              <div className="text-steel-400 text-xs">Training Portal</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/chapters" className="text-gray-300 hover:text-steel-400 transition-colors text-sm font-medium">
              Chuyên Đề
            </Link>
            {session ? (
              <>
                <Link href="/dashboard" className="text-gray-300 hover:text-steel-400 transition-colors text-sm font-medium">
                  Dashboard
                </Link>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 text-sm">{session.user?.name}</span>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="btn-secondary text-sm py-1.5 px-3"
                  >
                    Đăng xuất
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/auth/login" className="text-gray-300 hover:text-white text-sm">
                  Đăng nhập
                </Link>
                <Link href="/auth/register" className="btn-primary text-sm py-1.5 px-4">
                  Đăng ký
                </Link>
              </div>
            )}
          </div>

          <button className="md:hidden text-gray-400" onClick={() => setOpen(!open)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/chapters" className="block text-gray-300 py-2" onClick={() => setOpen(false)}>Chuyên Đề</Link>
            {session ? (
              <>
                <Link href="/dashboard" className="block text-gray-300 py-2" onClick={() => setOpen(false)}>Dashboard</Link>
                <button onClick={() => signOut()} className="block text-gray-400 py-2">Đăng xuất</button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="block text-gray-300 py-2" onClick={() => setOpen(false)}>Đăng nhập</Link>
                <Link href="/auth/register" className="block text-steel-400 py-2" onClick={() => setOpen(false)}>Đăng ký</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
