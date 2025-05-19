import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { loadModuleContent } from "@/utils/modulesLoader"
import { ModuleSection } from "@/components/modules/ModuleSection"


export default function ModulePage() {
  const { moduleId } = useParams()
  const [module, setModule] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const data = await loadModuleContent(moduleId)
        setModule(data)
      } catch (err) {
        console.error('Error loading module:', err)
        setModule(null)
      } finally {
        setLoading(false)
      }
    }

    fetchModule()
  }, [moduleId])

  if (loading) return <div>Loading...</div>

  if (!module) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Module Not Found</h1>
        <p>Please check the URL or return to the modules page</p>
      </div>
    )
  }

  return (
    <div className="p-8 mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-center">{module.title}</h1>
      <p className="text-sm text-gray-500 mb-6 text-center">Level: {module.level}</p>

      {module.sections && module.sections.map((section: any, index: number) => (
        <ModuleSection key={index} section={section} />
      ))}
    </div>
  )
}