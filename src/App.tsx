import { Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import QuizPage from '@/pages/QuizPage'
import QuizSelection from '@/pages/QuizSelection'
import QuizSummary from '@/pages/QuizSummary'
import NavBar from '@/components/nav/NavBar'
import Footer from '@/components/nav/Footer'
import './App.css'

function App() {

  return (
    <div className="flex flex-col min-h-screen min-w-screen">
      <NavBar />
      <main className="flex-grow p-6 max-w-2xl mx-auto">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/quizzes' element={<QuizSelection />} />
          <Route path='/quiz/:quizId' element={<QuizPage />} />
          <Route path='quiz/summary' element={<QuizSummary />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
