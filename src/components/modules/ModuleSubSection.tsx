// components/ModuleSubsection.tsx
interface SubsectionProps {
  subsection: {
    title: string
    content?: string
    bullets?: string[]
  }
}

export const ModuleSubsection = ({ subsection }: SubsectionProps) => {
  return (
    <div className="mb-6">
      <h3 className="text-2xl font-semibold text-amber-800 mb-1">{subsection.title}</h3>

      {subsection.content && (
        <p className="text-xl text-stone-800 mb-2">{subsection.content}</p>
      )}

      {subsection.bullets && (
        <ul className="list-disc list-inside text-gray-700">
          {subsection.bullets.map((bullet, i) => (
            <li key={i} className="text-xl text-stone-800">{bullet}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
