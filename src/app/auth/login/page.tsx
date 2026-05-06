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
          <div className="text-5xl mb-3">🏗️</div>
          <h1 className="text-2xl font-bold text-white">Đăng Nhập</h1>
          <p className="text-gray-400 mt-1">Ladle Crane Training Portal</p>
        </div>

        <div className="card">
          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-steel-500 text-sm"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Mật khẩu</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-steel-500 text-sm"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" disabled={loading} className="w-full btn-primary py-3 disabled:opacity-50">
              {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-500">
            Chưa có tài khoản?{' '}
            <Link href="/auth/register" className="text-steel-400 hover:text-steel-300">
              Đăng ký ngay
            </Link>
          </div>

          <div className="mt-6 p-3 bg-gray-800 rounded-lg text-xs text-gray-500">
            <div className="font-semibold text-gray-400 mb-1">Tài khoản demo:</div>
            <div>Admin: admin@ladlecrane.com / admin123</div>
            <div>Student: student@ladlecrane.com / student123</div>
          </div>
        </div>
      </div>
    </div>
  )
}
