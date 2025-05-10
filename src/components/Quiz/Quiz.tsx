import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5)
}

export default function Quiz() {
  const { quizId } = useParams()
  console.log(quizId)
  const [quizTitle, setQuizTitle] = useState('')
  const [shuffledQuestions, setShuffledQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [hasGuessedWrong, setHasGuessedWrong] = useState(false)
  const [score, setScore] = useState(0)
  const [isAnswered, setIsAnswered] = useState(false)

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const response = await fetch(`/data/quizzes.json`)
        const quizzes = await response.json()

        const quizData = quizzes[quizId]
        if (quizData) {
          setQuizTitle(quizData.title)
          setShuffledQuestions(shuffleArray(quizData.questions))
        } else {
          console.error(`Quiz with id ${quizId} not found`)
        }
      } catch (error) {
        console.error("Error loading quiz data:", error)
      }
    }

    loadQuizData()
  }, [quizId])

  if (shuffledQuestions.length === 0) return null

  const current = shuffledQuestions[index]

  const handleSubmit = () => {
    if (!selectedChoice) return

    const isCorrect = selectedChoice === current.answer

    if (isCorrect) {
      if (!hasGuessedWrong) {
        setScore((prev) => prev + 1)
      }
      setIsAnswered(true)
    } else {
      setHasGuessedWrong(true)
    }

    if (!isAnswered && selectedChoice !== null) {
      if (selectedChoice === current.answer) {
        setIsAnswered(true)
      }
      
    } else {
      setIndex((prev) => prev + 1)
      setSelectedChoice(null)
      setIsAnswered(false)
    }
  }

  const handleNext = () => {
    setIndex((prev) => prev + 1)
    setSelectedChoice(null)
    setIsAnswered(false)
    setHasGuessedWrong(false)
  }

  if (index >= shuffledQuestions.length) {
    return (
      <div className="text-center mt-10 space-y-4">
        <h2 className="text-2xl font-bold">Your Score: {score} / {shuffledQuestions.length}</h2>
        <div className="flex justify-center gap-4">
          <Button asChild><Link to="/quiz">Retake Quiz</Link></Button>
          <Button asChild variant="outline"><Link to="/">Home</Link></Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="text-lg font-semibold">Score: {score}</div>
      <h2 className="text-xl font-semibold">{current.question}</h2>
      <div className="grid gap-2">
        {current.choices.map((choice, i) => (
          <Button
            key={i}
            variant={selectedChoice === choice ? "default" : "outline"}
            onClick={() => setSelectedChoice(choice)}
          >
            {choice}
          </Button>
        ))}
      </div>

      {!isAnswered ? (
        <Button className="mt-4" onClick={handleSubmit} disabled={selectedChoice === null}>
          Submit
        </Button>
      ) : (
        <Button className="mt-4" onClick={handleNext}>
          Next
        </Button>
      )}

      {hasGuessedWrong && !isAnswered && (
        <p className="mt-2 text-red-600">❌ Incorrect. Try again.</p>
      )}

      {isAnswered && (
        <div className="mt-2 text-green-700">
          ✅ Correct!
          <p className="mt-1 text-sm text-gray-700">{current.feedback}</p>
        </div>
      )}
    </div>
  )
}
