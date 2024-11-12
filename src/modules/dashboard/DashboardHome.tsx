import InicioCard from "@/modules/dashboard/components/HomeCard"
import { Briefcase, FilePenLine, FileUser, Users } from "lucide-react"

const Inicio = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <InicioCard
          title="Aplicantes totales"
          value="1,482"
          icon={<Users className="h-6 w-6 text-blue-600" />}
        />
        <InicioCard
          title="Convocatorias totales"
          value="532"
          icon={<Briefcase className="h-6 w-6 text-purple-600" />}
        />
        <InicioCard
          title="Solicitudes totales"
          value="1,482"
          icon={<FileUser className="h-6 w-6 text-green-600" />}
        />
        <InicioCard
          title="Evaluaciones pendientes"
          value="10"
          icon={<FilePenLine className="h-6 w-6 text-yellow-600" />}
        />
      </div>
    </div>
  )
}

export default Inicio