import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import React from 'react'

export default function QuizSelection() {
  return (
    <div className="text-center space-y-6">
      <h2 className="text-2xl font-semibold">Select a Quiz</h2>
      <div>
        <Button asChild>
          <Link to="/quiz/quiz1">Quiz 1</Link>
        </Button>
      </div>
      <div>
        <Button asChild>
          <Link to="/quiz/quiz2">Quiz 2</Link>
        </Button>
      </div>
    </div>
  )
}