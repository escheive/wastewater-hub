import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Link, useParams } from 'react-router-dom'
import { loadQuiz } from "@/utils/quizLoader"
import { MyButton } from "../ui/MyButton"

type Choice = { id: string, text: string }

type Question = {id: number, question: string, answerId: string, feedback: string, choices: Choice[] }

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
  const [showFinalModal, setShowFinalModal] = useState(false)
  const [answers, setAnswers] = useState<
    { question: string; selected: string; correct: string; feedback: string }[]
  >([])

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const data = await loadQuiz(quizId)

        if (data) {
          setQuizTitle(data.title)
          setShuffledQuestions(shuffleArray(data.questions))
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
          id: currentQuestion.id,
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

  const handleFinishQuiz = () => {
    setShowFinalModal(true)
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
    <div className="flex">
      {/* Legend Sidebar */}
      <div className="fixed left-0 top-13 bottom-16 w-56 space-y-2 overflow-y-auto bg-[#5F6F52] p-4">
        {shuffledQuestions.map((_, qIndex) => {
          const answer = answers[qIndex]
          const gotItRight = answer && answer.selected === answer.correct
          const gotItWrong = answer && answer.selected !== answer.correct

          return (
            <MyButton
              key={qIndex}
              variant="default"
              className={`w-full justify-start text-sm
                ${!answer ? '!bg-[#FEFAE0]' : ''}
                ${gotItRight ? '!bg-green-100' : ''}
                ${gotItWrong ? '!bg-red-100' : ''}
                ${index === qIndex ? '!border-[#FEFAE0] !font-semibold' : ''}       
              `}
              onClick={() => handleNav(qIndex)}
            >
              Q{qIndex + 1} {answers[qIndex] ? '✔️' : ''}
            </MyButton>
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
          {currentQuestion.choices.map((choice) => {
            const navAnswer = answers[index]
            const isIncorrectSelected = navAnswer && choice.id === navAnswer.selected && navAnswer.selected !== navAnswer.correct

            return (
              <MyButton
                key={choice.id}
                className={`mt-1 text-black border-2
                  ${isAnswered && choice.id === navAnswer.correct ? '!bg-green-100' : ''}
                  ${isIncorrectSelected ? '!bg-red-100' : ''}
                `}
                onClick={() => !isAnswered && setSelectedChoice(choice.id)}
                disabled={isAnswered}
                variant="default"
              >
                {choice.text}
              </MyButton>
            )
          })}
        </div>

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

        <div className="flex justify-between items-center mt-4 border-t pt-6">
          {/* Previous Button */}
          <MyButton 
              onClick={() => handleNav(index - 1)} 
              disabled={index === 0}
              className="mt-1"
              variant="moss"
            >
              Previous
            </MyButton>

            <MyButton 
              onClick={() => handleNav(index + 1)}
              disabled={index === shuffledQuestions.length - 1}
              className="mt-1"
              variant="moss"
            >
              Next
            </MyButton>

            <MyButton
              className="mt-1"
              onClick={handleFinishQuiz}
              variant="moss"
            >
              Finish Quiz
            </MyButton>
        </div>

        {selectedChoice && (
          <MyButton 
            className={`mt-4  disabled:opacity-50`}
            onClick={handleSubmit} 
            disabled={!selectedChoice || isAnswered}
            variant="moss"
          >
            Submit
          </MyButton>
        )}
      </div>

      {showFinalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center space-y-4 max-w-sm w-full">
            <h2 className="text-2xl font-bold">{quizTitle}</h2>
            <p className="text-xl">Your Score: {score} / {shuffledQuestions.length}</p>
            <div className="flex flex-col gap-2">
              <Button asChild className="!text-black bg-white" variant="outline">
                <Link to="/">Home</Link>
              </Button>
              <Button asChild className="!text-black bg-white" variant="outline">
                <Link 
                  to="/quiz/summary"
                  state={{
                    answers,
                    score,
                    total: shuffledQuestions.length,
                    shuffledQuestions
                  }}
                >
                  Summary
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}