import { Link } from "react-router-dom"
import { BookOpen, ClipboardCheck, FolderOpen } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-pastelGreen flex flex-col items-center justify-center px-6 py-12 text-stone-800">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-deepBrown">Welcome to the Wastewater Hub</h1>
      <p className="text-center text-lg max-w-xl mb-10">
        This is a free resource for wastewater operators. Learn, quiz yourself, and explore tools to help you prepare. 
        Want to contribute? Email <a href="mailto:erik.softwaredevelopment@gmail.com" className="underline hover:text-green-900">erik.softwaredevelopment@gmail.com</a>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <PortalCard
          icon={<BookOpen className="w-8 h-8 text-green-700" />}
          title="Learning"
          description="Read through detailed modules and prep guides for operator exams."
          to="/learning"
          theme="green"
        />

        <PortalCard
          icon={<ClipboardCheck className="w-8 h-8 text-stone-700" />}
          title="Quizzes"
          description="Test your knowledge with dynamic quizzes for every skill level."
          to="/quizzes"
          theme="stone"
        />

        <PortalCard
          icon={<FolderOpen className="w-8 h-8 text-amber-700" />}
          title="Resources"
          description="Access downloadable PDFs, conversion charts, formulas and more."
          to="/resources"
          theme="amber"
        />
      </div>
    </main>
  )
}

function PortalCard({ icon, title, description, to, theme }: {
  icon: React.ReactNode
  title: string
  description: string
  to: string
  theme: string
}) {
  return (
    <Link
      to={to}
      className={`rounded-2xl p-6 bg-${theme}-100 hover:shadow-lg transition-shadow border border-gray-200 flex flex-col gap-3`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <h2 className={`text-xl font-semibold text-${theme}-700`}>{title}</h2>
      </div>
      <p className="text-md text-stone-700">{description}</p>
    </Link>
  )
}