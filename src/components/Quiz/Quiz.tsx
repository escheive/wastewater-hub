import { useState } from "react"
import { questions } from "@/data/testQuestions"
import Question from "./Question"
import ChoiceButton from "./ChoiceButton"
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'

export default function Quiz() {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  const question = questions[index]

  const handleSubmit = () => {
    if (selected === question.answer) setScore(score + 1)
    setShowResult(true)
  }

  const nextQuestion = () => {
    setIndex(index + 1)
    setSelected(null)
    setShowResult(false)
  }

  if (index >= questions.length) {
    return (
      <div className="text-center mt-10 space-y-4">
        <h2 className="text-2xl font-bold">Your Score: {score} / {questions.length}</h2>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link to="/quiz">Retake Quiz</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded-lg shadow">
      <Question question={question.question} />

      <div className="space-y-2">
        {question.choices.map(choice => (
          <ChoiceButton
            key={choice}
            choice={choice}
            onSelect={setSelected}
            isSelected={selected === choice}
          />
        ))}
      </div>

      {showResult ? (
        <div className="mt-4">
          <p className={selected === question.answer ? "text-green-600" : "text-red-600"}>
            {selected === question.answer ? "Correct!" : `Incorrect. Correct answer: ${question.answer}`}
          </p>
          <Button className="mt-2" onClick={nextQuestion}>Next</Button>
        </div>
      ) : (
        <Button className="mt-4" disabled={!selected} onClick={handleSubmit}>Submit</Button>
      )}
    </div>
  )
}
