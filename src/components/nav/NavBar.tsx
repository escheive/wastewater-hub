import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function NavBar() {
  return (
    <nav className="w-full border-b shadow-sm px-4 py-3 flex items-center justify-between" style={{ backgroundColor: '#A9B388' }}>
      <Link to="/" className="text-xl font-bold tracking-tight !text-stone-700">Wastewater Hub</Link>
      <div className="space-x-2">
        <Button asChild variant="ghost" className="!text-stone-700">
          <Link to="/">Home</Link>
        </Button>
        <Button asChild variant="ghost" className="!text-stone-700">
          <Link to="/learning">Learning</Link>
        </Button>
        <Button asChild variant="ghost" className="!text-stone-700">
          <Link to="/quizzes">Quizzes</Link>
        </Button>
        <Button asChild variant="ghost" className="!text-stone-700">
          <Link to="/resources">Resources</Link>
        </Button>
      </div>
    </nav>
  )
}