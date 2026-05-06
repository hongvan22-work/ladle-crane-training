'use client'
import { useState } from 'react'
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
  const resultMap = Object.fromEntries(existingResults.map(r => [r.quizId, r]))

  const [answers, setAnswers] = useState<Record<string, number>>(
    Object.fromEntries(existingResults.map(r => [r.quizId, r.answer]))
  )
  const [submitted, setSubmitted] = useState(existingResults.length === quizzes.length)
  const [results, setResults] = useState<Record<string, boolean>>(
    Object.fromEntries(existingResults.map(r => [r.quizId, r.isCorrect]))
  )
  const [loading, setLoading] = useState(false)

  const options = (quiz: Quiz) => quiz.options as string[]

  const handleSubmit = async () => {
    if (Object.keys(answers).length < quizzes.length) return
    setLoading(true)
    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chapterId, answers }),
      })
      const data = await res.json()
      setResults(data.results)
      setSubmitted(true)
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  const score = submitted ? Object.values(results).filter(Boolean).length : 0

  return (
    <div className="space-y-8">
      {submitted && (
        <div className={`card text-center py-6 ${score === quizzes.length ? 'border-green-700 bg-green-900/20' : 'border-steel-700 bg-steel-900/20'}`}>
          <div className="text-4xl font-bold text-white mb-1">{score}/{quizzes.length}</div>
          <div className="text-gray-400">
            {score === quizzes.length ? '🎉 Xuất sắc! Bạn trả lời đúng tất cả!' : `Bạn đúng ${score} câu`}
          </div>
        </div>
      )}

      {quizzes.map((quiz, idx) => {
        const selected = answers[quiz.id]
        const isCorrect = results[quiz.id]
        const opts = options(quiz)

        return (
          <div key={quiz.id} className="card">
            <p className="text-white font-semibold mb-4">
              <span className="text-steel-400 mr-2">Câu {idx + 1}.</span>
              {quiz.question}
            </p>
            <div className="space-y-2">
              {opts.map((opt, i) => {
                let cls = 'border-gray-700 bg-gray-800 hover:border-gray-600 text-gray-300'
                if (selected === i && !submitted) cls = 'border-steel-500 bg-steel-900/30 text-white'
                if (submitted) {
                  if (i === quiz.correctAnswer) cls = 'border-green-600 bg-green-900/30 text-green-300'
                  else if (selected === i && !isCorrect) cls = 'border-red-600 bg-red-900/30 text-red-300'
                  else cls = 'border-gray-700 bg-gray-800 text-gray-500'
                }

                return (
                  <button
                    key={i}
                    disabled={submitted}
                    onClick={() => setAnswers(prev => ({ ...prev, [quiz.id]: i }))}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-all text-sm ${cls} disabled:cursor-not-allowed`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </button>
                )
              })}
            </div>
            {submitted && (
              <div className={`mt-4 p-3 rounded-lg text-sm ${isCorrect ? 'bg-green-900/20 text-green-300' : 'bg-red-900/20 text-red-300'}`}>
                <strong>{isCorrect ? '✓ Đúng! ' : '✗ Sai. '}</strong>
                {quiz.explanation}
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
          {loading ? 'Đang chấm...' : `Nộp bài (${Object.keys(answers).length}/${quizzes.length} câu)`}
        </button>
      )}
    </div>
  )
}
