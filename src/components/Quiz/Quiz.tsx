import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5)
}

export default function Quiz() {
  const { quizId } = useParams()
  const navigate = useNavigate()
  const [quizTitle, setQuizTitle] = useState('')
  const [shuffledQuestions, setShuffledQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [hasGuessedWrong, setHasGuessedWrong] = useState(false)
  const [score, setScore] = useState(0)
  const [isAnswered, setIsAnswered] = useState(false)
  const [answers, setAnswers] = useState<
    { question: string; selected: string; correct: string; feedback: string }[]
  >([])


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

      setAnswers(prev => [
        ...prev,
        {
          question: current.question,
          selected: selectedChoice!,
          correct: current.answer,
          feedback: current.feedback,
        }
      ])
      setIsAnswered(true)
    } else {
      setHasGuessedWrong(true)
    }
  }

  const handlePrev = () => {
    setIndex((prev) => prev - 1)
    setSelectedChoice(null)
    setIsAnswered(false)
    setHasGuessedWrong(false)
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
        <h2 className="text-2xl font-bold">{quizTitle}</h2>
        <h2 className="text-2xl font-bold">Your Score: {score} / {shuffledQuestions.length}</h2>
        <div className="flex justify-center gap-4">
          <Button asChild><Link to={`/quiz/${quizId}`}>Retake Quiz</Link></Button>
          <Button asChild variant="outline"><Link to="/">Home</Link></Button>
          <Button asChild>
            <Link 
              to='/quiz/summary'
              state={{
                answers,
                score,
                total: shuffledQuestions.length,
              }}
            >
              Summary
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{quizTitle || ''}</h2>
      <div className="text-lg font-semibold">Score: {score}</div>
      <h2 className="text-xl font-semibold">{current.question}</h2>
      <div className="grid gap-2">
        {current.choices.map((choice, i) => (
          <Button
            key={i}
            className={`mt-1 bg-green-600 text-black hover:bg-green-700`}
            variant={selectedChoice === choice ? "default" : "outline"}
            onClick={() => setSelectedChoice(choice)}
          >
            {choice}
          </Button>
        ))}
      </div>

      <Button 
        className={`mt-4 bg-green-600 text-black hover:bg-green-700 disabled:opacity-50`}
        onClick={!isAnswered ? handleSubmit : handleNext} 
        disabled={selectedChoice === null}
      >
        {!isAnswered ? 'Submit' : 'Next'}
      </Button>

      {hasGuessedWrong && !isAnswered && (
        <p className="mt-2 text-red-600">❌ Incorrect. Try again.</p>
      )}

      {/* Show correct feedback if this question was answered correctly */}
      {(answers[index] && answers[index].selected === answers[index].correct) && (
        <div className="mt-2 text-green-700">
          ✅ Correct!
          <p className="mt-1 text-sm text-gray-700">{answers[index].feedback}</p>
        </div>
      )}

      {/* Show incorrect feedback if answered incorrectly */}
      {(answers[index] && answers[index].selected !== answers[index].correct) && (
        <div className="mt-2 text-red-600">
          ❌ Incorrect!
          <p className="mt-1 text-sm text-gray-700">{answers[index].feedback}</p>
        </div>
      )}

      {/* {hasGuessedWrong && !isAnswered || answers[index] && !answers[index].correct && (
        <p className="mt-2 text-red-600">❌ Incorrect. Try again.</p>
      )}

      {isAnswered || answers[index] && answers[index].correct && (
        <div className="mt-2 text-green-700">
          ✅ Correct!
          <p className="mt-1 text-sm text-gray-700">{current.feedback}</p>
        </div>
      )} */}

      <div className="flex justify-between mt-4">
        <Button 
          onClick={handlePrev} disabled={index === 0}
          className={`mt-1 bg-green-600 text-black hover:bg-green-700`}
        >
          Previous
        </Button>

        <Button 
          onClick={handleNext}
          disabled={index === shuffledQuestions.length - 1}
          className={`mt-1 bg-green-600 text-black hover:bg-green-700`}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
