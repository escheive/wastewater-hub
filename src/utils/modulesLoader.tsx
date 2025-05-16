const moduleMap = import.meta.glob('/src/data/modules/*.json')

export async function loadModuleContent(moduleId: string | undefined) {
  const path = `/src/data/modules/${moduleId}.json`
  const loader = moduleMap[path]

  if (!loader) throw new Error(`Module not found: ${moduleId}`)

  const module = await loader() as { default: any }
  return module.default
}