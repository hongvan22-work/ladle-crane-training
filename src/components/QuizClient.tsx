'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

type Quiz = {
  id: string
  question: string
  options: unknown
  correctAnswer: number
  explanation: string
}

type QuizResult = {
  quizId: string
  answer: number
  isCorrect: boolean
}

export default function QuizClient({
  quizzes,
  chapterId,
  existingResults,
}: {
  quizzes: Quiz[]
  chapterId: string
  existingResults: QuizResult[]
}) {
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<string, number>>(
    Object.fromEntries(existingResults.map(r => [r.quizId, r.answer]))
  )
  const [submitted, setSubmitted] = useState(existingResults.length === quizzes.length)
  const [results, setResults] = useState<Record<string, boolean>>(
    Object.fromEntries(existingResults.map(r => [r.quizId, r.isCorrect]))
  )
  const [loading, setLoading] = useState(false)
  const [animatingId, setAnimatingId] = useState<string | null>(null)
  const [elapsed, setElapsed] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!submitted) {
      timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [submitted])

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  const options = (quiz: Quiz) => quiz.options as string[]

  const handleAnswer = (quizId: string, i: number) => {
    setAnswers(prev => ({ ...prev, [quizId]: i }))
    setAnimatingId(quizId)
    setTimeout(() => setAnimatingId(null), 300)
  }

  const handleSubmit = async () => {
    if (Object.keys(answers).length < quizzes.length) return
    setLoading(true)
    if (timerRef.current) clearInterval(timerRef.current)
    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chapterId, answers }),
      })
      const data = await res.json()
      setResults(data.results)
      setSubmitted(true)

      const score = Object.values(data.results as Record<string, boolean>).filter(Boolean).length
      if (score === quizzes.length) {
        const confetti = (await import('canvas-confetti')).default
        confetti({ particleCount: 180, spread: 80, origin: { y: 0.6 }, colors: ['#d97706', '#f59e0b', '#fbbf24', '#3b82f6', '#10b981'] })
        setTimeout(() => confetti({ particleCount: 80, spread: 60, origin: { x: 0.1, y: 0.5 } }), 300)
        setTimeout(() => confetti({ particleCount: 80, spread: 60, origin: { x: 0.9, y: 0.5 } }), 500)
      }

      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  const score = submitted ? Object.values(results).filter(Boolean).length : 0
  const isPerfect = submitted && score === quizzes.length

  return (
    <div className="space-y-8">
      {/* Timer */}
      {!submitted && (
        <div className="flex justify-end">
          <span className="text-stone-400 text-sm font-mono bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            {formatTime(elapsed)}
          </span>
        </div>
      )}

      {/* Score banner */}
      {submitted && (
        <div className={`card text-center py-6 ${isPerfect ? 'border-green-400 bg-green-50' : 'border-amber-400 bg-amber-50'}`}>
          <div className="text-5xl font-bold mb-2" style={{ color: isPerfect ? '#16a34a' : '#d97706' }}>
            {score}/{quizzes.length}
          </div>
          <div className="text-stone-600 font-medium">
            {isPerfect ? '🎉 Xuất sắc! Bạn trả lời đúng tất cả!' : `Bạn đúng ${score} câu – cố lên nhé!`}
          </div>
          <div className="text-stone-400 text-sm mt-1">Thời gian: {formatTime(elapsed)}</div>
        </div>
      )}

      {quizzes.map((quiz, idx) => {
        const selected = answers[quiz.id]
        const isCorrect = results[quiz.id]
        const opts = options(quiz)
        const isAnimating = animatingId === quiz.id

        return (
          <div key={quiz.id} className={`card transition-all ${isAnimating ? 'animate-pop' : ''}`}>
            <p className="text-stone-800 font-semibold mb-4">
              <span className="text-amber-600 mr-2">Câu {idx + 1}.</span>
              {quiz.question}
            </p>
            <div className="space-y-2">
              {opts.map((opt, i) => {
                let cls = 'border-stone-200 bg-stone-50 hover:border-amber-400 hover:bg-amber-50 text-stone-700 cursor-pointer'
                let icon = null

                if (selected === i && !submitted) {
                  cls = 'border-amber-500 bg-amber-50 text-amber-800 ring-2 ring-amber-200'
                }
                if (submitted) {
                  if (i === quiz.correctAnswer) {
                    cls = 'border-green-500 bg-green-50 text-green-800 animate-pop'
                    icon = <span className="ml-auto text-green-600 font-bold">✓</span>
                  } else if (selected === i && !isCorrect) {
                    cls = 'border-red-400 bg-red-50 text-red-700 animate-shake'
                    icon = <span className="ml-auto text-red-500 font-bold">✗</span>
                  } else {
                    cls = 'border-stone-200 bg-stone-50 text-stone-400 cursor-not-allowed'
                  }
                }

                return (
                  <button
                    key={i}
                    disabled={submitted}
                    onClick={() => handleAnswer(quiz.id, i)}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-all text-sm flex items-center gap-2 ${cls} disabled:cursor-not-allowed`}
                  >
                    <span className="font-bold text-stone-500 min-w-[20px]">{String.fromCharCode(65 + i)}.</span>
                    <span className="flex-1">{opt}</span>
                    {icon}
                  </button>
                )
              })}
            </div>

            {submitted && (
              <div className={`mt-4 p-3 rounded-lg text-sm flex gap-2 ${isCorrect ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                <span className="font-bold flex-shrink-0">{isCorrect ? '✓' : '✗'}</span>
                <span><strong>{isCorrect ? 'Đúng! ' : 'Sai. '}</strong>{quiz.explanation}</span>
              </div>
            )}
          </div>
        )
      })}

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length < quizzes.length || loading}
          className="w-full btn-primary py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Đang chấm...' : `Nộp bài (${Object.keys(answers).length}/${quizzes.length} câu đã chọn)`}
        </button>
      )}
    </div>
  )
}
