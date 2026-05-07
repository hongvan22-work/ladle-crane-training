'use client'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'

export default function Navbar() {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-amber-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏗️</span>
            <div>
              <div className="text-stone-900 font-bold text-sm leading-tight">Ladle Crane</div>
              <div className="text-amber-600 text-xs">Training Portal</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/chapters" className="text-stone-600 hover:text-amber-600 transition-colors text-sm font-medium">
              Chuyên Đề
            </Link>
            {session ? (
              <>
                <Link href="/dashboard" className="text-stone-600 hover:text-amber-600 transition-colors text-sm font-medium">
                  Dashboard
                </Link>
                <div className="flex items-center gap-3">
                  <span className="text-stone-500 text-sm">{session.user?.name}</span>
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
                <Link href="/auth/login" className="text-stone-600 hover:text-stone-900 text-sm">
                  Đăng nhập
                </Link>
                <Link href="/auth/register" className="btn-primary text-sm py-1.5 px-4">
                  Đăng ký
                </Link>
              </div>
            )}
          </div>

          <button className="md:hidden text-stone-500" onClick={() => setOpen(!open)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 space-y-2 border-t border-amber-100 pt-3">
            <Link href="/chapters" className="block text-stone-600 py-2" onClick={() => setOpen(false)}>Chuyên Đề</Link>
            {session ? (
              <>
                <Link href="/dashboard" className="block text-stone-600 py-2" onClick={() => setOpen(false)}>Dashboard</Link>
                <button onClick={() => signOut()} className="block text-stone-500 py-2">Đăng xuất</button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="block text-stone-600 py-2" onClick={() => setOpen(false)}>Đăng nhập</Link>
                <Link href="/auth/register" className="block text-amber-600 py-2 font-medium" onClick={() => setOpen(false)}>Đăng ký</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
