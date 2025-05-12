import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Link, useParams } from 'react-router-dom'

type Choice = { id: string, text: string }

type Question = {question: string, answerId: string, feedback: string, choices: Choice[] }

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5)
}

export default function Quiz() {
  const { quizId } = useParams()
  const [quizTitle, setQuizTitle] = useState('')
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([])
  const [index, setIndex] = useState(0)
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [hasGuessedWrong, setHasGuessedWrong] = useState(false)
  const [score, setScore] = useState(0)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [answers, setAnswers] = useState<
    { question: string; selected: string; correct: string; feedback: string }[]
  >([])

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const response = await fetch(`/data/quizzes.json`)
        const quizzes = await response.json()
        const quizData = quizId ? quizzes[quizId] : null

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

  const currentQuestion = shuffledQuestions[index]
  if (!currentQuestion) return null

  const alreadyAnswered = answers.some(a => a.question === currentQuestion.question)
  
  const handleSubmit = () => {
    if (!selectedChoice || isAnswered) return

    const isCorrect = selectedChoice === currentQuestion.answerId
    setIsCorrect(isCorrect)

    if (!alreadyAnswered) {
      setAnswers(prev => [
        ...prev,
        {
          question: currentQuestion.question,
          selected: selectedChoice!,
          correct: currentQuestion.answerId,
          feedback: currentQuestion.feedback,
        }
      ])
    }
    

    if (isCorrect) {
      if (!hasGuessedWrong) {
        setScore((prev) => prev + 1)
      }
      setIsAnswered(true)
    } else {
      setHasGuessedWrong(true)
    }
  }

  const handleNav = (newIndex: number) => {
    const navAnswer = answers[newIndex]
    setIndex(newIndex)
    setSelectedChoice(navAnswer?.selected ?? null)
    setIsAnswered(!!navAnswer)

    if (navAnswer) {
      setIsCorrect(navAnswer.selected === navAnswer.correct)
      setHasGuessedWrong(navAnswer.selected !== navAnswer.correct)
    } else {
      setIsCorrect(false)
      setHasGuessedWrong(false)
    }
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
    <div className="flex gap-6">
      {/* Legend Sidebar */}
      <div className="justify-center fixed left-0 top-16 bottom-16 w-56 space-y-2 overflow-y-auto bg-white p-4">
        {shuffledQuestions.map((_, qIndex) => {
          const answer = answers[qIndex]
          const gotItRight = answer && answer.selected === answer.correct
          const gotItWrong = answer && answer.selected !== answer.correct

          return (
            <Button
              key={qIndex}
              variant="outline"
              className={`w-full justify-start text-sm
                ${!answer ? '!bg-gray-100' : ''}
                ${gotItRight ? '!bg-green-100' : ''}
                ${gotItWrong ? '!bg-red-100' : ''}
                ${index === qIndex ? '!border-blue-500 !font-semibold' : ''}       
              `}
              onClick={() => handleNav(qIndex)}
            >
              Q{qIndex + 1} {answers[qIndex] ? '✔️' : ''}
            </Button>
          );
        })}
      </div>

      {/* Quiz Content */}
      <div className="flex-1 ml-56 p-4 pt-16 pb-16">
        <h2 className="text-2xl font-bold">{quizTitle || ''}</h2>
        <p className="text-sm text-gray-600 mb-2">
          Question {index + 1} of {shuffledQuestions?.length}
        </p>
        <div className="text-lg font-semibold">Score: {score}</div>
        <h2 className="text-xl font-semibold">{currentQuestion.question}</h2>
        <div className="grid gap-2">
          {currentQuestion.choices.map((choice, i) => {
            const navAnswer = answers[index]
            const isIncorrectSelected = navAnswer && choice.id === navAnswer.selected && navAnswer.selected !== navAnswer.correct

            return (
              <Button
                key={choice.id}
                className={`mt-1 text-black border-2
                  ${isAnswered && choice.id === navAnswer.correct ? '!bg-green-100' : ''}
                  ${isIncorrectSelected ? '!bg-red-100' : ''}
                `}
                onClick={() => !isAnswered && setSelectedChoice(choice.id)}
                disabled={isAnswered}
              >
                {choice.text}
              </Button>
            )
          })}
        </div>

        <Button 
          className={`mt-4 bg-green-600 text-black hover:bg-green-700 disabled:opacity-50`}
          onClick={handleSubmit} 
          disabled={!selectedChoice || isAnswered}
        >
          Submit
        </Button>

        {isCorrect && (
          <div className="mt-2 text-green-700">
            ✅ Correct!
          </div>
        )}

        {!isCorrect && hasGuessedWrong && (
          <div className="mt-2 text-red-600">
            ❌ Incorrect!
          </div>
        )}

        {isAnswered && (
          <p className="mt-1 text-sm text-gray-700">{currentQuestion.feedback}</p>
        )}

        <div className="flex justify-between mt-4">
          <Button 
              onClick={() => handleNav(index - 1)} 
              disabled={index === 0}
              className="mt-1 bg-green-600 text-black hover:bg-green-700"
            >
              Previous
            </Button>

            <Button 
              onClick={() => handleNav(index + 1)}
              disabled={index === shuffledQuestions.length - 1}
              className="mt-1 bg-green-600 text-black hover:bg-green-700"
            >
              Next
            </Button>
        </div>
      </div>
    </div>
  )
}