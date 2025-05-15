import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"


export default function QuizSelection() {
  return (
    <div className="text-center space-y-6">
      <h2 className="text-2xl font-semibold">Select a Quiz</h2>
      <div>
        <Button>
          <Link to="/quiz/quiz1">Wastewater Quiz 1</Link>
        </Button>
      </div>
      <div>
        <Button>
          <Link to="/quiz/quiz2">Acronyms of Wastewater</Link>
        </Button>
      </div>
      <div>
        <Button>
          <Link to="/quiz/basicPumps">Pump Basics</Link>
        </Button>
      </div>
    </div>
  )
}