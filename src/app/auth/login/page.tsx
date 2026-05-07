'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    })
    setLoading(false)
    if (res?.error) {
      setError('Email hoặc mật khẩu không đúng')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-stone-900">Đăng Nhập</h1>
          <p className="text-stone-500 mt-1">Ladle Crane Training Portal</p>
        </div>

        <div className="card">
          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-stone-600 mb-1">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                className="w-full bg-white border border-amber-300 rounded-lg px-4 py-2.5 text-stone-900 focus:outline-none focus:border-amber-500 text-sm"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm text-stone-600 mb-1">Mật khẩu</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                className="w-full bg-white border border-amber-300 rounded-lg px-4 py-2.5 text-stone-900 focus:outline-none focus:border-amber-500 text-sm"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" disabled={loading} className="w-full btn-primary py-3 disabled:opacity-50">
              {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-stone-500">
            Chưa có tài khoản?{' '}
            <Link href="/auth/register" className="text-amber-600 hover:text-amber-700 font-medium">
              Đăng ký ngay
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
