import { Filter, Search } from "lucide-react";

const Calificaciones = () => {
  return (
    <>
      <header className="bg-uac text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Panel de Calificación de Candidatos</h1>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Buscar candidatos..."
                className="w-full px-4 py-3 pl-12 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-uac"
              />
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            </div>
            <button className="px-4 py-2 bg-uac-alter hover:bg-sky-400 rounded-lg flex items-center gap-2 transition-colors">
              <Filter size={20} />
              Filtros
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Calificaciones;