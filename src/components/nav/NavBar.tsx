import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function NavBar() {
  return (
    <nav className="w-full bg-white border-b shadow-sm px-4 py-3 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold tracking-tight">Wastewater Hub</Link>
      <div className="space-x-2">
        <Button asChild variant="ghost">
          <Link to="/">Home</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link to="/learning">Learning</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link to="/quizzes">Quizzes</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link to="/resources">Resources</Link>
        </Button>
      </div>
    </nav>
  )
}