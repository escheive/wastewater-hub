// src/pages/QuizSummary.tsx
import { useLocation, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function QuizSummary() {
  const { state } = useLocation()
  const { answers, score, total } = state || {}
  console.log(state)

  if (!answers) return <div>No summary data.</div>

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Quiz Summary</h2>
      <p className="text-lg">Score: {score} / {total}</p>

      <div className="space-y-4">
        {answers.map((a: any, i: any) => (
          <div key={i} className="border p-4 rounded">
            <p><strong>Q:</strong> {a.question}</p>
            <p><strong>Your answer:</strong> {a.selected}</p>
            <p><strong>Correct answer:</strong> {a.correct}</p>
            <p className="text-sm text-gray-600 mt-1">{a.feedback}</p>
          </div>
        ))}
      </div>

      <Button asChild className="mt-1 bg-gray-200 !text-black hover:bg-gray-400"><Link to="/">Return Home</Link></Button>
      <Button asChild className="mt-1 bg-gray-200 !text-black hover:bg-gray-400"><Link to="/quizzes">Return To Quizzes</Link></Button>
    </div>
  )
}
