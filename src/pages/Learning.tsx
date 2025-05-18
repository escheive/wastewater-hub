import { Link } from "react-router-dom"
import modulesIndex from "@/data/modules/modules.json"

export default function Learning() {
  return (
    <div className="p-8 mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Learning Modules</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {modulesIndex.map((module) => (
          <div
            key={module.id}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                  {/* {module.icon} */}
                </div>
                <h2 className="ml-3 text-xl font-semibold">{module.title}</h2>
              </div>
              <p className="text-gray-600 text-sm">{module.description}</p>
            </div>

            <Link
              to={`/modules/${module.id}`}
              className="mt-6 bg-white hover:bg-gray-200 text-white text-sm font-medium py-2 px-4 rounded-xl text-center"
            >
              Start Module
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}