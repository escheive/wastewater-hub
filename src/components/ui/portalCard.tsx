import { Link } from "react-router-dom"
import { colorVariants } from "@/lib/colorVariants"

export type ColorVariant = keyof typeof colorVariants

export function PortalCard({ icon, title, description, to, theme }: {
  icon: React.ReactNode
  title: string
  description: string
  to: string
  theme: ColorVariant
}) {
  const { bg, text } = colorVariants[theme]

  return (
    <Link
      to={to}
      className={`rounded-2xl p-6 ${bg} hover:shadow-lg transition-shadow border border-gray-200 flex flex-col gap-3`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <h2 className={`text-xl font-semibold ${text}`}>{title}</h2>
      </div>
      <p className="text-md text-stone-700">{description}</p>
    </Link>
  )
}