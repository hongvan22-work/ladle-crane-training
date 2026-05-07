'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm) {
      setError('Mật khẩu xác nhận không khớp')
      return
    }
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
    })

    const data = await res.json()
    if (!res.ok) {
      setError(data.error || 'Đăng ký thất bại')
      setLoading(false)
      return
    }

    await signIn('credentials', { email: form.email, password: form.password, redirect: false })
    router.push('/dashboard')
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🏗️</div>
          <h1 className="text-2xl font-bold text-white">Tạo Tài Khoản</h1>
          <p className="text-gray-400 mt-1">Miễn phí – Truy cập đầy đủ nội dung</p>
        </div>

        <div className="card">
          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: 'Họ tên', key: 'name', type: 'text', placeholder: 'Nguyễn Văn A' },
              { label: 'Email', key: 'email', type: 'email', placeholder: 'email@example.com' },
              { label: 'Mật khẩu', key: 'password', type: 'password', placeholder: '••••••••' },
              { label: 'Xác nhận mật khẩu', key: 'confirm', type: 'password', placeholder: '••••••••' },
            ].map(field => (
              <div key={field.key}>
                <label className="block text-sm text-stone-600 mb-1">{field.label}</label>
                <input
                  type={field.type}
                  required
                  value={form[field.key as keyof typeof form]}
                  onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                  className="w-full bg-white border border-amber-300 rounded-lg px-4 py-2.5 text-stone-900 focus:outline-none focus:border-amber-500 text-sm"
                  placeholder={field.placeholder}
                />
              </div>
            ))}
            <button type="submit" disabled={loading} className="w-full btn-primary py-3 disabled:opacity-50">
              {loading ? 'Đang tạo...' : 'Tạo Tài Khoản'}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-500">
            Đã có tài khoản?{' '}
            <Link href="/auth/login" className="text-steel-400 hover:text-steel-300">Đăng nhập</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
