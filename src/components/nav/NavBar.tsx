import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import React from "react"

export default function NavBar() {
  return (
    <nav className="w-full bg-white border-b shadow-sm px-4 py-3 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold tracking-tight">QuizMaster</Link>
      <div className="space-x-2">
        <Button asChild variant="ghost">
          <Link to="/">Home</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link to="/quiz">Take Quiz</Link>
        </Button>
      </div>
    </nav>
  )
}