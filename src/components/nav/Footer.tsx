import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="w-full bg-[#A9B388] shadow-sm px-4 py-4 mt-10">
      <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-stone-700">
        <p>&copy; {new Date().getFullYear()} Wastewater Hub. All rights reserved.</p>
        <div className="mt-2 sm:mt-0 space-x-4">
          <Link to="/" className="hover:underline !text-stone-700">Home</Link>
          <Link to="/quizzes" className="hover:underline !text-stone-700">Quizzes</Link>
          <a href="https://your-privacy-policy-link.com" target="_blank" rel="noopener noreferrer" className="hover:underline !text-stone-700">Privacy</a>
        </div>
      </div>
    </footer>
  )
}
