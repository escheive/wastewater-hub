// src/pages/QuizSummary.tsx
import { useLocation, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function QuizSummary() {
  const { state } = useLocation()
  const { answers, score, total, shuffledQuestions } = state || {}

  if (!answers) return <div>No summary data.</div>

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Quiz Summary</h2>
      <p className="text-lg">Score: {score} / {total}</p>

      <div className="space-y-4">
        {answers.map((a: any, i: any) => {
          const question = shuffledQuestions?.find((q: any) => q.id === a.id)
          const selectedChoice = question.choices.find((c: any) => c.id === a.selected)
          const correctChoice = question.choices.find((c: any) => c.id === a.correct)
          const gotItRight = a.selected === a.correct

          return (
            <div 
              key={i} 
              className={`border p-4 rounded-l-md border-l-8
                ${gotItRight ? 'border-l-green-500' : 'border-l-red-500'}
              `}
            >
              <p className="py-1"><strong>Q:</strong> {a.question}</p>
              <p className="py-1">
                <strong>Your answer:</strong>{' '}
                {a.selected} - {selectedChoice.text}
              </p>
              <p className="py-1">
                <strong>Correct answer:</strong>{' '}
                {a.correct} - {correctChoice?.text || 'N/A'}
              </p>
              <p className="text-sm text-gray-600 mt-1 py-1">{a.feedback}</p>
            </div>
          )
        })}
      </div>

      <Button asChild className="mt-1 bg-gray-200 !text-black hover:bg-gray-400"><Link to="/">Return Home</Link></Button>
      <Button asChild className="mt-1 bg-gray-200 !text-black hover:bg-gray-400"><Link to="/quizzes">Return To Quizzes</Link></Button>
    </div>
  )
}
