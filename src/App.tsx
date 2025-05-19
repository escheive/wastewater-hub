import { Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import Learning from '@/pages/Learning'
import ModulePage from './pages/ModulePage'
import QuizPage from '@/pages/QuizPage'
import QuizSelection from '@/pages/QuizSelection'
import QuizSummary from '@/pages/QuizSummary'
import Resources from '@/pages/Resources'
import NavBar from '@/components/nav/NavBar'
import Footer from '@/components/nav/Footer'
import './App.css'

function App() {

  return (
    // <div className="flex flex-col min-h-screen min-w-screen" style={{ backgroundColor: '#F5F5DC'}}>
    // <div className="flex flex-col min-h-screen min-w-screen" style={{ backgroundColor: '#DCE4C9'}}>
    // <div className="flex flex-col min-h-screen min-w-screen" style={{ backgroundColor: '#B6A28E'}}>
    <div className="flex flex-col min-h-screen min-w-screen" style={{ backgroundColor: '#FEFAE0'}}>
      <NavBar />
      <main className="flex-grow p-6 mx-auto">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/learning' element={<Learning />} />
          <Route path='/modules/:moduleId' element={<ModulePage />} />
          <Route path='/quizzes' element={<QuizSelection />} />
          <Route path='/quiz/:quizId' element={<QuizPage />} />
          <Route path='quiz/summary' element={<QuizSummary />} />
          <Route path='/resources' element={<Resources />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
