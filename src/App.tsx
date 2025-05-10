import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import QuizPage from '@/pages/QuizPage'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/quiz' element={<QuizPage />} />
    </Routes>
  )
}

export default App
