import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

type Choice = {
  id: string
  text: string
}

type Question = {
  question: string
  answerId: string
  feedback: string
  choices: Choice[]
}

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

  if (shuffledQuestions.length === 0) return null
  const currentQuestion = shuffledQuestions[index]

  const handleSubmit = () => {
    if (!selectedChoice) return

    const isCorrect = selectedChoice === currentQuestion.answerId

    if (isCorrect) {
      if (!hasGuessedWrong) {
        setScore((prev) => prev + 1)
      }

      setAnswers(prev => [
        ...prev,
        {
          question: currentQuestion.question,
          selected: selectedChoice!,
          correct: currentQuestion.answerId,
          feedback: currentQuestion.feedback,
        }
      ])
      setIsAnswered(true)
    } else {
      setHasGuessedWrong(true)
    }
  }

  const handlePrev = () => {
    setIndex((prev) => {
      const newIndex = prev - 1
      const prevAnswer = answers[newIndex]
  
      setSelectedChoice(prevAnswer ? prevAnswer.selected : null)
      setIsAnswered(!!prevAnswer)
      setHasGuessedWrong(false)
  
      return newIndex
    })
  }

  const handleNext = () => {
    setIndex((prev) => {
      const newIndex = prev + 1
      const nextAnswer = answers[newIndex]
  
      setSelectedChoice(nextAnswer ? nextAnswer.selected : null)
      setIsAnswered(!!nextAnswer)
      setHasGuessedWrong(false)
  
      return newIndex
    })
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
      <div className="w-48 space-y-2">
        {shuffledQuestions.map((_, qIndex) => {
          const isAnswered = answers[qIndex] !== undefined;
          return (
            <Button
              key={qIndex}
              variant="outline"
              className={`w-full justify-start text-sm ${
                index === qIndex ? 'border-blue-500 font-semibold' : ''
              } ${isAnswered ? 'bg-green-100' : 'bg-gray-100'}`}
              onClick={() => {
                setIndex(qIndex);
                const qAnswer = answers[qIndex];
                setSelectedChoice(qAnswer?.selected ?? null);
                setIsAnswered(!!qAnswer);
                setHasGuessedWrong(false);
              }}
            >
              Q{qIndex + 1} {isAnswered ? '✔️' : ''}
            </Button>
          );
        })}
      </div>

      {/* Quiz Content */}
      <div className="flex-1 space-y-4">
        <h2 className="text-2xl font-bold">{quizTitle || ''}</h2>
        <p className="text-sm text-gray-600 mb-2">
          Question {index + 1} of {shuffledQuestions?.length}
        </p>
        <div className="text-lg font-semibold">Score: {score}</div>
        <h2 className="text-xl font-semibold">{currentQuestion.question}</h2>
        <div className="grid gap-2">
          {currentQuestion.choices.map((choice, i) => {
            // Check if question has already been answered
            const isAnswered = answers[index] !== undefined;
            const wasAnsweredCorrectly = isAnswered && answers[index]?.selected === choice.id && answers[index]?.selected === answers[index]?.correct;

            console.log(i, isAnswered)
            console.log(i, wasAnsweredCorrectly)

            return (
              <Button
                key={i}
                className={`
                  mt-1 text-black border-2
                  
                `}
                onClick={() => !isAnswered && setSelectedChoice(choice.id)} // Only allow selection if not answered
              >
                {choice.text}
              </Button>
            )
          })}
        </div>

        <Button 
          className={`mt-4 bg-green-600 text-black hover:bg-green-700 disabled:opacity-50`}
          onClick={handleSubmit} 
          disabled={selectedChoice === null || isAnswered}
        >
          Submit
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
    </div>
  )
}
