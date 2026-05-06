'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function MarkCompleteButton({ chapterId, completed }: { chapterId: string; completed: boolean }) {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(completed)
  const router = useRouter()

  const toggle = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chapterId, completed: !done }),
      })
      if (res.ok) {
        setDone(!done)
        router.refresh()
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`flex-1 py-2 px-6 rounded-lg font-semibold transition-colors ${
        done
          ? 'bg-green-700 hover:bg-green-800 text-white'
          : 'bg-steel-600 hover:bg-steel-700 text-white'
      } disabled:opacity-50`}
    >
      {loading ? 'Đang lưu...' : done ? '✓ Đã Hoàn Thành' : 'Đánh Dấu Hoàn Thành'}
    </button>
  )
}
