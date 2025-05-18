import { useParams } from "react-router-dom"
import modulesIndex from "@/data/learningModules/modules.json"


export default function ModulePage() {
  const { moduleId } = useParams()
  const module = modulesIndex.find((m) => m.id === moduleId)

  if (!module) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Module Not Found</h1>
        <p>Please check the URL or return to the modules page</p>
      </div>
    )
  }

  const isAvailable = module.available !== false

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{module.title}</h1>
      <p className="text-gray-600 mb-6">{module.description}</p>

      {isAvailable ? (
        <div>
          <p>🚧 Module content will go here.</p>
        </div>
      ) : (
        <div className="text-center text-xl text-gray-500 mt-10">
          🚧 This module is coming soon!
        </div>
      )}
    </div>
  )
}