import { useNavigate } from 'react-router-dom'
import { MyButton } from '@/components/ui/MyButton'


export default function QuizSelection() {
  const navigate = useNavigate()
  return (
    <div className="text-center space-y-6">
      <h2 className="text-2xl font-semibold hover:outline-amber-100 hover:outline-2">Select a Quiz</h2>
      <div>
        <MyButton variant="moss" size="lg" onClick={() => navigate("/quiz/quiz1")}>
          Wastewater Quiz 1
        </MyButton>
      </div>
      <div>
        <MyButton variant="moss" size="lg" onClick={() => navigate("/quiz/quiz2")}>
          Acronyms of Wastewater
        </MyButton>
      </div>
      <div>
        <MyButton variant="moss" size="lg" onClick={() => navigate("/quiz/basicPumps")}>
          Pump Basics
        </MyButton>
      </div>
    </div>
  )
}