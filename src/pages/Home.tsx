import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold">Welcome to the Quiz App</h1>
      <p className="text-gray-600">Test your knowledge by taking a quick quiz.</p>
      <Button asChild>
        <Link to="/quiz">Start Quiz</Link>
      </Button>
    </main>
  )
}