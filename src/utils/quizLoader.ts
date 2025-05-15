const quizModules = import.meta.glob('@/data/quizzes/*.json')

export async function loadQuiz(quizId: string) {
  const path = `/src/data/quizzes/${quizId}.json`
  const loader = quizModules[path]

  if (!loader) throw new Error(`Quiz not found: ${quizId}`)

  const module = await loader()
  return module.default
}