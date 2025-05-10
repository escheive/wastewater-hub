import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import QuizPage from '@/pages/QuizPage'
import NavBar from '@/components/nav/NavBar'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col min-h-screen min-w-screen">
      <NavBar />
      <main className="p-6 max-w-2xl mx-auto">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/quiz' element={<QuizPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
