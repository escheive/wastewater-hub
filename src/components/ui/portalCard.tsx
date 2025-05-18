import { Link } from "react-router-dom"

export function PortalCard({ icon, title, description, to, theme }: {
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