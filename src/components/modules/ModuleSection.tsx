import { ModuleSubsection } from "./ModuleSubSection"
import { BlockMath } from "react-katex"

interface SectionProps {
  section: {
    title: string
    content?: string
    formula?: string
    bullets?: string[]
    subsections?: {
      title: string
      content?: string
      bullets?: string[]
    }[]
  }
}

export const ModuleSection = ({ section }: SectionProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-2 text-green-800">{section.title}</h2>

      {section.formula && (
        <div className="pt-4 pb-6">
          <BlockMath math={section.formula} />
        </div>
      )}

      {section.content && <p className="text-xl text-stone-800 mb-2">{section.content}</p>}

      {section.bullets && (
        <ul className="list-disc list-inside text-stone-800 mb-4">
          {section.bullets.map((bullet, i) => (
            <li key={i} className="text-xl text-stone-800">{bullet}</li>
          ))}
        </ul>
      )}

      {section.subsections && section.subsections.map((sub, i) => (
        <ModuleSubsection key={i} subsection={sub} />
      ))}
    </div>
  )
}
