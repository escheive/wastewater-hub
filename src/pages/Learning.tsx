import modulesIndex from "@/data/modules/modules.json"
import { PortalCard } from "@/components/ui/portalCard"
import { FolderOpen } from "lucide-react"

type ThemeColor =
  | "red" | "orange" | "amber" | "yellow"
  | "lime" | "green" | "emerald" | "teal"
  | "cyan" | "sky" | "blue" | "indigo"
  | "violet" | "purple" | "fuchsia" | "pink"
  | "rose" | "slate" | "gray" | "zinc" | "neutral"

export default function Learning() {
  return (
    <div className="p-8 mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Learning Modules</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {modulesIndex.map((module) => (
          <PortalCard 
            key={module.id}
            icon={<FolderOpen className={`w-8 h-8 text-${module.theme}-700`} />}
            // icon={module.icon}
            title={module.title}
            description={module.description}
            to={`/modules/${module.id}`}
            theme={module.theme as ThemeColor}
          />
        ))}
      </div>
    </div>
  )
}